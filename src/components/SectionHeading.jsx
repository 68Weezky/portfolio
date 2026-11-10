import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Section titles previously never got their animated underline because the <h2>
// wasn't inside a reveal wrapper. This wrapper reveals the heading and draws the underline.
export function SectionHeading({ title, sub }) {
  const [ref, inView] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div ref={ref} className={`section-head reveal ${inView ? 'in-view' : ''}`}>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}
