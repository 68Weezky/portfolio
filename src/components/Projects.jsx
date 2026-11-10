import { useEffect, useMemo, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { SectionHeading } from './SectionHeading';

const group = (...tags) => {
  const set = new Set(tags);
  return (tag) => set.has(tag);
};

const FILTERS = [
  { label: 'All', match: () => true },
  { label: 'React / Next', match: group('React', 'Next.js') },
  { label: 'Python / Django', match: group('Python', 'Django', 'Django 5', 'FastAPI') },
  { label: 'Node.js', match: group('Node.js', 'Express') },
];

function ProjectCard({ project, index }) {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.12 });

  // 3D tilt + cursor spotlight, driven by CSS variables and throttled with rAF.
  // Only on devices with a real hover-capable pointer, and never with reduced motion.
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let last = null;

    const apply = () => {
      raf = 0;
      if (!last) return;
      const r = card.getBoundingClientRect();
      const x = last.clientX - r.left;
      const y = last.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      card.style.setProperty('--rx', ((y / r.height - 0.5) * -8).toFixed(2));
      card.style.setProperty('--ry', ((x / r.width - 0.5) * 8).toFixed(2));
    };
    const onMove = (e) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      last = null;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      card.style.setProperty('--rx', '0');
      card.style.setProperty('--ry', '0');
    };

    card.addEventListener('mousemove', onMove, { passive: true });
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <article
      ref={ref}
      className={`project-card reveal ${inView ? 'in-view' : ''}`}
      style={{ '--i': index % 3 }}
    >
      <div className="project-thumb">
        <img
          src={project.thumb}
          alt={project.thumbAlt}
          width="640"
          height="400"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {/* Links are always visible. The old hover-only overlay was unreachable on touch screens. */}
        <div className="project-links">
          {project.demo && (
            <a
              className="link-pill primary"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
            >
              Live Demo ↗
            </a>
          )}
          <a
            className="link-pill"
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects({ projects }) {
  const [active, setActive] = useState(0);

  const visible = useMemo(
    () => projects.filter((p) => p.tags.some(FILTERS[active].match)),
    [projects, active]
  );

  return (
    <section id="projects" className="alt" aria-label="Projects">
      <div className="container">
        <SectionHeading title="Projects" sub="Selected work with live demos and source code" />

        <div className="filters" role="group" aria-label="Filter projects by technology">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              type="button"
              className={`chip ${i === active ? 'active' : ''}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {f.label}
            </button>
          ))}
          <span className="filter-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div className="projects-grid">
          {visible.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
