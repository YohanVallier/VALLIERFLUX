import { Braces } from 'lucide-react';
import { profile } from '../../content/profile';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useReveal } from '../../hooks/useReveal';
import styles from './About.module.css';

export function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-title">
      <Container>
        <SectionHeading id="sobre-title" eyebrow="01 / Sobre mim" title={profile.title} />
        <div ref={ref} className={styles.layout}>
          <div className={styles.statement}><Braces size={36} aria-hidden="true" /><p>Código com propósito.<br /><span>Aprendizado contínuo.</span></p></div>
          <div className={styles.text}>{profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </Container>
    </section>
  );
}
