import { parseDocument } from "yaml";
import type { z } from "zod";

import type { ValidationIssue } from "./types.js";

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/;

export function parseYaml(
  text: string,
  file: string,
): { value?: unknown; issues: ValidationIssue[] } {
  const document = parseDocument(text, {
    prettyErrors: false,
    uniqueKeys: true,
  });

  if (document.errors.length > 0) {
    return {
      issues: document.errors.map((error) => ({
        file,
        path: "",
        message: error.message,
      })),
    };
  }

  try {
    return { value: document.toJS({ maxAliasCount: 0 }), issues: [] };
  } catch (error: unknown) {
    return {
      issues: [{
        file,
        path: "",
        message: error instanceof Error ? error.message : "YAML inválido",
      }],
    };
  }
}

export function parseJson(
  text: string,
  file: string,
): { value?: unknown; issues: ValidationIssue[] } {
  let value: unknown;
  try {
    value = JSON.parse(text) as unknown;
  } catch (error: unknown) {
    return {
      issues: [{
        file,
        path: "",
        message: error instanceof Error ? error.message : "JSON inválido",
      }],
    };
  }

  const duplicateCheck = parseYaml(text, file);
  if (duplicateCheck.issues.length > 0) {
    return duplicateCheck;
  }

  return { value, issues: [] };
}

export function parseFrontmatter(
  text: string,
  file: string,
): { value?: unknown; markdown?: string; issues: ValidationIssue[] } {
  const match = frontmatterPattern.exec(text);
  if (match === null) {
    return {
      issues: [{ file, path: "", message: "frontmatter YAML ausente o sin cerrar" }],
    };
  }

  const yaml = match[1];
  const markdown = match[2];
  if (yaml === undefined || markdown === undefined) {
    return {
      issues: [{ file, path: "", message: "frontmatter inválido" }],
    };
  }

  const parsed = parseYaml(yaml, file);
  return { ...parsed, markdown };
}

export function validateSchema<T>(
  schema: z.ZodType<T>,
  value: unknown,
  file: string,
): { value?: T; issues: ValidationIssue[] } {
  const result = schema.safeParse(value);
  if (result.success) {
    return { value: result.data, issues: [] };
  }

  return {
    issues: result.error.issues.map((issue) => ({
      file,
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}
