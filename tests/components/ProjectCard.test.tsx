import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '../../src/components/projects/ProjectCard';
import type { Project } from '../../src/types/content';

const pendingProject: Project = {
  id: 'dataforge',
  name: 'DataForge',
  repositoryUrl: 'https://github.com/YohanVallier/DataForge',
  verificationStatus: 'pending',
  summary: null,
  problem: null,
  technologies: [],
  features: [],
  technicalHighlight: null,
  evidence: [],
};

describe('ProjectCard', () => {
  it('exibe pendência e campos desconhecidos sem inventar conteúdo', () => {
    render(<ProjectCard project={pendingProject} />);
    expect(screen.getByRole('heading', { name: 'DataForge' })).toBeInTheDocument();
    expect(screen.getByText(/Detalhes técnicos em verificação/)).toBeInTheDocument();
    expect(screen.getAllByText('Não informado nas fontes revisadas.').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Acessar GitHub: DataForge/ })).toHaveAttribute(
      'href',
      pendingProject.repositoryUrl,
    );
  });

  it('exibe tecnologias e funcionalidades quando verificadas', () => {
    const verified: Project = {
      ...pendingProject,
      verificationStatus: 'verified',
      technologies: ['Python', 'Pandas'],
      features: ['Consolidação de dados'],
    };
    render(<ProjectCard project={verified} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Pandas')).toBeInTheDocument();
    expect(screen.getByText('Consolidação de dados')).toBeInTheDocument();
  });
});
