import React from "react";
import { ContactForm } from "./ContactForm";

export interface ContactProps {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export const Contact: React.FC<ContactProps> = ({
  email = "contato@vallierflux.dev",
  githubUrl = "https://github.com/vallierflux",
  linkedinUrl = "https://www.linkedin.com/in/vallierflux",
}) => {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="mx-auto max-w-5xl px-6 py-20"
    >
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          // CONTATO
        </p>
        <h2 id="contato-heading" className="mt-2 text-3xl font-bold">
          Iniciar conversa técnica
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Engenharia de software, pipelines de dados e automação operacional.
          Envie os detalhes do escopo ou acione um canal direto.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-4 rounded border border-slate-800 bg-slate-900/40 p-6 md:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Canais diretos
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="block text-xs text-slate-400">E-mail</span>
              <a
                href={`mailto:${email}`}
                className="text-cyan-400 underline-offset-4 hover:underline"
              >
                {email}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-400">GitHub</span>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline-offset-4 hover:underline"
              >
                {githubUrl.replace(/^https?:\/\//, "")}
              </a>
            </li>
            <li>
              <span className="block text-xs text-slate-400">LinkedIn</span>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline-offset-4 hover:underline"
              >
                {linkedinUrl.replace(/^https?:\/\//, "")}
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};
