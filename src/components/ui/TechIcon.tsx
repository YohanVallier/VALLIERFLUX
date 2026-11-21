import { Braces } from 'lucide-react';
import reactIconUrl from '../../assets/tech-icons/react.svg';
import styles from './TechIcon.module.css';

export interface TechIconProps {
  iconId: string | null;
  name: string;
  className?: string;
}

/** O rótulo textual é sempre renderizado; o desenho é decorativo. */
export function TechIcon({ iconId, name, className }: TechIconProps) {
  const isReact = iconId?.trim().toLowerCase() === 'react';

  return (
    <span className={[styles.technology, className].filter(Boolean).join(' ')}>
      <span className={styles.symbol} aria-hidden="true">
        {isReact ? (
          <img src={reactIconUrl} width={24} height={24} alt="" />
        ) : (
          <Braces size={22} strokeWidth={1.75} focusable="false" />
        )}
      </span>
      <span className={styles.name}>{name}</span>
    </span>
  );
}
