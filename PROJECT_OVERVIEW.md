# Portfolio Website - Complete Project Overview

## 📋 Project Summary

A modern, responsive portfolio website for **Leon Muyesu**, a Full-Stack Developer. Built with React 18, Vite, and vanilla CSS. Features dark/light theme toggle, smooth animations, scroll-triggered reveals, and a clean component-based architecture.

**Live Site**: https://leonmuyesuportfolio.netlify.app/  
**Tech Stack**: React 18.2.0, Vite 5.0.8, CSS3, HTML5

---

## 🏗️ Architecture Overview

### **Technology Stack**
- **Framework**: React 18.2.0 (Functional Components + Hooks)
- **Build Tool**: Vite 5.0.8
- **Styling**: Vanilla CSS3 with CSS Custom Properties (CSS Variables)
- **Deployment**: Netlify (SPA routing configured)
- **Form Handling**: Formspree.io integration

### **Project Structure**
```
portfolio/
├── public/
│   └── media/          # Images and PDFs
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── data.js         # Portfolio content data
│   ├── styles.css      # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # React entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── netlify.toml        # Netlify deployment config
```

---

## 🧩 Component Architecture

### **1. App.jsx** (Root Component)
- Orchestrates all sections
- Passes data from `data.js` to child components
- Manages profile image path

**Sections Order**:
1. Header (fixed navigation)
2. Hero (landing section)
3. About (profile & bio)
4. Skills (technical skills with progress bars)
5. Projects (portfolio projects grid)
6. Experience (timeline of work/education)
7. Contact (contact form + info)
8. Footer (social links + copyright)
9. ScrollTop (scroll-to-top button)

---

### **2. Header Component** (`src/components/Header.jsx`)

**Features**:
- Fixed navigation bar with backdrop blur
- Animated underline indicator that follows active section
- Theme toggle button (dark/light mode)
- Responsive navigation (hides brand text on mobile)
- Active section detection via Intersection Observer

**Animations**:
- **Nav Links**: Hover lift effect, animated underline expansion
- **Buttons**: Ripple effect, lift animation, glowing shadow
- **Underline**: Smooth position and width transitions

**Key Functionality**:
- Tracks scroll position to highlight current section
- Smooth underline animation on hover/focus
- Theme persistence via localStorage
- "View Work" CTA button

**Props**: `name`, `profileImage`

---

### **3. Hero Component** (`src/components/Hero.jsx`)

**Features**:
- Animated typing effect cycling through hero phrases
- Parallax blob background effect
- Device card mockup with code lines
- Mouse-responsive parallax animations
- Scroll-based parallax effects
- Staggered fade-in animations for all text elements
- Pulsing blob animation
- Floating device card animation
- Glowing code lines with staggered pulses
- Animated window control dots

**Animations**:
- **Staggered Reveal**: Kicker slides in from left, heading fades up, subtitle and CTA fade sequentially
- **Typing Effect**: Types → Pauses → Deletes → Types next phrase (infinite loop)
- **Blob Animation**: Pulsing scale and opacity (8s loop) + mouse parallax movement
- **Device Card**: Floating vertical motion (6s loop) + counter-parallax on mouse move
- **Code Lines**: Glowing pulse effect with staggered delays creating "active code" feel
- **Window Dots**: Pulsing opacity with staggered delays for wave effect
- **Scroll Parallax**: Elements move at different speeds on scroll

**Props**: `name`, `titleKicker`, `subtitle`, `heroPhrases`

**Custom Hook**: `useTypingEffect` for animated text

---

### **4. About Component** (`src/components/About.jsx`)

**Features**:
- Profile image with enhanced hover effects
- Two-column layout (image + text)
- Scroll-triggered reveal animations
- Responsive: stacks on mobile

**Animations**:
- **Reveal**: Avatar and text fade in with scale and slide up when scrolled into view
- **Avatar Hover**: 
  - Rotating gradient border (360° animation)
  - Image zoom effect (scale 1.05)
  - Lift with enhanced colored shadow
  - Smooth transitions

**Props**: `profileImage`, `name`

**Custom Hook**: `useIntersectionObserver` for scroll reveals

---

### **5. Skills Component** (`src/components/Skills.jsx`)

**Features**:
- Three skill categories: Front-end, Back-end, Tools
- Animated progress bars (fill on scroll into view)
- Interactive tag chips for technologies
- Grid layout (3 columns → 2 → 1 on mobile)

**Animations**:
- **Progress Bars**: Animate from 0% to target percentage with smooth easing
- **Cards**: Reveal with fade + scale + slide up animation
- **Skill Tags**:
  - Expanding ripple effect on hover
  - Color and border transitions
  - Lift with glowing shadow
  - Scale animation

**Props**: `skills` (array of skill objects)

**Skill Object Structure**:
```javascript
{
  title: "Front‑end",
  progress: 90,  // Percentage
  tags: ["HTML5", "CSS3", ...]
}
```

---

### **6. Projects Component** (`src/components/Projects.jsx`)

**Features**:
- Project cards with thumbnails
- Interactive 3D tilt effects
- Hover overlay with action buttons (Live Demo, GitHub)
- Tag chips for technologies used
- Grid layout (3 columns → 2 → 1 on mobile)

**Animations**:
- **3D Tilt Effect**: Mouse-responsive 3D rotation based on cursor position
- **Card Hover**:
  - Gradient overlay fade-in
  - Image zoom (scale 1.1)
  - Enhanced shadow with colored glow
  - Smooth lift with 3D perspective
- **Overlay**: Slides up and fades in on hover
- **Link Pills**: Shimmer effect, color transition, scale, and glowing shadow
- **Reveal**: Cards fade in with scale and slide up on scroll

**Props**: `projects` (array of project objects)

**Project Object Structure**:
```javascript
{
  thumb: "/media/portfolio.jpg",
  thumbAlt: "Description",
  title: "Project Name",
  desc: "Description text",
  tags: ["React", "Vite", ...],
  demo: "https://...",  // or null
  code: "https://github.com/..."
}
```

---

### **7. Experience Component** (`src/components/Experience.jsx`)

**Features**:
- Vertical timeline layout
- Animated timeline dots with gradient fill
- Scroll-triggered reveal for each entry
- Responsive spacing

**Animations**:
- **Timeline Dots**: Continuous pulsing animation with glow effect
- **Hover Effect**: Enhanced pulse animation on hover
- **Reveal**: Entries fade in with scale and slide up on scroll

**Visual Design**:
- Vertical line connecting entries
- Gradient dots (primary → accent color) with pulsing glow
- Clean typography hierarchy

**Props**: `timeline` (array of timeline entries)

**Timeline Entry Structure**:
```javascript
{
  heading: "Job Title — Company",
  meta: "Date Range · Location",
  text: "Description"
}
```

---

### **8. Contact Component** (`src/components/Contact.jsx`)

**Features**:
- Contact form with validation
- Formspree.io integration for form submissions
- Floating labels on inputs
- Error handling and success messages
- Two-column layout (form + info)

**Form Fields**:
- Name (required, text)
- Email (required, email validation)
- Message (required, min 10 characters)

**Validation**:
- Real-time error display
- Email regex validation
- Character count for message
- Disabled submit button during submission

**Props**: `email`

**Form Endpoint**: `https://formspree.io/f/xrbaynqr`

---

### **9. Footer Component** (`src/components/Footer.jsx`)

**Features**:
- Copyright notice with dynamic year
- Interactive social links (GitHub, LinkedIn, Resume)
- Responsive flex layout

**Animations**:
- **Social Links**: 
  - Expanding ripple effect on hover
  - Lift and scale animation
  - Background color transition
  - Glowing shadow effect

**Props**: `name`, `socials` (array of social objects)

---

### **10. ScrollTop Component** (`src/components/ScrollTop.jsx`)

**Features**:
- Fixed button in bottom-right corner
- Appears when hero section is out of view
- Smooth scroll to top on click
- Enhanced hover effects

**Animations**:
- **Fade In/Out**: Smooth opacity and transform transition
- **Hover**: Background color change, lift animation, glowing shadow
- **Active**: Pressed state feedback

**Logic**:
- Uses Intersection Observer to detect when hero is visible
- Button visibility toggles based on scroll position

---

## 🎣 Custom Hooks

### **1. useTheme** (`src/hooks/useTheme.js`)

**Purpose**: Manages dark/light theme state

**Returns**:
- `theme`: Current theme ('dark' | 'light')
- `toggleTheme`: Function to switch themes
- `isLight`: Boolean for light mode

**Features**:
- Persists theme to localStorage
- Updates `data-theme` attribute on `<html>`
- Defaults to 'dark' theme
- Smooth theme transitions with CSS variables

---

### **2. useTypingEffect** (`src/hooks/useTypingEffect.js`)

**Purpose**: Creates animated typing effect for text

**Parameters**:
- `phrases`: Array of strings to cycle through
- `speed`: Object with `type`, `delete`, `pause` timings (optional)

**Returns**: Current displayed text string

**Behavior**:
- Types characters one by one
- Pauses when complete
- Deletes character by character
- Moves to next phrase in cycle
- Loops infinitely

**Default Speed**: Type: 75ms, Delete: 40ms, Pause: 1100ms

---

### **3. useIntersectionObserver** (`src/hooks/useIntersectionObserver.js`)

**Purpose**: Detects when element enters viewport

**Parameters**:
- `options`: IntersectionObserver options (threshold, rootMargin, etc.)

**Returns**: `[elementRef, isIntersecting]`
- `elementRef`: Ref to attach to element
- `isIntersecting`: Boolean indicating visibility

**Features**:
- Automatically unobserves after first intersection
- Used for scroll-triggered animations
- Configurable threshold

---

## 🎨 Styling System

### **CSS Architecture**

**Design System**:
- CSS Custom Properties (CSS Variables) for theming
- Dark-first approach with light mode override
- Consistent spacing, colors, and typography
- Mobile-first responsive design

### **Color Palette**

**Dark Theme** (Default):
- Background: `#0b0f14` (dark blue-black)
- Elevated BG: `#0f151c` (slightly lighter)
- Text: `#e6edf3` (light gray)
- Muted: `#a8b3c1` (medium gray)
- Primary: `#7c9eff` (blue)
- Accent: `#59ffa8` (green)
- Danger: `#ff7b7b` (red)

**Light Theme**:
- Background: `#f7f9fc` (light gray-blue)
- Elevated BG: `#ffffff` (white)
- Text: `#0b0f14` (dark)
- Muted: `#546274` (dark gray)
- Primary: `#3056d3` (darker blue)
- Accent: `#0fa86f` (darker green)

### **Key CSS Features**

1. **CSS Variables**: All colors, spacing, transitions in `:root`
2. **Theme Toggle**: `html[data-theme="light"]` selector
3. **Color Mixing**: Uses `color-mix()` for gradients and overlays
4. **Backdrop Filter**: Blur effect on header
5. **Smooth Transitions**: Consistent timing functions
6. **Keyframe Animations**: 10+ custom animations for various effects
7. **3D Transforms**: Perspective and rotateX/rotateY for depth
8. **Gradient Animations**: Animated backgrounds and borders
9. **Responsive Breakpoints**: 1000px, 860px, 640px
10. **Accessibility**: `prefers-reduced-motion` support
11. **GPU Acceleration**: Transform and opacity for performance

### **Animation Patterns**

- **Reveal Animations**: Fade + scale + slide up on scroll
- **Hover Effects**: Lift, scale, glow, and shadow enhancement
- **Parallax**: Mouse and scroll-based movement
- **Progress Bars**: Width animation with easing
- **Typing Effect**: Character-by-character reveal
- **3D Tilt**: Mouse-responsive perspective transforms
- **Ripple Effects**: Expanding circle animations
- **Pulsing**: Scale and opacity loops
- **Floating**: Sine wave-based vertical movement
- **Glow Effects**: Box-shadow animations

---

## 📊 Data Structure (`src/data.js`)

### **SITE Object**
Contains site-wide information:
- `name`: Portfolio owner name
- `title_kicker`: Hero subtitle
- `hero_phrases`: Array for typing effect
- `subtitle`: Hero description
- `email`: Contact email
- `socials`: Array of social link objects

### **SKILLS Array**
Array of skill category objects:
- `title`: Category name
- `progress`: Percentage (0-100)
- `tags`: Array of technology names

### **PROJECTS Array**
Array of project objects:
- `thumb`: Image path
- `thumbAlt`: Alt text
- `title`: Project name
- `desc`: Description
- `tags`: Technology tags
- `demo`: Live demo URL (or null)
- `code`: GitHub repository URL

### **TIMELINE Array**
Array of timeline entry objects:
- `heading`: Job/Education title
- `meta`: Date and location
- `text`: Description

---

## 🚀 Build & Deployment

### **Development**
```bash
npm run dev    # Start Vite dev server
```

### **Build**
```bash
npm run build  # Production build to /dist
```

### **Preview**
```bash
npm run preview  # Preview production build locally
```

### **Deployment (Netlify)**
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Routing**: Configured in `netlify.toml` (all routes → index.html)

---

## 🎯 Key Features & Functionality

### **1. Theme System**
- Dark mode default
- Light mode toggle
- Persistent theme (localStorage)
- Smooth theme transitions

### **2. Animations & Interactive Effects**

#### **Background Animations**
- Animated gradient orbs that shift position (20s loop)
- Slow-moving radial gradients creating ambient movement
- Subtle, non-distracting background effects

#### **Hero Section**
- Staggered fade-in animations (kicker, heading, subtitle, CTA)
- Pulsing blob background (8s loop)
- Floating device card (6s loop)
- Glowing code lines with staggered pulses
- Animated window control dots
- Mouse-responsive parallax effects
- Typing effect with infinite phrase cycling

#### **Interactive Elements**
- **3D Tilt Effects**: Project cards tilt based on mouse position
- **Ripple Effects**: Expanding circles on buttons and links
- **Hover Animations**: Lift, scale, glow, and color transitions
- **Scroll Reveals**: Fade + scale + slide animations on scroll

#### **Micro-Interactions**
- Nav links with animated underlines
- Buttons with ripple and glow effects
- Skill tags with expanding backgrounds
- Social links with interactive hover states
- Profile avatar with rotating gradient border
- Timeline dots with pulsing glow
- Section titles with expanding underlines

#### **Performance Optimizations**
- GPU-accelerated properties (transform, opacity)
- Respects `prefers-reduced-motion`
- Smooth 60fps animations
- Optimized transition timing

### **3. Responsive Design**
- Mobile-first approach
- Breakpoints: 640px, 860px, 1000px
- Flexible grid layouts
- Adaptive typography (clamp)

### **4. Accessibility**
- ARIA labels and roles
- Semantic HTML
- Keyboard navigation support
- Reduced motion support
- Focus indicators

### **5. Performance**
- Lazy loading with Intersection Observer
- Passive event listeners
- Optimized animations
- Efficient re-renders

### **6. Form Handling**
- Client-side validation
- Formspree.io integration
- Error handling
- Success feedback
- Loading states

---

## 🔧 Configuration Files

### **vite.config.js**
- React plugin configuration
- Basic Vite setup

### **netlify.toml**
- Build configuration
- SPA routing rules (all routes → index.html)

### **package.json**
- Dependencies: React 18.2.0, React DOM
- Dev Dependencies: Vite, React plugins, TypeScript types
- Scripts: dev, build, preview

---

## 📱 Responsive Breakpoints

1. **Desktop**: > 1000px
   - Full 3-column grids
   - Side-by-side layouts
   - Full navigation

2. **Tablet**: 640px - 1000px
   - 2-column grids
   - Stacked hero section
   - Reduced navigation spacing

3. **Mobile**: < 640px
   - Single column layouts
   - Hidden brand text
   - Full-width cards

---

## 🎨 Design Principles

1. **Minimalism**: Clean, uncluttered interface
2. **Consistency**: Uniform spacing, colors, typography
3. **Hierarchy**: Clear visual hierarchy with typography
4. **Feedback**: Interactive elements provide visual feedback
5. **Performance**: Optimized animations and loading
6. **Accessibility**: WCAG-compliant design

---

## 🔍 Code Quality Features

- **Functional Components**: Modern React patterns
- **Custom Hooks**: Reusable logic extraction
- **Prop Types**: Clear component interfaces
- **Semantic HTML**: Proper element usage
- **CSS Organization**: Logical grouping and comments
- **Performance**: Optimized re-renders and animations

---

## 📝 Notes

- **No State Management**: Uses React hooks only (no Redux/Context)
- **No UI Library**: Pure CSS styling
- **No Routing**: Single-page application
- **Form Backend**: Formspree.io (third-party service)
- **Image Optimization**: Manual (no automatic optimization)
- **Font Loading**: Google Fonts (Inter, Source Sans 3)

---

## 🚦 Future Enhancement Opportunities

1. **Advanced 3D Elements**: Three.js integration for particle systems and 3D models
2. **Animation Library**: Framer Motion or GSAP for more complex animations
3. **Image Optimization**: Next.js Image or similar for automatic optimization
4. **Blog Section**: Content management integration
5. **Analytics**: Google Analytics or similar
6. **SEO**: Meta tags, Open Graph, structured data
7. **PWA**: Service worker, offline support
8. **Internationalization**: Multi-language support
9. **Cursor Effects**: Custom cursor animations
10. **Page Transitions**: Smooth transitions between sections

---

This portfolio demonstrates modern React development practices, clean code architecture, and attention to user experience and accessibility.
