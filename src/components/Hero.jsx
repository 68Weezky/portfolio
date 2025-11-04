import { useEffect, useRef } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

export function Hero({ name, titleKicker, subtitle, heroPhrases }) {
  const typedText = useTypingEffect(heroPhrases);
  const blobRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    const card = cardRef.current;
    if (!blob || !card) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      blob.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px)`;
      card.style.transform = `translate(${x * -0.8}px, ${y * -0.8}px)`;
    };

    const handleScroll = () => {
      const s = window.scrollY * 0.06;
      blob.style.translate = `0 ${s}px`;
      card.style.translate = `0 ${s * -0.6}px`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="hero" aria-label="Hero">
      <div className="container hero-grid">
        <div>
          <div className="kicker">{titleKicker}</div>
          <h1 className="display">
            Hi, I'm {name}
            <br />
            <span className="typed" aria-live="polite">
              {typedText}
            </span>
          </h1>
          <p className="subtitle">{subtitle}</p>
          <div className="hero-cta">
            <a className="btn primary" href="#contact">
              Hire Me
            </a>
            <a className="btn ghost" href="#about">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="blob" ref={blobRef}></div>
          <div className="device-card" ref={cardRef}>
            <div className="device-header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="screen">
              <div className="code-line" style={{ top: '20px', width: '60%' }}></div>
              <div className="code-line" style={{ top: '44px', width: '78%' }}></div>
              <div className="code-line" style={{ top: '68px', width: '40%' }}></div>
              <div className="code-line" style={{ top: '102px', width: '86%' }}></div>
              <div className="code-line" style={{ top: '126px', width: '52%' }}></div>
              <div className="code-line" style={{ top: '160px', width: '72%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
