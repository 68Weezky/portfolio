import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

export function Header({ name, profileImage }) {
  const { toggleTheme, isLight } = useTheme();
  const navRef = useRef(null);
  const underlineRef = useRef(null);
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const moveUnderline = useCallback((id) => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!nav || !underline) return;
    const link = id && nav.querySelector(`a[href="#${id}"]`);
    if (!link) {
      underline.style.opacity = '0';
      return;
    }
    const lr = link.getBoundingClientRect();
    const nr = nav.getBoundingClientRect();
    underline.style.opacity = '0.9';
    underline.style.width = `${Math.max(24, lr.width)}px`;
    underline.style.transform = `translateX(${lr.left - nr.left}px)`;
  }, []);

  // Scroll-spy: highlight the section nearest the middle of the viewport.
  useEffect(() => {
    const ids = ['hero', ...NAV.map(([id]) => id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === 'hero' ? null : entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the underline under the active link (also on resize).
  useEffect(() => {
    moveUnderline(active);
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => moveUnderline(active));
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [active, moveUnderline]);

  // Header gets a stronger background/shadow after scrolling a little.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="#hero" className="brand" aria-label="Home">
          <img
            src={profileImage}
            alt={name}
            width="32"
            height="32"
            fetchpriority="high"
            decoding="async"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{name}</span>
        </a>

        <nav
          id="primary-nav"
          ref={navRef}
          className={`primary-nav ${menuOpen ? 'open' : ''}`}
          aria-label="Primary"
          onMouseLeave={() => moveUnderline(active)}
        >
          <ul className="nav-list">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  className="nav-link"
                  href={`#${id}`}
                  aria-current={active === id ? 'page' : undefined}
                  onMouseEnter={() => moveUnderline(id)}
                  onFocus={() => moveUnderline(id)}
                  onBlur={() => moveUnderline(active)}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <span className="nav-underline" ref={underlineRef} aria-hidden="true"></span>
        </nav>

        <div className="controls">
          <button
            className="btn ghost theme-btn"
            onClick={toggleTheme}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <span aria-hidden="true">{isLight ? '☾' : '☀'}</span>
            <span className="btn-label">{isLight ? 'Dark' : 'Light'}</span>
          </button>
          <a className="btn primary work-btn" href="#projects">
            View Work
          </a>
          <button
            className="btn ghost menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`burger ${menuOpen ? 'open' : ''}`} aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
