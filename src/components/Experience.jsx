import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { SectionHeading } from './SectionHeading';

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
  const [lineRef, lineInView] = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="experience" aria-label="Experience and Education">
      <div className="container">
        <SectionHeading title="Experience & Education" sub="A brief timeline of my journey" />
        <div ref={lineRef} className={`timeline ${lineInView ? 'in-view' : ''}`}>
          {timeline.map((entry) => (
            <TimelineEntry key={entry.heading} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
