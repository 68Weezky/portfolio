import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function About({ profileImage, name }) {
  const [avatarRef, avatarInView] = useIntersectionObserver({ threshold: 0.16 });
  const [textRef, textInView] = useIntersectionObserver({ threshold: 0.16 });

  return (
    <section id="about" className="alt" aria-label="About">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-sub">
          A Computer Science graduate with 2+ years of experience specializing in full‑stack development
        </p>
        <div className="about">
          <div
            ref={avatarRef}
            className={`reveal ${avatarInView ? 'in-view' : ''}`}
          >
            <div className="avatar-wrap">
              <img
                src={profileImage}
                alt={name}
                width="220"
                height="220"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div ref={textRef} className={`reveal ${textInView ? 'in-view' : ''}`}>
            <p>
              I'm passionate about building user-centric products end‑to‑end — from designing intuitive
              interfaces to deploying scalable backends. My toolkit includes Python, Django,
              JavaScript, and Node.js, with a strong focus on performance, accessibility, and
              clean code.
            </p>
            <p>
              Beyond code, I enjoy mentoring peers, contributing to open‑source, and designing
              experiences that feel effortless. I'm currently seeking internship, full-time and
              freelance opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
