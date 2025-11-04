import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

function TimelineEntry({ entry }) {
  const [entryRef, isInView] = useIntersectionObserver({ threshold: 0.16 });

  return (
    <div ref={entryRef} className={`entry reveal ${isInView ? 'in-view' : ''}`}>
      <h4>{entry.heading}</h4>
      <div className="meta">{entry.meta}</div>
      <p>{entry.text}</p>
    </div>
  );
}

export function Experience({ timeline }) {
  return (
    <section id="experience" aria-label="Experience and Education">
      <div className="container">
        <h2 className="section-title">Experience & Education</h2>
        <p className="section-sub">A brief timeline of my journey</p>
        <div className="timeline">
          {timeline.map((entry, idx) => (
            <TimelineEntry key={idx} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
