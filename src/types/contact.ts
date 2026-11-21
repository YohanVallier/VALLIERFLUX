/**
 * Payload público da API-CONTACT.
 * A validação deve aplicar trim e os limites antes de qualquer requisição:
 * name: 2–100 caracteres; email: formato válido e até 254 caracteres;
 * message: 10–5000 caracteres.
 * Nunca registrar esses valores em logs ou relatórios.
 */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * unconfigured: validar campos sem enviar; aviso persistente e envio desabilitado.
 * idle: pronto para interação, com integração autorizada e configurada.
 * validating: executar validação local, sem bloquear edição dos campos.
 * submitting: única fase que bloqueia alterações durante uma requisição.
 * success: exige HTTP 2xx e confirmação positiva real do provedor;
 *          confirma processamento, não entrega na caixa postal.
 * error: preservar os dados; não executar reenvio automático.
 *
 * Requisições devem ser abortadas após 15 segundos. Timeout não comprova
 * que o provedor deixou de receber a mensagem.
 */
export type ContactState =
  | 'unconfigured'
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';
