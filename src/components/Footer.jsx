export function Footer({ name, socials }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Footer">
      <div className="container footer-inner">
        <div>
          © {currentYear} {name}. All rights reserved.
        </div>
        <div className="socials" aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
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
