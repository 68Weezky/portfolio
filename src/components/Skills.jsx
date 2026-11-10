import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { SectionHeading } from './SectionHeading';

function CountUp({ to, run }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    let raf = 0;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return <span className="skill-pct">{n}%</span>;
}

function SkillCard({ skill, index }) {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.16 });

  return (
    <div
      ref={ref}
      className={`skill-card reveal ${inView ? 'in-view' : ''}`}
      style={{ '--i': index }}
    >
      <div className="skill-head">
        <div className="skill-title">{skill.title}</div>
        <CountUp to={skill.progress} run={inView} />
      </div>
      {/* Bar fill is a compositor-only scaleX transition driven by --p (no JS, no layout) */}
      <div className="bar" style={{ '--p': skill.progress }} aria-hidden="true">
        <span></span>
      </div>
      <div className="tags">
        {skill.tags.map((tag, idx) => (
          <span key={tag} className="tag" style={{ '--i': idx }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills({ skills }) {
  return (
    <section id="skills" aria-label="Skills">
      <div className="container">
        <SectionHeading title="Skills" sub="Front‑end, Back‑end, and Tools" />
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <SkillCard key={skill.title} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
