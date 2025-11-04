import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(phrases, speed = { type: 75, delete: 40, pause: 1100 }) {
  const [text, setText] = useState('');
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const phrase = phrases[phraseIndexRef.current];
      if (!phrase) return;

      if (!isDeletingRef.current) {
        if (charIndexRef.current < phrase.length) {
          charIndexRef.current++;
          setText(phrase.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, speed.type);
        } else {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(tick, speed.pause);
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setText(phrase.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, speed.delete);
        } else {
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timeoutRef.current = setTimeout(tick, speed.type);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 400);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phrases, speed]);

  return text;
}
