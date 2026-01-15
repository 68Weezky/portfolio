import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

function ProjectCard({ project }) {
  const [cardRef, isInView] = useIntersectionObserver({ threshold: 0.16 });
  const cardElementRef = useRef(null);

  useEffect(() => {
    const card = cardElementRef.current;
    if (!card) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={(node) => {
        cardRef.current = node;
        cardElementRef.current = node;
      }}
      className={`project-card reveal ${isInView ? 'in-view' : ''}`}
      tabIndex="0"
      style={{ transition: 'transform 0.1s ease-out' }}
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
