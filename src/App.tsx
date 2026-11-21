import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Experience } from './components/sections/Experience';
import { Container } from './components/ui/Container';
import { SectionHeading } from './components/ui/SectionHeading';
import { Button } from './components/ui/Button';
import { contact, siteConfig, socialLinks } from './content/site';

export function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        {/* T06 substituirá esta seção pela seção Contact com formulário integrado. */}
        <section id="contato" aria-labelledby="contato-title" style={{ paddingBlock: 'var(--section-space)' }}>
          <Container>
            <SectionHeading id="contato-title" eyebrow="07 / Contato" title={contact.title} description={contact.description} />
            <p><a href={contact.emailAction.href}>{siteConfig.email}</a></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <Button href={contact.emailAction.href}>{contact.emailAction.label}</Button>
              {socialLinks.map((link) => <Button key={link.id} href={link.href} variant="secondary" aria-label={link.label}>{link.id === 'github' ? 'GitHub' : 'LinkedIn'}</Button>)}
            </div>
            <p style={{ marginTop: 'var(--space-6)', color: 'var(--color-muted)', maxWidth: '46rem' }}>O formulário de contato ainda não está disponível. Utilize os canais diretos acima.</p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
