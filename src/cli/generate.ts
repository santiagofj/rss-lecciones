import process from "node:process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { validateRepository } from "../courses/validate-repository.js";
import { runGenerationBatch, type BatchResult } from "../generation/run-batch.js";
import { planGenerationTasks, requestFromEnvironment } from "../generation/selection.js";
import { buildPublicSite } from "../publishing/site.js";

function reportInvalidRepository(result: Awaited<ReturnType<typeof validateRepository>>): never {
  if (result.ok) {
    throw new Error("Estado de validación inesperado");
  }
  for (const issue of result.issues) {
    const location = issue.path.length === 0 ? issue.file : `${issue.file}:${issue.path}`;
    console.error(`- ${location}: ${issue.message}`);
  }
  throw new Error("El repositorio no cumple el contrato de configuración");
}

async function main(): Promise<void> {
  const root = process.cwd();
  const reportPath = path.join(root, ".work", "generation-pending.txt");
  await rm(reportPath, { force: true });
  const initial = await validateRepository(root);
  if (!initial.ok) {
    reportInvalidRepository(initial);
  }

  const now = new Date();
  const request = requestFromEnvironment(process.env);
  const tasks = planGenerationTasks(initial.repository, now, request);
  let result: BatchResult = { saved: 0, failures: [], pending: [] };

  if (tasks.length > 0) {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (apiKey === undefined || apiKey.length === 0) {
      throw new Error("Falta el secreto GEMINI_API_KEY");
    }
    result = await runGenerationBatch({
      root,
      repository: initial.repository,
      now,
      request,
      apiKey,
    });
  } else {
    console.log(request.kind === "extra"
      ? `La solicitud manual ${request.requestId} ya tiene una lección publicada`
      : "No hay lecciones pendientes para la fecha local actual");
  }

  if (result.saved === 0 && result.failures.length > 0) {
    throw new Error(`No se generó ninguna lección; fallaron ${result.failures.length} curso(s)`);
  }

  const finalState = await validateRepository(root);
  if (!finalState.ok) {
    reportInvalidRepository(finalState);
  }
  await buildPublicSite(root, finalState.repository);
  console.log("Sitio HTML y feeds RSS construidos en public/");

  if (result.pending.length > 0) {
    const failures = result.failures.map((failure) =>
      `- ${failure.courseSlug} (${failure.generationDate}): ${failure.message.replace(/\s+/gu, " ")}`
    );
    const report = [
      `Se conservaron ${result.saved} lección(es), pero quedan ${result.pending.length} entrega(s) pendientes.`,
      ...failures,
    ].join("\n");
    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, `${report}\n`, "utf8");
    console.warn(report);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Error inesperado");
  process.exitCode = 1;
});
