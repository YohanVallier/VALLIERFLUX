import { BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { experienceContent, timeline } from '../../content/profile';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useReveal } from '../../hooks/useReveal';
import styles from './Experience.module.css';

export function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="experiencia" className={styles.section} aria-labelledby="experiencia-title">
      <Container>
        <SectionHeading
          id="experiencia-title"
          eyebrow="05 / Trajetória"
          title={experienceContent.title}
          description={experienceContent.description}
        />
        <div ref={ref}>
          <ul className={styles.timeline}>
            {timeline.map((entry) => {
              const Icon = entry.kind === 'work' ? BriefcaseBusiness : GraduationCap;
              return (
                <li key={entry.id} className={styles.entry}>
                  <span className={styles.marker}>
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <article className={styles.card} aria-labelledby={`experience-${entry.id}`}>
                    <p className={styles.kind}>
                      {entry.kind === 'work' ? 'Experiência profissional' : 'Formação'}
                    </p>
                    <h3 id={`experience-${entry.id}`}>{entry.title}</h3>
                    {entry.organization && (
                      <p className={styles.organization}>{entry.organization}</p>
                    )}
                    {entry.dateLabel && <p className={styles.date}>{entry.dateLabel}</p>}
                    {entry.description.split('\n\n').map((paragraph) => (
                      <p key={paragraph} className={styles.description}>
                        {paragraph}
                      </p>
                    ))}
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
