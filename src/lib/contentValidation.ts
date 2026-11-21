import fs from "node:fs";
import path from "node:path";

export interface ContentValidationIssue {
  file: string;
  message: string;
}

export function validateProjectContent(rootDir: string = process.cwd()): {
  ok: boolean;
  issues: ContentValidationIssue[];
} {
  const issues: ContentValidationIssue[] = [];
  const specPath = path.join(rootDir, "docs", "project-spec.json");

  if (!fs.existsSync(specPath)) {
    issues.push({
      file: "docs/project-spec.json",
      message: "Arquivo de especificação docs/project-spec.json não encontrado.",
    });
    return { ok: false, issues };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(fs.readFileSync(specPath, "utf-8"));
  } catch (err) {
    issues.push({
      file: "docs/project-spec.json",
      message: `JSON inválido: ${(err as Error).message}`,
    });
    return { ok: false, issues };
  }

  const rawText = JSON.stringify(parsed);
  if (!rawText.includes("VALLIER.FLUX")) {
    issues.push({
      file: "docs/project-spec.json",
      message: "Identidade visual ausente ou inválida: esperado \"VALLIER.FLUX\".",
    });
  }

  if (!rawText.includes("\"VF\"") && !rawText.includes("VF")) {
    issues.push({
      file: "docs/project-spec.json",
      message: "Monograma ausente ou inválido: esperado \"VF\".",
    });
  }

  const privacyPath = path.join(rootDir, "docs", "privacy.md");
  if (!fs.existsSync(privacyPath)) {
    issues.push({
      file: "docs/privacy.md",
      message: "Documentação de privacidade docs/privacy.md não encontrada.",
    });
  }

  return {
    ok: issues.length === 0,
    issues,
  };
}
