import { useEffect, useRef } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

export function Hero({ name, titleKicker, subtitle, heroPhrases }) {
  const typedText = useTypingEffect(heroPhrases);
  const artRef = useRef(null);

  // Parallax is driven by CSS custom properties (--mx, --my, --sy) and applied through the
  // independent `translate` property in CSS. That means it no longer fights the floating
  // keyframe animations (which use `transform`), and it's throttled to one write per frame.
  useEffect(() => {
    const art = artRef.current;
    if (!art) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let raf = 0;
    let mx = 0;
    let my = 0;
    let sy = 0;
    let heroVisible = true;

    const apply = () => {
      raf = 0;
      art.style.setProperty('--mx', mx.toFixed(2));
      art.style.setProperty('--my', my.toFixed(2));
      art.style.setProperty('--sy', sy.toFixed(2));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onMove = (e) => {
      if (!heroVisible) return;
      mx = (e.clientX / window.innerWidth - 0.5) * 10;
      my = (e.clientY / window.innerHeight - 0.5) * 10;
      schedule();
    };
    const onScroll = () => {
      if (!heroVisible) return;
      sy = Math.min(window.scrollY, window.innerHeight) * 0.06;
      schedule();
    };

    // Skip all work while the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
    });
    io.observe(art);

    if (canHover) window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" aria-label="Hero">
      <div className="container hero-grid">
        <div>
          <div className="kicker">{titleKicker}</div>
          <h1 className="display">
            Hi, I'm <span className="grad-text">{name}</span>
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
        <div className="hero-art" ref={artRef} aria-hidden="true">
          <div className="blob"></div>
          <span className="float-chip chip-a">Django</span>
          <span className="float-chip chip-b">React</span>
          <span className="float-chip chip-c">Node.js</span>
          <div className="device-card">
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
