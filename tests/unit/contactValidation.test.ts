import { describe, expect, it } from "vitest";
import { validateContactPayload } from "../../src/lib/contactValidation";

describe("validateContactPayload", () => {
  it("aceita payload válido", () => {
    const res = validateContactPayload({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Gostaria de conversar sobre automação de pipelines.",
    });
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual({});
  });

  it("rejeita nome curto, e-mail inválido e mensagem curta", () => {
    const res = validateContactPayload({
      name: "A",
      email: "invalido@",
      message: "Oi",
    });
    expect(res.valid).toBe(false);
    expect(res.errors.name).toBeDefined();
    expect(res.errors.email).toBeDefined();
    expect(res.errors.message).toBeDefined();
  });
});
