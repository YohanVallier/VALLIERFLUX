export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactPayload(payload: ContactPayload): ValidationResult {
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (name.length < 2) {
    errors.name = "Informe seu nome com pelo menos 2 caracteres.";
  } else if (name.length > 100) {
    errors.name = "O nome deve ter no máximo 100 caracteres.";
  }

  if (!email) {
    errors.email = "Informe um endereço de e-mail.";
  } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = "Informe um endereço de e-mail válido.";
  }

  if (message.length < 10) {
    errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
  } else if (message.length > 5000) {
    errors.message = "A mensagem deve ter no máximo 5000 caracteres.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
