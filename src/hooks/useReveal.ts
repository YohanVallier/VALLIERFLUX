import { useEffect, useRef } from 'react';

/** Conteúdo permanece visível se qualquer API de melhoria estiver indisponível. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined' || typeof element.animate !== 'function') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches) return;
      animation = element.animate([
        { opacity: 0.8, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 260, easing: 'ease-out' });
    }, { threshold: 0.08 });
    function handlePreferenceChange(event: MediaQueryListEvent) {
      if (event.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    }
    preference.addEventListener('change', handlePreferenceChange);
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener('change', handlePreferenceChange);
    };
  }, []);

  return ref;
}
