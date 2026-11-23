import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import type { Project } from '../../types/content';
import { projectsContent, projectVerificationLabels } from '../../content/projects';
import { Button } from '../ui/Button';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `project-${project.id}-title`;
  const unknown = projectsContent.unknownFieldLabel;
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.top}>
        <FolderGit2 size={28} aria-hidden="true" />
        <span>
          {project.verificationStatus === 'verified' ? 'Fontes revisadas' : 'Revisão de fontes'}
        </span>
      </div>
      <h3 id={titleId}>{project.name}</h3>
      <p className={styles.notice}>{projectVerificationLabels[project.verificationStatus]}</p>
      <p className={styles.summary}>{project.summary || unknown}</p>
      <dl className={styles.details}>
        <div>
          <dt>Problema que resolve</dt>
          <dd>{project.problem || unknown}</dd>
        </div>
        <div>
          <dt>Tecnologias</dt>
          <dd>
            {project.technologies.length ? (
              <ul className={styles.tags}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            ) : (
              unknown
            )}
          </dd>
        </div>
        <div>
          <dt>Principais funcionalidades</dt>
          <dd>
            {project.features.length ? (
              <ul className={styles.features}>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : (
              unknown
            )}
          </dd>
        </div>
        <div>
          <dt>Diferencial técnico</dt>
          <dd>{project.technicalHighlight || unknown}</dd>
        </div>
      </dl>
      <Button
        className={styles.action}
        href={project.repositoryUrl}
        target="_blank"
        variant="secondary"
        aria-label={`${projectsContent.repositoryActionLabel}: ${project.name}`}
      >
        {projectsContent.repositoryActionLabel}
        <ArrowUpRight aria-hidden="true" />
      </Button>
    </article>
  );
}
