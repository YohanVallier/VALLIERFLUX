import { projects, projectsContent } from '../../content/projects';
import { ProjectCard } from '../projects/ProjectCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useReveal } from '../../hooks/useReveal';
import styles from './Projects.module.css';

export function Projects() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="projetos" className={styles.section} aria-labelledby="projetos-title">
      <Container>
        <SectionHeading id="projetos-title" eyebrow="03 / Repositórios" title={projectsContent.title} description={projectsContent.description} />
        <div ref={ref} className={styles.grid}>{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </Container>
    </section>
  );
}
