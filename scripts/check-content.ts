import { validateProjectContent } from "../src/lib/contentValidation";

const result = validateProjectContent(process.cwd());

if (!result.ok) {
  console.error("Falha na validação de conteúdo do VALLIER.FLUX:");
  for (const issue of result.issues) {
    console.error(` - [${issue.file}] ${issue.message}`);
  }
  process.exit(1);
}

console.log("Validação de conteúdo concluída com sucesso.");
