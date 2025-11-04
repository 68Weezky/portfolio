import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

export function Header({ name, profileImage }) {
  const { toggleTheme, isLight } = useTheme();
  const underlineRef = useRef(null);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');
    const underline = underlineRef.current;
    if (!underline) return;

    const moveTo = (link) => {
      const rect = link.getBoundingClientRect();
      const parentRect = link.parentElement.parentElement.getBoundingClientRect();
      const width = Math.max(24, rect.width);
      underline.style.width = width + 'px';
      underline.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    };

    links.forEach((l) => {
      l.addEventListener('mouseenter', () => moveTo(l));
      l.addEventListener('focus', () => moveTo(l));
    });

    const sections = ['about', 'skills', 'projects', 'experience', 'contact'].map(
      (id) => document.getElementById(id)
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const link = Array.from(links).find(
            (a) => a.getAttribute('href') === '#' + visible.target.id
          );
          if (link) {
            moveTo(link);
            setActiveLink(link);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => s && sectionObserver.observe(s));

    setTimeout(() => {
      if (links[0]) moveTo(links[0]);
    }, 300);

    const handleResize = () => {
      const current = document.querySelector('.nav-link[aria-current="page"]') || links[0];
      if (current) moveTo(current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="site-header" aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="#hero" className="brand" aria-label="Home">
          <img
            src={profileImage}
            alt={name}
            width="32"
            height="32"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>{name}</span>
        </a>
        <nav className="primary-nav" aria-label="Primary">
          <ul className="nav-list">
            <li>
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="#skills">
                Skills
              </a>
            </li>
            <li>
              <a className="nav-link" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="nav-link" href="#experience">
                Experience
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <span className="nav-underline" ref={underlineRef} aria-hidden="true"></span>
        </nav>
        <div className="controls">
          <button
            className="btn ghost"
            onClick={toggleTheme}
            aria-pressed={isLight}
            aria-label="Toggle dark mode"
          >
            {isLight ? 'Dark Mode' : 'Light Mode'}
          </button>
          <a className="btn primary" href="#projects">
            View Work
          </a>
        </div>
      </div>
    </header>
  );
}
