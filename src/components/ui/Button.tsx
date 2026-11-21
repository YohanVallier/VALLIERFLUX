import type { ComponentPropsWithRef, ReactNode } from 'react';
import styles from './Button.module.css';

type SharedProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string | undefined;
};

type ActionProps = SharedProps &
  Omit<ComponentPropsWithRef<'button'>, keyof SharedProps | 'href'> & {
    href?: never;
  };

type NavigationProps = SharedProps &
  Omit<ComponentPropsWithRef<'a'>, keyof SharedProps | 'href' | 'aria-disabled'> & {
    href: string;
    disabled?: never;
  };

export type ButtonProps = ActionProps | NavigationProps;

export function Button(props: ButtonProps) {
  if (typeof props.href === 'string') {
    const { variant = 'primary', className, children, ...linkProps } = props;
    return (
      <a
        {...linkProps}
        className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
        rel={linkProps.target === '_blank' ? 'noopener noreferrer' : linkProps.rel}
      >
        {children}
      </a>
    );
  }

  const { variant = 'primary', className, children, type = 'button', ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      type={type}
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
