import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import type { ContactPayload } from '../../lib/contactValidation';
import {
  type ContactSubmitStatus,
  isContactConfigured,
  isValidContactEndpoint,
  submitContactForm,
} from '../../services/contact';
import { Button } from '../ui/Button';
import styles from './ContactForm.module.css';

export interface ContactFormProps {
  configured?: boolean | undefined;
  endpoint?: string | undefined;
}

export function ContactForm({
  endpoint,
  configured = (endpoint ? isValidContactEndpoint(endpoint) : false) || isContactConfigured(),
}: ContactFormProps) {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;
  const honeypotId = `${baseId}-company`;
  const statusId = `${baseId}-status`;

  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactPayload, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactSubmitStatus | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactPayload]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactPayload];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!configured || submitting) return;

    setSubmitting(true);
    setFeedback('');
    setStatus(null);

    const result = await submitContactForm(formData, fetch, endpoint);
    setSubmitting(false);
    setStatus(result.status);
    setFeedback(result.message);

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    }

    if (result.status === 'success') {
      setFormData({ name: '', email: '', message: '', company: '' });
      setFieldErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={statusId} className={styles.form}>
      {!configured && (
        <div role="status" className={styles.notice}>
          Envio pelo formulário desativado neste ambiente (endpoint não configurado). Nenhuma
          mensagem será enviada enquanto a integração estiver pendente. Use os canais diretos ao
          lado.
        </div>
      )}

      {/* Honeypot anti-spam oculto */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={honeypotId}>Empresa</label>
        <input
          id={honeypotId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company ?? ''}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={nameId}>Nome</label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          disabled={submitting}
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
        />
        {fieldErrors.name && (
          <p id={`${nameId}-error`} role="alert" className={styles.error}>
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={emailId}>E-mail</label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          disabled={submitting}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined}
        />
        {fieldErrors.email && (
          <p id={`${emailId}-error`} role="alert" className={styles.error}>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={messageId}>Mensagem</label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          disabled={submitting}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? `${messageId}-error` : undefined}
        />
        {fieldErrors.message && (
          <p id={`${messageId}-error`} role="alert" className={styles.error}>
            {fieldErrors.message}
          </p>
        )}
      </div>

      <p className={styles.privacy}>
        Quando o envio estiver habilitado, seu nome, e-mail e mensagem serão processados via
        Formspree apenas para resposta ao contato (veja <code>docs/privacy.md</code>).
      </p>

      <div className={styles.actions}>
        <Button type="submit" disabled={!configured || submitting}>
          {submitting ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
      </div>

      <div id={statusId} aria-live="polite" className={styles.feedback}>
        {feedback && (
          <p className={status === 'success' ? styles.success : styles.failure}>{feedback}</p>
        )}
      </div>
    </form>
  );
}
