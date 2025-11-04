# Portfolio - React Version

This is the React version of the portfolio website, converted from vanilla HTML/CSS/JavaScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ScrollTop.jsx
├── hooks/              # Custom React hooks
│   ├── useTheme.js
│   ├── useTypingEffect.js
│   └── useIntersectionObserver.js
├── data.js            # Portfolio data
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── styles.css         # Styles (same as original)
```

## Features

- ✅ React components with hooks
- ✅ Theme toggle (dark/light mode)
- ✅ Typing effect animation
- ✅ Scroll animations
- ✅ Parallax effects
- ✅ Form validation and submission
- ✅ Responsive design
- ✅ Accessibility features

## Tech Stack

- React 18
- Vite (build tool)
- Vanilla CSS (no frameworks)

## Notes

- The original `build.py` script is no longer needed as React handles the rendering
- All data is in `src/data.js` - edit that file to update content
- **Media files must be in the `public/media/` folder** (not `media/` at root) - they will be copied to `dist/` during build
- The CSS file is identical to the original, just moved to `src/`

## Deployment

### Netlify
The project includes a `netlify.toml` configuration file. When deploying to Netlify:
1. Connect your GitHub repository
2. Netlify will automatically detect the build settings from `netlify.toml`
3. Build command: `npm run build`
4. Publish directory: `dist`

### Other Platforms
For other hosting platforms (Vercel, GitHub Pages, etc.):
- Build command: `npm run build`
- Output directory: `dist`
- Make sure the platform runs the build command before deploying
- Static assets (images, PDFs) are in `public/` and will be served from the root

