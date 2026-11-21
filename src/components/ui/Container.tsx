import type { ComponentPropsWithRef } from 'react';
import styles from './Container.module.css';

export type ContainerProps = ComponentPropsWithRef<'div'>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={[styles.container, className].filter(Boolean).join(' ')}
    />
  );
}
