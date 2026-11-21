import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "../../src/components/contact/ContactForm";

describe("ContactForm", () => {
  it("mantém botão desabilitado quando endpoint não está configurado", () => {
    render(<ContactForm configured={false} />);
    const button = screen.getByRole("button", { name: /enviar mensagem/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent(/não configurado/i);
  });

  it("exibe erros de validação ao submeter formulário vazio quando configurado", async () => {
    render(<ContactForm configured={true} endpoint="https://formspree.io/f/test-id" />);
    const button = screen.getByRole("button", { name: /enviar mensagem/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(3);
    });
  });

  it("envia com sucesso e limpa campos quando Formspree responde ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm configured={true} endpoint="https://formspree.io/f/test-id" />);
    fireEvent.change(screen.getByLabelText(/nome/i), {
      target: { value: "Grace Hopper" },
    });
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "grace@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mensagem/i), {
      target: { value: "Precisamos estruturar uma integração de dados." },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
