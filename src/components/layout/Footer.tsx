import { ArrowUpRight } from 'lucide-react';
import { brandIdentity, siteConfig } from '../../content/site';
import { Container } from '../ui/Container';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div><a className={styles.brand} href="#inicio">{brandIdentity.wordmark}</a><p className={styles.slogan}>{brandIdentity.slogan}</p></div>
        <p className={styles.owner}>Portfólio de {siteConfig.owner}.</p>
        <a className={styles.back} href="#inicio">Voltar ao início <ArrowUpRight size={18} aria-hidden="true" /></a>
      </Container>
    </footer>
  );
}
