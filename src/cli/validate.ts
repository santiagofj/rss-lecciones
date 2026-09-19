import process from "node:process";

import { validateRepository } from "../courses/validate-repository.js";

const result = await validateRepository(process.cwd());

if (!result.ok) {
  console.error(`Validación fallida: ${result.issues.length} problema(s).`);
  for (const issue of result.issues) {
    const location = issue.path.length > 0 ? `${issue.file}:${issue.path}` : issue.file;
    console.error(`- ${location}: ${issue.message}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Configuración válida: ${result.repository.courses.length} curso(s).`);
  for (const course of result.repository.courses) {
    const nextStep = course.progress.cursor.nextStepId ?? "temario agotado";
    console.log(`- ${course.config.slug}: ${course.config.status}; próximo: ${nextStep}`);
  }
}
