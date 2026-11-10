import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element scrolls into view.
 *
 * Options are destructured into primitives so the effect dependencies stay stable.
 * (The previous version depended on the `options` object itself, which is a new object
 * every render, so every component tore down and rebuilt its observer on each re-render.)
 */
export function useIntersectionObserver({ threshold = 0.12, rootMargin = '0px 0px -6% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
}
