import { siteConfig, navigation, socialLinks } from '../src/content/site';
import { profile, timeline } from '../src/content/profile';
import { skillCategories } from '../src/content/skills';
import { services } from '../src/content/services';
import { projects } from '../src/content/projects';
import { validateSiteContent } from '../src/lib/contentValidation';

const errors = validateSiteContent({
  siteConfig,
  navigation,
  socialLinks,
  profile,
  timeline,
  skillCategories,
  services,
  projects,
});

if (errors.length > 0) {
  console.error(
    JSON.stringify({
      event: 'content_validation',
      level: 'error',
      result: 'invalid',
      errors,
    }),
  );
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify({
      event: 'content_validation',
      level: 'info',
      result: 'valid',
    }),
  );
}
