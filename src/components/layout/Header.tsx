import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { brandIdentity, navigation } from '../../content/site';
import type { SectionId } from '../../types/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Container } from '../ui/Container';
import styles from './Header.module.css';

const sectionIds = navigation.map(({ id }) => id);
const desktopQuery = '(min-width: 72rem)';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    setIsDesktop(media.matches);

    function handleViewportChange(event: MediaQueryListEvent) {
      const focused = document.activeElement;
      setIsDesktop(event.matches);
      if (event.matches && focused === triggerRef.current) {
        navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
      } else if (!event.matches && focused && navRef.current?.contains(focused)) {
        triggerRef.current?.focus();
      }
      setIsOpen(false);
    }

    media.addEventListener('change', handleViewportChange);
    return () => media.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      triggerRef.current?.focus();
      setIsOpen(false);
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  function closeAfterNavigation(id: SectionId) {
    const section = document.getElementById(id);
    const target =
      section?.querySelector<HTMLElement>('h1, h2') ??
      section ??
      document.getElementById('conteudo') ??
      triggerRef.current;

    if (target) {
      if (target !== triggerRef.current) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    setIsOpen(false);
  }

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <a
          className={styles.brand}
          href="#inicio"
          onClick={() => closeAfterNavigation('inicio')}
          aria-label={`${brandIdentity.wordmark} — Início`}
        >
          <span className={styles.symbol} aria-hidden="true">{brandIdentity.symbol}</span>
          <span>VALLIER<span className={styles.accent}>.</span>FLUX</span>
        </a>
        <button
          ref={triggerRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={isDesktop ? undefined : 'primary-navigation'}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
        <nav
          ref={navRef}
          id="primary-navigation"
          className={styles.navigation}
          data-open={isOpen}
          inert={!isDesktop && !isOpen}
          aria-label="Navegação principal"
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== triggerRef.current
            ) {
              setIsOpen(false);
            }
          }}
        >
          <ul>
            {navigation.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={() => closeAfterNavigation(id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
