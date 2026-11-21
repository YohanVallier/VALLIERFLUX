import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  id: string;
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  align = 'start',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.heading, align === 'center' && styles.center, className]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {description && <div className={styles.description}>{description}</div>}
    </header>
  );
}
