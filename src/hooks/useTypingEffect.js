import { useEffect, useState } from 'react';

// Module-level constant so the effect below doesn't restart on every render.
// (The old default-parameter object was recreated each render, which reset the
// timer after every typed character and made the typing feel slow and jittery.)
const DEFAULT_SPEED = { type: 70, delete: 35, pause: 1400 };

export function useTypingEffect(phrases, speed = DEFAULT_SPEED) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setText(phrases[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, speed.pause);
          return;
        }
        timer = setTimeout(tick, speed.type);
      } else {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, speed.type * 4);
          return;
        }
        timer = setTimeout(tick, speed.delete);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [phrases, speed]);

  return text;
}
