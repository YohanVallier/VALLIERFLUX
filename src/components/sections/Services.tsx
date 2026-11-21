import {
  AppWindow,
  ChartNoAxesCombined,
  Component,
  FileCode,
  ListChecks,
  PanelsTopLeft,
  Plug,
  ScanSearch,
  Workflow,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services, servicesContent } from '../../content/services';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useReveal } from '../../hooks/useReveal';
import styles from './Services.module.css';

type ServiceIconId = (typeof services)[number]['iconId'];

const serviceIcons = {
  'chart-no-axes-combined': ChartNoAxesCombined,
  'file-code': FileCode,
  workflow: Workflow,
  'scan-search': ScanSearch,
  plug: Plug,
  'app-window': AppWindow,
  'panels-top-left': PanelsTopLeft,
  wrench: Wrench,
  component: Component,
  'list-checks': ListChecks,
} satisfies Record<ServiceIconId, LucideIcon>;

function resolveServiceIcon(iconId: string): LucideIcon {
  const entry = Object.entries(serviceIcons).find(([id]) => id === iconId);
  return entry?.[1] ?? Component;
}

export function Services() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="servicos" className={styles.section} aria-labelledby="servicos-title">
      <Container>
        <SectionHeading
          id="servicos-title"
          eyebrow="04 / Serviços"
          title={servicesContent.title}
          description={servicesContent.description}
        />
        <div ref={ref} className={styles.grid}>
          {services.map((service) => {
            const Icon = resolveServiceIcon(service.iconId);
            return (
              <article className={styles.card} key={service.id}>
                <span className={styles.icon}><Icon size={24} aria-hidden="true" /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
