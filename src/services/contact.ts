import { type ContactPayload, validateContactPayload } from '../lib/contactValidation';

export type ContactSubmitStatus =
  | 'success'
  | 'unconfigured'
  | 'validation_error'
  | 'rate_limited'
  | 'timeout'
  | 'network_error'
  | 'server_error';

export interface ContactSubmitResult {
  status: ContactSubmitStatus;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactPayload, string>>;
}

const REQUEST_TIMEOUT_MS = 15_000;
const FORMSPREE_ENDPOINT_REGEX = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/;

export function isValidContactEndpoint(endpoint: string): boolean {
  return FORMSPREE_ENDPOINT_REGEX.test(endpoint.trim());
}

export function getContactEndpoint(): string {
  const raw = import.meta.env?.VITE_CONTACT_ENDPOINT ?? '';
  return typeof raw === 'string' ? raw.trim() : '';
}

export function isContactConfigured(): boolean {
  return isValidContactEndpoint(getContactEndpoint());
}

export async function submitContactForm(
  payload: ContactPayload,
  fetchImpl: typeof fetch = fetch,
  endpointOverride?: string | undefined,
): Promise<ContactSubmitResult> {
  const endpoint = (endpointOverride ?? getContactEndpoint()).trim();
  if (!isValidContactEndpoint(endpoint)) {
    return {
      status: 'unconfigured',
      message:
        'O formulário direto está temporariamente indisponível neste ambiente. Utilize o e-mail direto abaixo.',
    };
  }

  // Honeypot preenchido: descarta silenciosamente sem vazar detalhes
  if (payload.company && payload.company.trim().length > 0) {
    return {
      status: 'success',
      message: 'Mensagem recebida.',
    };
  }

  const validation = validateContactPayload(payload);
  if (!validation.valid) {
    return {
      status: 'validation_error',
      message: 'Revise os campos destacados antes de enviar.',
      fieldErrors: validation.errors,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        message: payload.message.trim(),
      }),
      signal: controller.signal,
    });

    if (response.status === 429) {
      return {
        status: 'rate_limited',
        message: 'Muitas tentativas em sequência. Aguarde alguns instantes ou utilize o e-mail direto.',
      };
    }

    if (!response.ok) {
      return {
        status: 'server_error',
        message:
          'Não foi possível concluir o envio agora. Tente novamente ou use o e-mail direto.',
      };
    }

    const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (data?.ok !== true) {
      return {
        status: 'server_error',
        message:
          'O serviço de entrega não confirmou o recebimento. Verifique os dados ou use o e-mail direto.',
      };
    }

    return {
      status: 'success',
      message:
        'Mensagem enviada com sucesso. O provedor confirmou o recebimento para processamento.',
    };
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      return {
        status: 'timeout',
        message:
          'O tempo limite de envio expirou (15s). Verifique sua conexão ou utilize o e-mail direto.',
      };
    }
    return {
      status: 'network_error',
      message:
        'Falha de conexão ao enviar a mensagem. Tente novamente ou utilize o e-mail direto.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
