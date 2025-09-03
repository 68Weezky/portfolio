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
    <style>
{styles}
    </style>
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

    <script>
{scripts}
    </script>
  </body>
</html>
"""


# Extract styles and scripts from the current file once, or embed directly (mirrors existing index.html)
STYLES = """
      /*
       * Modern, responsive, animated portfolio
       * Tech: HTML5 + CSS3 + Vanilla JS (ES6+)
       * Notes: Dark-first theme with toggle, prefers-reduced-motion respected
       */

      :root {
        --bg: #0b0f14;
        --bg-elev: #0f151c;
        --text: #e6edf3;
        --muted: #a8b3c1;
        --primary: #7c9eff;
        --accent: #59ffa8;
        --danger: #ff7b7b;
        --card: #111821;
        --border: #1b2531;
        --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        --radius: 14px;
        --radius-sm: 10px;
        --content-max: 1100px;
        --nav-h: 72px;
        --trans-fast: 160ms ease;
        --trans-med: 260ms cubic-bezier(.22,.61,.36,1);
      }

      html[data-theme="light"] {
        --bg: #f7f9fc;
        --bg-elev: #ffffff;
        --text: #0b0f14;
        --muted: #546274;
        --primary: #3056d3;
        --accent: #0fa86f;
        --danger: #d33b3b;
        --card: #ffffff;
        --border: #e7edf3;
        --shadow: 0 10px 30px rgba(16, 24, 40, 0.1);
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        line-height: 1.6;
      }

      a { color: inherit; text-decoration: none; }
      img { max-width: 100%; display: block; }

      .container { width: 100%; max-width: var(--content-max); margin: 0 auto; padding: 0 20px; }

      /* Header */
      header.site-header {
        position: fixed; inset: 0 0 auto 0; height: var(--nav-h);
        background: color-mix(in srgb, var(--bg-elev) 80%, transparent);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border);
        z-index: 1000;
      }
      .nav-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
      .brand {
        display: flex; align-items: center; gap: 12px; font-weight: 800; letter-spacing: 0.2px;
      }
      .brand-logo { width: 36px; height: 36px; border-radius: 50%; background: radial-gradient(120% 120% at 10% 10%, var(--primary), var(--accent)); box-shadow: var(--shadow); }
      nav.primary-nav { position: relative; }
      .nav-list { list-style: none; display: flex; gap: 20px; padding: 0; margin: 0; }
      .nav-link { position: relative; display: inline-block; padding: 8px 6px; color: var(--muted); transition: color var(--trans-fast); }
      .nav-link:hover { color: var(--text); }
      .nav-underline { position: absolute; bottom: 0; height: 2px; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 2px; transition: transform var(--trans-med), width var(--trans-med), opacity var(--trans-fast); opacity: 0.9; }
      .controls { display: flex; align-items: center; gap: 10px; }
      .btn {
        appearance: none; border: 1px solid var(--border); background: var(--bg-elev); color: var(--text);
        padding: 8px 12px; border-radius: 10px; cursor: pointer; transition: transform var(--trans-fast), background var(--trans-fast);
      }
      .btn:hover { transform: translateY(-1px); }

      /* Hero */
      section#hero { position: relative; padding-top: calc(var(--nav-h) + 80px); padding-bottom: 120px; overflow: clip; }
      .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; }
      .kicker { color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; font-size: 12px; }
      h1.display { font-size: clamp(36px, 5vw, 64px); line-height: 1.1; margin: 8px 0 16px; font-weight: 800; }
      .typed { color: var(--primary); border-right: 2px solid var(--primary); white-space: nowrap; overflow: hidden; }
      .subtitle { color: var(--muted); font-size: clamp(16px, 2.3vw, 18px); }
      .hero-cta { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
      .btn.primary { background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent))); border: none; color: white; }
      .btn.ghost { background: transparent; }
      .hero-art { position: relative; height: 380px; }
      .blob {
        position: absolute; inset: -120px -80px auto auto; width: 520px; height: 520px; border-radius: 50%; filter: blur(40px);
        background: radial-gradient(40% 40% at 60% 40%, color-mix(in srgb, var(--primary) 80%, transparent), transparent 60%),
                    radial-gradient(60% 60% at 40% 60%, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%);
        opacity: 0.6; transform: translateZ(0);
      }
      .device-card {
        position: absolute; right: 30px; bottom: 10px; width: min(420px, 90%);
        background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow);
        padding: 16px; transform: translateZ(0);
      }
      .device-header { display: flex; gap: 8px; margin-bottom: 12px; }
      .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); }
      .screen { height: 220px; border-radius: 10px; overflow: hidden; background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 10%, transparent), transparent), var(--bg-elev); border: 1px solid var(--border); position: relative; }
      .code-line { position: absolute; left: 14px; right: 14px; height: 10px; border-radius: 6px; background: color-mix(in srgb, var(--text) 15%, transparent); }

      /* Sections */
      section { padding: 100px 0; }
      section.alt { background: var(--bg-elev); }
      .section-title { font-size: 28px; margin: 0 0 8px; }
      .section-sub { color: var(--muted); margin-bottom: 28px; }

      /* About */
      .about { display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; align-items: center; }
      .avatar-wrap { width: 220px; height: 220px; border-radius: 50%; overflow: hidden; box-shadow: var(--shadow); border: 1px solid var(--border); transition: transform var(--trans-med), box-shadow var(--trans-med); }
      .avatar-wrap:hover { transform: translateY(-6px); box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
      .about p { color: var(--muted); }

      /* Skills */
      .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .skill-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); }
      .skill-title { font-weight: 700; margin-bottom: 12px; }
      .bar { height: 10px; border-radius: 999px; background: color-mix(in srgb, var(--text) 10%, transparent); overflow: hidden; }
      .bar > span { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--primary), var(--accent)); border-radius: 999px; transition: width 1.2s cubic-bezier(.22,.61,.36,1); }
      .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
      .tag { font-size: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--border); color: var(--muted); background: var(--bg-elev); }

      /* Projects */
      .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .project-card { position: relative; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); transition: transform var(--trans-med), box-shadow var(--trans-med); }
      .project-card:hover { transform: translateY(-6px); box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
      .project-thumb { aspect-ratio: 16/10; background: radial-gradient(60% 60% at 30% 30%, color-mix(in srgb, var(--primary) 15%, transparent), transparent), linear-gradient(180deg, color-mix(in srgb, var(--text) 8%, transparent), transparent); display: grid; place-items: center; color: var(--muted); font-weight: 700; }
      .project-body { padding: 16px; }
      .project-title { margin: 0 0 6px; font-weight: 700; }
      .project-desc { margin: 0 0 12px; color: var(--muted); }
      .project-tags { display: flex; gap: 8px; flex-wrap: wrap; }
      .project-overlay { position: absolute; inset: 0; background: color-mix(in srgb, var(--bg) 65%, transparent); display: flex; align-items: flex-end; justify-content: center; padding: 16px; gap: 10px; transform: translateY(20%); opacity: 0; transition: all var(--trans-med); }
      .project-card:focus-within .project-overlay, .project-card:hover .project-overlay { transform: translateY(0); opacity: 1; }
      .link-pill { background: var(--bg-elev); border: 1px solid var(--border); color: var(--text); padding: 10px 14px; border-radius: 999px; font-weight: 600; }

      /* Timeline */
      .timeline { position: relative; margin-left: 8px; }
      .timeline::before { content: ""; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: color-mix(in srgb, var(--text) 12%, transparent); }
      .entry { position: relative; padding-left: 30px; margin: 18px 0; }
      .entry::before { content: ""; position: absolute; left: 0; top: 6px; width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(180deg, var(--primary), var(--accent)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--text) 8%, transparent); }
      .entry h4 { margin: 0 0 4px; }
      .entry .meta { color: var(--muted); font-size: 14px; margin-bottom: 6px; }

      /* Contact */
      .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      .form { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow); }
      .field { position: relative; margin: 14px 0 20px; }
      .input { width: 100%; padding: 16px 14px 14px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg-elev); color: var(--text); outline: none; transition: border var(--trans-fast), box-shadow var(--trans-fast); }
      .input:focus { border-color: color-mix(in srgb, var(--primary) 60%, var(--border)); box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 18%, transparent); }
      .label { position: absolute; top: 12px; left: 12px; color: var(--muted); pointer-events: none; transition: transform var(--trans-fast), color var(--trans-fast); background: var(--bg-elev); padding: 0 6px; }
      .input:focus + .label, .input:not(:placeholder-shown) + .label { transform: translateY(-18px) scale(0.92); color: var(--primary); }
      .error { color: var(--danger); font-size: 13px; min-height: 18px; }
      .success { color: var(--accent); font-weight: 600; }

      /* Footer */
      footer { padding: 40px 0; border-top: 1px solid var(--border); color: var(--muted); }
      .socials { display: flex; gap: 14px; }
      .socials a { padding: 8px 10px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-elev); transition: transform var(--trans-fast), background var(--trans-fast); }
      .socials a:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--primary) 10%, var(--bg-elev)); }

      /* Scroll to top */
      .scroll-top { position: fixed; right: 20px; bottom: 20px; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--border); background: var(--bg-elev); color: var(--text); box-shadow: var(--shadow); opacity: 0; pointer-events: none; transform: translateY(10px); transition: opacity var(--trans-med), transform var(--trans-med); z-index: 999; }
      .scroll-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }

      /* Reveal Animations */
      .reveal { opacity: 0; transform: translateY(16px); }
      .reveal.in-view { opacity: 1; transform: translateY(0); transition: opacity 600ms var(--trans-med), transform 600ms var(--trans-med); }

      /* Responsive */
      @media (max-width: 1000px) {
        .hero-grid { grid-template-columns: 1fr; }
        .hero-art { height: 320px; }
        .about { grid-template-columns: 1fr; justify-items: center; text-align: center; }
      }
      @media (max-width: 860px) {
        .skills-grid, .projects-grid, .contact-grid { grid-template-columns: 1fr 1fr; }
        .nav-list { gap: 14px; }
      }
      @media (max-width: 640px) {
        .skills-grid, .projects-grid, .contact-grid { grid-template-columns: 1fr; }
        .device-card { right: 10px; }
        .brand span { display: none; }
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
      }
"""

SCRIPTS = """
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
        const phrases = %s;
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
          setTimeout(() => {
            btn.disabled = false; btn.textContent = old;
            form.reset();
            status.textContent = 'Thanks! Your message has been sent.';
          }, 900);
        });
      })();

      document.getElementById('year').textContent = new Date().getFullYear();
"""


def build() -> str:
    skills_html = "".join(render_skill_card(c) for c in SKILLS)
    projects_html = "".join(render_project_card(p) for p in PROJECTS)
    timeline_html = "".join(render_timeline_entry(e) for e in TIMELINE)
    socials_html = render_social_links(SITE["socials"])

    # Inject hero phrases array into JS safely
    phrases_js_array = "[" + ", ".join(repr(p) for p in SITE["hero_phrases"]) + "]"
    scripts = SCRIPTS % (phrases_js_array,)

    html = TEMPLATE.format(
        name=SITE["name"],
        title_kicker=SITE["title_kicker"],
        subtitle=SITE["subtitle"],
        email=SITE["email"],
        socials_html=socials_html,
        skills_html=skills_html,
        projects_html=projects_html,
        timeline_html=timeline_html,
        styles=STYLES,
        scripts=scripts,
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


