import { useEffect, useState } from 'react';
import type { SectionId } from '../types/content';

export function useActiveSection(sectionIds: readonly SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId | null>(sectionIds[0] ?? null);

  useEffect(() => {
    function readHash() {
      const match = sectionIds.find((id) => `#${id}` === window.location.hash);
      if (match) setActiveSection(match);
    }
    readHash();
    window.addEventListener('hashchange', readHash);
    if (typeof IntersectionObserver === 'undefined') {
      return () => window.removeEventListener('hashchange', readHash);
    }

    const visible = new Map<SectionId, number>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = sectionIds.find((candidate) => candidate === entry.target.id);
        if (!id) continue;
        if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top);
        else visible.delete(id);
      }
      const ordered = [...visible.keys()].sort((left, right) => {
        const leftTop = document.getElementById(left)?.getBoundingClientRect().top ?? 0;
        const rightTop = document.getElementById(right)?.getBoundingClientRect().top ?? 0;
        return Math.abs(leftTop - 100) - Math.abs(rightTop - 100);
      });
      const next = ordered[0];
      if (next) setActiveSection(next);
    }, { rootMargin: '-80px 0px -45% 0px', threshold: 0 });

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', readHash);
    };
  }, [sectionIds]);

  return activeSection;
}
