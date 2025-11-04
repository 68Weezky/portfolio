#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Static site generator for the portfolio.

Edit the data structures below and run:
  python build.py

This script will regenerate index.html from the structured data without external deps.
"""

from __future__ import annotations
from pathlib import Path
from datetime import datetime


# ---------- Content Data ----------
SITE = {
    "name": "John Doe",
    "title_kicker": "Full‑Stack Developer",
    "hero_phrases": [
        "I design UX/UI.",
        "I architect APIs.",
        "I ship reliable software.",
    ],
    "subtitle": (
        "I build fast, accessible web apps with Python/Django and JavaScript/Node.js. "
        "I love crafting delightful experiences with thoughtful UI and high‑quality code."
    ),
    "email": "john.doe@example.com",
    "socials": [
        {"label": "GitHub", "href": "https://github.com/"},
        {"label": "LinkedIn", "href": "https://linkedin.com/"},
        {"label": "Resume", "href": "#"},
    ],
}

SKILLS = [
    {
        "title": "Front‑end",
        "progress": 90,
        "tags": ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive UI"],
    },
    {
        "title": "Back‑end",
        "progress": 85,
        "tags": ["Python", "Django", "Node.js", "REST APIs"],
    },
    {
        "title": "Tools",
        "progress": 80,
        "tags": ["Git", "Docker", "Figma", "CI/CD"],
    },
]

PROJECTS = [
    {
        "thumb": "Analytics Dashboard",
        "title": "InsightBoard",
        "desc": "A real‑time analytics dashboard with interactive charts and role‑based access.",
        "tags": ["Django", "PostgreSQL", "Charts"],
        "demo": "#",
        "code": "#",
    },
    {
        "thumb": "E‑commerce API",
        "title": "ShopServe",
        "desc": "Scalable e‑commerce backend with payments, caching, and webhooks.",
        "tags": ["Node.js", "Express", "Stripe"],
        "demo": "#",
        "code": "#",
    },
    {
        "thumb": "Portfolio Generator",
        "title": "PortaGen",
        "desc": "CLI tool that scaffolds beautiful portfolio sites from templates.",
        "tags": ["Python", "Typer", "Jinja"],
        "demo": "#",
        "code": "#",
    },
]

TIMELINE = [
    {
        "heading": "Software Engineering Intern — Acme Tech",
        "meta": "Summer 2024 · Remote",
        "text": (
            "Built features for an internal dashboard using Django and React; reduced API "
            "latency by 32% through query optimization and caching."
        ),
    },
    {
        "heading": "Teaching Assistant — Data Structures",
        "meta": "2023‑2024 · University",
        "text": (
            "Led weekly labs and mentored 60+ students; authored clear visualizations and tests "
            "to reinforce concepts."
        ),
    },
    {
        "heading": "B.Sc. Computer Science — University",
        "meta": "Expected 2026",
        "text": (
            "Specialization in full‑stack web development, with electives in distributed systems and HCI."
        ),
    },
]


# ---------- HTML Generators ----------
def render_skill_card(card: dict) -> str:
    tags = "".join(f'<span class="tag">{t}</span>' for t in card["tags"])
    return (
        f'<div class="skill-card reveal">\n'
        f'  <div class="skill-title">{card["title"]}</div>\n'
        f'  <div class="bar" data-progress="{card["progress"]}"><span></span></div>\n'
        f'  <div class="tags">{tags}</div>\n'
        f'</div>'
    )


def render_project_card(p: dict) -> str:
    tags = "".join(f'<span class="tag">{t}</span>' for t in p["tags"])
    return (
        f'<article class="project-card reveal" tabindex="0">\n'
        f'  <div class="project-thumb">{p["thumb"]}</div>\n'
        f'  <div class="project-body">\n'
        f'    <h3 class="project-title">{p["title"]}</h3>\n'
        f'    <p class="project-desc">{p["desc"]}</p>\n'
        f'    <div class="project-tags">{tags}</div>\n'
        f'  </div>\n'
        f'  <div class="project-overlay" aria-hidden="true">\n'
        f'    <a class="link-pill" href="{p["demo"]}" target="_blank" rel="noopener">Live Demo</a>\n'
        f'    <a class="link-pill" href="{p["code"]}" target="_blank" rel="noopener">GitHub</a>\n'
        f'  </div>\n'
        f'</article>'
    )


def render_timeline_entry(e: dict) -> str:
    return (
        f'<div class="entry reveal">\n'
        f'  <h4>{e["heading"]}</h4>\n'
        f'  <div class="meta">{e["meta"]}</div>\n'
        f'  <p>{e["text"]}</p>\n'
        f'</div>'
    )


def render_social_links(links: list[dict]) -> str:
    return "".join(
        f'<a href="{l["href"]}" target="_blank" rel="noopener" aria-label="{l["label"]}">{l["label"]}</a>'
        for l in links
    )


# ---------- Template (single file, embedded CSS/JS) ----------
TEMPLATE = """<!DOCTYPE html>
<html lang=\"en\" dir=\"ltr\" data-theme=\"dark\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />
    <title>{name} — Full‑Stack Developer</title>
    <meta name=\"description\" content=\"Portfolio of a full‑stack developer specializing in Python, Django, JavaScript, and Node.js.\" />
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />
    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap\" rel=\"stylesheet\" />
    <link rel=\"stylesheet\" href=\"./styles.css\" />
  </head>
  <body>
    <!-- Header / Navigation with moving underline indicator -->
    <header class=\"site-header\" aria-label=\"Main navigation\">
      <div class=\"container nav-inner\">
        <a href=\"#hero\" class=\"brand\" aria-label=\"Home\">
          <span class=\"brand-logo\" aria-hidden=\"true\"></span>
          <span>{name}</span>
        </a>
        <nav class=\"primary-nav\" aria-label=\"Primary\">
          <ul class=\"nav-list\" id=\"navList\">
            <li><a class=\"nav-link\" href=\"#about\">About</a></li>
            <li><a class=\"nav-link\" href=\"#skills\">Skills</a></li>
            <li><a class=\"nav-link\" href=\"#projects\">Projects</a></li>
            <li><a class=\"nav-link\" href=\"#experience\">Experience</a></li>
            <li><a class=\"nav-link\" href=\"#contact\">Contact</a></li>
          </ul>
          <span class=\"nav-underline\" id=\"navUnderline\" aria-hidden=\"true\"></span>
        </nav>
        <div class=\"controls\">
          <button class=\"btn ghost\" id=\"themeToggle\" aria-pressed=\"false\" aria-label=\"Toggle dark mode\">Toggle Theme</button>
          <a class=\"btn primary\" href=\"#projects\">View Work</a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section id=\"hero\" aria-label=\"Hero\">
      <div class=\"container hero-grid\">
        <div>
          <div class=\"kicker\">{title_kicker}</div>
          <h1 class=\"display\">Hi, I'm {name}<br /><span class=\"typed\" id=\"typedText\" aria-live=\"polite\"></span></h1>
          <p class=\"subtitle\">{subtitle}</p>
          <div class=\"hero-cta\">
            <a class=\"btn primary\" href=\"#contact\">Hire Me</a>
            <a class=\"btn ghost\" href=\"#about\">Learn More</a>
          </div>
        </div>
        <div class=\"hero-art\" aria-hidden=\"true\">
          <div class=\"blob\" id=\"blob\"></div>
          <div class=\"device-card\" id=\"deviceCard\">
            <div class=\"device-header\"> <div class=\"dot\"></div><div class=\"dot\"></div><div class=\"dot\"></div> </div>
            <div class=\"screen\" id=\"screen\">
              <div class=\"code-line\" style=\"top:20px;width:60%\"></div>
              <div class=\"code-line\" style=\"top:44px;width:78%\"></div>
              <div class=\"code-line\" style=\"top:68px;width:40%\"></div>
              <div class=\"code-line\" style=\"top:102px;width:86%\"></div>
              <div class=\"code-line\" style=\"top:126px;width:52%\"></div>
              <div class=\"code-line\" style=\"top:160px;width:72%\"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section id=\"about\" class=\"alt\" aria-label=\"About\">
      <div class=\"container\">
        <h2 class=\"section-title\">About Me</h2>
        <p class=\"section-sub\">4th‑year CS student specializing in full‑stack development</p>
        <div class=\"about\">
          <div class=\"avatar reveal\">
            <div class=\"avatar-wrap\">
              <svg width=\"220\" height=\"220\" viewBox=\"0 0 220 220\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Profile image placeholder\">
                <defs>
                  <linearGradient id=\"g\" x1=\"0\" x2=\"1\"> <stop offset=\"0%\" stop-color=\"#7c9eff\"/> <stop offset=\"100%\" stop-color=\"#59ffa8\"/> </linearGradient>
                </defs>
                <rect width=\"100%\" height=\"100%\" fill=\"url(#g)\" opacity=\"0.12\"/>
                <circle cx=\"110\" cy=\"85\" r=\"40\" fill=\"url(#g)\" opacity=\"0.35\"/>
                <rect x=\"50\" y=\"128\" width=\"120\" height=\"70\" rx=\"35\" fill=\"url(#g)\" opacity=\"0.35\"/>
              </svg>
            </div>
          </div>
          <div class=\"reveal\">
            <p>I'm passionate about building products end‑to‑end—from designing intuitive interfaces to deploying scalable backends. My toolkit includes Python, Django, JavaScript, and Node.js, with a strong focus on performance, accessibility, and clean code.</p>
            <p>Beyond code, I enjoy mentoring peers, contributing to open‑source, and designing experiences that feel effortless. I'm currently seeking internship and freelance opportunities.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id=\"skills\" aria-label=\"Skills\">
      <div class=\"container\">
        <h2 class=\"section-title\">Skills</h2>
        <p class=\"section-sub\">Front‑end, Back‑end, and Tools</p>
        <div class=\"skills-grid\">{skills_html}</div>
      </div>
    </section>

    <!-- Projects -->
    <section id=\"projects\" class=\"alt\" aria-label=\"Projects\">
      <div class=\"container\">
        <h2 class=\"section-title\">Projects</h2>
        <p class=\"section-sub\">Selected work with live demos and source code</p>
        <div class=\"projects-grid\">{projects_html}</div>
      </div>
    </section>

    <!-- Experience / Education -->
    <section id=\"experience\" aria-label=\"Experience and Education\">
      <div class=\"container\">
        <h2 class=\"section-title\">Experience & Education</h2>
        <p class=\"section-sub\">A brief timeline of my journey</p>
        <div class=\"timeline\">{timeline_html}</div>
      </div>
    </section>

    <!-- Contact -->
    <section id=\"contact\" class=\"alt\" aria-label=\"Contact\">
      <div class=\"container\">
        <h2 class=\"section-title\">Get In Touch</h2>
        <p class=\"section-sub\">Have a project or role in mind? Let's talk.</p>
        <div class=\"contact-grid\">
          <div class=\"form reveal\" role=\"form\" aria-labelledby=\"contactHeading\">
            <form id=\"contactForm\" novalidate>
              <div class=\"field\">
                <input class=\"input\" id=\"name\" name=\"name\" type=\"text\" placeholder=\" \" autocomplete=\"name\" required aria-required=\"true\" />
                <label class=\"label\" for=\"name\">Name</label>
                <div class=\"error\" id=\"nameError\" aria-live=\"polite\"></div>
              </div>
              <div class=\"field\">
                <input class=\"input\" id=\"email\" name=\"email\" type=\"email\" placeholder=\" \" autocomplete=\"email\" required aria-required=\"true\" />
                <label class=\"label\" for=\"email\">Email</label>
                <div class=\"error\" id=\"emailError\" aria-live=\"polite\"></div>
              </div>
              <div class=\"field\">
                <textarea class=\"input\" id=\"message\" name=\"message\" rows=\"5\" placeholder=\" \" required aria-required=\"true\"></textarea>
                <label class=\"label\" for=\"message\">Message</label>
                <div class=\"error\" id=\"messageError\" aria-live=\"polite\"></div>
              </div>
              <button type=\"submit\" class=\"btn primary\" id=\"sendBtn\">Send Message</button>
              <div id=\"formStatus\" class=\"success\" role=\"status\" aria-live=\"polite\" style=\"margin-top:10px\"></div>
            </form>
          </div>
          <div class=\"reveal\">
            <h3>Let’s build something great</h3>
            <p>I'm available for internships and freelance projects. I'm particularly interested in developer tools, data‑driven apps, and delightful user interfaces.</p>
            <ul>
              <li>Email: <a href=\"mailto:{email}\">{email}</a></li>
              <li>Location: Anywhere, Remote‑friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <footer aria-label=\"Footer\">
      <div class=\"container\" style=\"display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;\">
        <div>© <span id=\"year\"></span> {name}. All rights reserved.</div>
        <div class=\"socials\" aria-label=\"Social links\">{socials_html}</div>
      </div>
    </footer>

    <button class=\"scroll-top\" id=\"scrollTop\" aria-label=\"Scroll to top\">↑</button>

    <script src=\"./main.js\"></script>
  </body>
</html>
"""


def build() -> str:
    skills_html = "".join(render_skill_card(c) for c in SKILLS)
    projects_html = "".join(render_project_card(p) for p in PROJECTS)
    timeline_html = "".join(render_timeline_entry(e) for e in TIMELINE)
    socials_html = render_social_links(SITE["socials"])

    html = TEMPLATE.format(
        name=SITE["name"],
        title_kicker=SITE["title_kicker"],
        subtitle=SITE["subtitle"],
        email=SITE["email"],
        socials_html=socials_html,
        skills_html=skills_html,
        projects_html=projects_html,
        timeline_html=timeline_html,
    )
    return html


def write_index(html: str, path: Path) -> None:
    path.write_text(html, encoding="utf-8")


def main() -> None:
    root = Path(__file__).parent
    out = root / "index.html"
    html = build()
    write_index(html, out)
    print(f"Wrote {out} at {datetime.now().isoformat(timespec='seconds')}")


if __name__ == "__main__":
    main()


