export function Footer({ name, socials }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Footer">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          © {currentYear} {name}. All rights reserved.
        </div>
        <div className="socials" aria-label="Social links">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener"
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
