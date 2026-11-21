import type { ComponentPropsWithRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './IconLink.module.css';

export type IconLinkProps = Omit<
  ComponentPropsWithRef<'a'>,
  'href' | 'children' | 'aria-label' | 'aria-labelledby' | 'title'
> & {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function IconLink({
  href,
  label,
  icon: Icon,
  className,
  target,
  rel,
  ...props
}: IconLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : rel}
      className={[styles.link, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
    >
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" focusable="false" />
    </a>
  );
}
