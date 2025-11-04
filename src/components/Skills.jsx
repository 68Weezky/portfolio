import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function SkillCard({ skill }) {
  const [cardRef, isInView] = useIntersectionObserver({ threshold: 0.16 });
  const barRef = useRef(null);

  useEffect(() => {
    if (isInView && barRef.current) {
      const bar = barRef.current.querySelector('span');
      if (bar) {
        requestAnimationFrame(() => {
          bar.style.width = skill.progress + '%';
        });
      }
    }
  }, [isInView, skill.progress]);

  return (
    <div ref={cardRef} className={`skill-card reveal ${isInView ? 'in-view' : ''}`}>
      <div className="skill-title">{skill.title}</div>
      <div className="bar" ref={barRef} data-progress={skill.progress}>
        <span></span>
      </div>
      <div className="tags">
        {skill.tags.map((tag, idx) => (
          <span key={idx} className="tag">
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
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">Front‑end, Back‑end, and Tools</p>
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <SkillCard key={idx} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
