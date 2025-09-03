/* Theme toggle with localStorage */
(function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  const updateLabel = () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    btn.setAttribute('aria-pressed', String(isLight));
  };
  updateLabel();
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabel();
  });
})();

/* Typing effect */
(function typingEffect() {
  const el = document.getElementById('typedText');
  const phrases = ['I design UX/UI.', 'I architect APIs.', 'I ship reliable software.'];
  let p = 0, i = 0, deleting = false;
  const speed = { type: 75, delete: 40, pause: 1100 };
  function tick() {
    const phrase = phrases[p];
    if (!deleting) {
      i++;
      el.textContent = phrase.slice(0, i);
      if (i === phrase.length) { deleting = true; setTimeout(tick, speed.pause); return; }
    } else {
      i--;
      el.textContent = phrase.slice(0, i);
      if (i === 0) { deleting = false; p = (p + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? speed.delete : speed.type);
  }
  setTimeout(tick, 400);
})();

/* Parallax in hero: subtle mouse/scroll parallax */
(function parallax() {
  const blob = document.getElementById('blob');
  const card = document.getElementById('deviceCard');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    blob.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px)`;
    card.style.transform = `translate(${x * -0.8}px, ${y * -0.8}px)`;
  }, { passive: true });
  window.addEventListener('scroll', () => {
    const s = window.scrollY * 0.06;
    blob.style.translate = `0 ${s}px`;
    card.style.translate = `0 ${s * -0.6}px`;
  }, { passive: true });
})();

/* IntersectionObserver reveal + skill bars */
(function revealOnScroll() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const bars = Array.from(document.querySelectorAll('.bar'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.classList.contains('skill-card')) {
          const bar = entry.target.querySelector('.bar > span');
          if (bar) {
            const pct = entry.target.querySelector('.bar').dataset.progress || '0';
            requestAnimationFrame(() => { bar.style.width = pct + '%'; });
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: prefersReduced ? 0 : 0.16 });
  revealEls.forEach(el => observer.observe(el));
  bars.forEach(bar => {
    const span = bar.querySelector('span');
    const pct = bar.dataset.progress || '0';
    const o = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (en.isIntersecting) {
          requestAnimationFrame(() => { span.style.width = pct + '%'; });
          o.unobserve(bar);
        }
      });
    }, { threshold: prefersReduced ? 0 : 0.2 });
    o.observe(bar);
  });
})();

/* Active nav underline following current section */
(function navUnderline() {
  const underline = document.getElementById('navUnderline');
  const links = Array.from(document.querySelectorAll('.nav-link'));
  function moveTo(link) {
    const rect = link.getBoundingClientRect();
    const parentRect = link.parentElement.parentElement.getBoundingClientRect();
    const width = Math.max(24, rect.width);
    underline.style.width = width + 'px';
    underline.style.transform = `translateX(${rect.left - parentRect.left}px)`;
  }
  links.forEach(l => {
    l.addEventListener('mouseenter', () => moveTo(l));
    l.addEventListener('focus', () => moveTo(l));
  });
  const sections = ['about','skills','projects','experience','contact']
    .map(id => document.getElementById(id));
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      const link = links.find(a => a.getAttribute('href') === '#' + visible.target.id);
      if (link) moveTo(link);
    }
  }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
  sections.forEach(s => s && sectionObserver.observe(s));
  setTimeout(() => moveTo(links[0]), 300);
  window.addEventListener('resize', () => {
    const current = document.querySelector('.nav-link[aria-current="page"]') || links[0];
    moveTo(current);
  });
})();

/* Scroll to top button */
(function scrollTopBtn() {
  const btn = document.getElementById('scrollTop');
  const hero = document.getElementById('hero');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) btn.classList.add('visible');
      else btn.classList.remove('visible');
    });
  }, { threshold: 0.01 });
  io.observe(hero);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* Contact form validation */
(function formValidation() {
  // Replace with your Formspree endpoint after creating a form:
  // 1) Go to https://formspree.io, create a new form.
  // 2) Copy the endpoint like https://formspree.io/f/abcdwxyz and paste below.
  const CONTACT_ENDPOINT = 'https://formspree.io/f/xrbaynqr';
  const form = document.getElementById('contactForm');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const status = document.getElementById('formStatus');
  const errs = { name: document.getElementById('nameError'), email: document.getElementById('emailError'), message: document.getElementById('messageError') };
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function setError(el, msg) {
    errs[el.id].textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    let ok = true;
    if (!name.value.trim()) { setError(name, 'Please enter your name.'); ok = false; } else setError(name, '');
    if (!email.value.trim() || !validateEmail(email.value)) { setError(email, 'Enter a valid email.'); ok = false; } else setError(email, '');
    if (!message.value.trim() || message.value.trim().length < 10) { setError(message, 'Message should be at least 10 characters.'); ok = false; } else setError(message, '');
    if (!ok) return;
    const btn = document.getElementById('sendBtn');
    const old = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';

    // Deliver via Formspree
    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        replyTo: email.value.trim(),
        _subject: `Portfolio message from ${name.value.trim()}`
      })
    }).then(async (res) => {
      if (!res.ok) throw new Error('Failed');
      form.reset();
      status.textContent = 'Thanks! Your message has been sent.';
    }).catch((err) => {
      console.error(err);
      status.textContent = 'Sorry, something went wrong. Please try again.';
    }).finally(() => {
      btn.disabled = false; btn.textContent = old;
    });
  });
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


