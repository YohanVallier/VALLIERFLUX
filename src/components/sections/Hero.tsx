import { ArrowDownRight, Github, Linkedin, Terminal } from 'lucide-react';
import { brandIdentity, hero, socialLinks } from '../../content/site';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { IconLink } from '../ui/IconLink';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="inicio-title">
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.slogan}>{brandIdentity.slogan}</p>
          <p className={styles.name}>{hero.owner}</p>
          <p className={styles.identity}>{hero.professionalIdentity}</p>
          <h1 id="inicio-title">{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.actions}>
            <Button href={hero.primaryAction.href}>{hero.primaryAction.label}<ArrowDownRight aria-hidden="true" /></Button>
            <Button href={hero.secondaryAction.href} variant="secondary">{hero.secondaryAction.label}</Button>
          </div>
          <div className={styles.socials}>
            {socialLinks.map((link) => <IconLink key={link.id} href={link.href} label={link.label} icon={link.id === 'github' ? Github : Linkedin} />)}
            <span>Conecte-se com Yohan</span>
          </div>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.orbit} />
          <div className={styles.terminal}>
            <div className={styles.toolbar}><span className={styles.dots}>● ● ●</span><span>vallier.flux / workspace</span><Terminal size={16} /></div>
            <div className={styles.code}>
              <p><span className={styles.comment}>// Uma ideia. Muitas conexões.</span></p>
              <p><span className={styles.keyword}>const</span> flux = {'{'}</p>
              <p className={styles.indent}>code: <span className={styles.string}>'construir'</span>,</p>
              <p className={styles.indent}>data: <span className={styles.string}>'compreender'</span>,</p>
              <p className={styles.indent}>automation: <span className={styles.string}>'conectar'</span></p>
              <p>{'};'}</p>
              <div className={styles.pipeline}><span>IDEIA</span><span>→</span><span>CÓDIGO</span><span>→</span><span>SOLUÇÃO</span></div>
              <p className={styles.prompt}>› CODE. DATA. AUTOMATION.<span className={styles.cursor}>_</span></p>
            </div>
          </div>
          <div className={styles.badge}>VF <span>interfaces / dados / conexões</span></div>
        </div>
      </Container>
    </section>
  );
}
