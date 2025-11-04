import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function ProjectCard({ project }) {
  const [cardRef, isInView] = useIntersectionObserver({ threshold: 0.16 });

  return (
    <article
      ref={cardRef}
      className={`project-card reveal ${isInView ? 'in-view' : ''}`}
      tabIndex="0"
    >
      <div className="project-thumb">
        <img src={project.thumb} alt={project.thumbAlt} />
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="project-overlay" aria-hidden="true">
        {project.demo && (
          <a className="link-pill" href={project.demo} target="_blank" rel="noopener">
            Live Demo
          </a>
        )}
        <a className="link-pill" href={project.code} target="_blank" rel="noopener">
          GitHub
        </a>
      </div>
    </article>
  );
}

export function Projects({ projects }) {
  return (
    <section id="projects" className="alt" aria-label="Projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">Selected work with live demos and source code</p>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
