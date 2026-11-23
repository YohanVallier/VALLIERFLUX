import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { contact, siteConfig } from '../../content/site';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

export interface ContactProps {
  email?: string | undefined;
  githubUrl?: string | undefined;
  linkedinUrl?: string | undefined;
}

export function Contact({
  email = siteConfig.email,
  githubUrl = siteConfig.github,
  linkedinUrl = siteConfig.linkedin,
}: ContactProps) {
  return (
    <section id="contato" aria-labelledby="contato-heading" className={styles.section}>
      <Container>
        <SectionHeading
          id="contato-heading"
          eyebrow="06 / Contato"
          title={contact.title}
          description={contact.description}
        />

        <div className={styles.grid}>
          <div className={styles.formPanel}>
            <ContactForm />
          </div>

          <aside className={styles.channels} aria-label="Canais diretos de contato">
            <h3>Canais diretos</h3>
            <p className={styles.channelsLead}>
              Prefere falar diretamente? Utilize um dos canais oficiais abaixo.
            </p>
            <ul className={styles.channelList}>
              <li>
                <a href={`mailto:${email}`} className={styles.channelLink}>
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Mail size={20} />
                  </span>
                  <span className={styles.channelMeta}>
                    <span className={styles.channelLabel}>E-mail</span>
                    <span className={styles.channelValue}>{email}</span>
                  </span>
                  <ArrowUpRight className={styles.channelArrow} size={18} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelLink}
                >
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Github size={20} />
                  </span>
                  <span className={styles.channelMeta}>
                    <span className={styles.channelLabel}>GitHub</span>
                    <span className={styles.channelValue}>
                      {githubUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </span>
                  <ArrowUpRight className={styles.channelArrow} size={18} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelLink}
                >
                  <span className={styles.channelIcon} aria-hidden="true">
                    <Linkedin size={20} />
                  </span>
                  <span className={styles.channelMeta}>
                    <span className={styles.channelLabel}>LinkedIn</span>
                    <span className={styles.channelValue}>
                      {linkedinUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </span>
                  <ArrowUpRight className={styles.channelArrow} size={18} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
