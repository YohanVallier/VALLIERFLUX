import { skillCategories, skillsContent } from '../../content/skills';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TechIcon } from '../ui/TechIcon';
import { useReveal } from '../../hooks/useReveal';
import styles from './Skills.module.css';

export function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="habilidades" className={styles.section} aria-labelledby="habilidades-title">
      <Container>
        <SectionHeading id="habilidades-title" eyebrow="02 / Stack e aprendizado" title={skillsContent.title} description={skillsContent.description} />
        <div className={styles.grid} ref={ref}>
          {skillCategories.map((category) => (
            <article className={styles.card} key={category.id}>
              <h3>{category.title}</h3>
              <ul>{category.items.map((item) => <li key={item.name}><TechIcon name={item.name} iconId={item.iconId} /></li>)}</ul>
            </article>
          ))}
        </div>
        <p className={styles.note}>{skillsContent.additionalInterest}</p>
      </Container>
    </section>
  );
}
