import React, { useId, useState } from "react";
import type { ContactPayload } from "../../lib/contactValidation";
import {
  type ContactSubmitStatus,
  isContactConfigured,
  submitContactForm,
} from "../../services/contact";

export interface ContactFormProps {
  configured?: boolean;
  endpoint?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  endpoint,
  configured = Boolean(endpoint) || isContactConfigured(),
}) => {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;
  const honeypotId = `${baseId}-company`;
  const statusId = `${baseId}-status`;

  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactPayload, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactSubmitStatus | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactPayload]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!configured || submitting) return;

    setSubmitting(true);
    setFeedback("");
    setStatus(null);

    const result = await submitContactForm(formData, fetch, endpoint);
    setSubmitting(false);
    setStatus(result.status);
    setFeedback(result.message);

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    }

    if (result.status === "success") {
      setFormData({ name: "", email: "", message: "", company: "" });
      setFieldErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusId}
      className="space-y-5"
    >
      {!configured && (
        <div
          role="status"
          className="rounded border border-amber-500/40 bg-amber-950/30 p-3 text-sm text-amber-200"
        >
          Envio pelo formulário desativado neste ambiente (endpoint não configurado). Use os canais diretos ao lado.
        </div>
      )}

      {/* Honeypot anti-spam oculto */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={honeypotId}>Empresa</label>
        <input
          id={honeypotId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company ?? ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor={nameId} className="block text-sm font-medium">
          Nome
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          disabled={!configured || submitting}
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm"
        />
        {fieldErrors.name && (
          <p id={`${nameId}-error`} role="alert" className="mt-1 text-xs text-rose-400">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={emailId} className="block text-sm font-medium">
          E-mail
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          maxLength={254}
          disabled={!configured || submitting}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm"
        />
        {fieldErrors.email && (
          <p id={`${emailId}-error`} role="alert" className="mt-1 text-xs text-rose-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={messageId} className="block text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          disabled={!configured || submitting}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? `${messageId}-error` : undefined}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm"
        />
        {fieldErrors.message && (
          <p id={`${messageId}-error`} role="alert" className="mt-1 text-xs text-rose-400">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <p className="text-xs text-slate-400">
        Ao enviar, seu nome, e-mail e mensagem são processados via Formspree apenas para resposta ao contato (veja <code>docs/privacy.md</code>).
      </p>

      <button
        type="submit"
        disabled={!configured || submitting}
        aria-disabled={!configured || submitting}
        className="rounded bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Enviar mensagem"}
      </button>

      <div id={statusId} aria-live="polite" className="min-h-[1.25rem] text-sm">
        {feedback && (
          <p
            className={
              status === "success" ? "text-emerald-400" : "text-rose-400"
            }
          >
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
};
