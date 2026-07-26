# Santhosh Panneer Selvam | Portfolio

Personal portfolio website for **Santhosh Panneer Selvam** — B.E. Computer Science & Engineering student and Robotics & Automation enthusiast. Built as a single-page site showcasing projects, academic achievements, certifications, and contact details.

🔗 **Live site:** https://santhoshh-maax.github.io/portfolio/

## Features

- Animated hero section with a letter-by-letter name reveal
- Interactive 3D particle background (Three.js)
- Responsive navigation with mobile menu toggle
- About, National Service, Projects, and Academics sections
- Certificate & achievement galleries with a lightbox viewer (previous/next navigation, captions)
- Timeline-based academic roadmap with tiered badges (gold/silver) for competitions and awards
- Contact form that opens a pre-filled email via `mailto:`
- Scroll-based navbar styling and fade-in animations for sections
- Fully responsive layout for mobile, tablet, and desktop

## Tech Stack

- **HTML5** — semantic page structure (`index.html`)
- **CSS3** — custom properties, Flexbox/Grid layouts, responsive media queries (`styles.css`)
- **JavaScript (Vanilla)** — no frameworks; DOM interactions, IntersectionObserver, form handling (`script.js`)
- **Three.js** — animated particle background (`background.js`)
- **Font Awesome** & **Devicon** — icon sets
- **Google Fonts** — Orbitron & Rajdhani

## Project Structure

```
.
├── index.html          # Main page markup (Hero, About, Projects, Academics, Contact)
├── styles.css           # All styling, layout, and responsive rules
├── script.js             # Navbar, mobile menu, galleries, lightbox, contact form, name animation
├── background.js      # Three.js particle background
├── favicon.png
├── preview.png          # Open Graph preview image
└── resume.pdf            # Downloadable resume
```

## Sections

| Section | Description |
|---|---|
| Hero | Name intro with animated text and CTA buttons |
| About | Background, interests, and skills |
| National Service | NSS / community service highlights |
| Projects | Featured robotics, IoT, and software projects |
| Academics | Education timeline, achievements, and certificate galleries |
| Contact | Contact form and social links |

## Getting Started

This is a static site with no build step required.

1. Clone the repository
   ```bash
   git clone https://github.com/santhoshh-maax/portfolio.git
   cd portfolio
   ```
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   ```
   (or use the VS Code "Live Server" extension)

## Deployment

The site is deployed via **GitHub Pages**. Any changes pushed to the default branch are reflected automatically at the live URL above.

## Contact

- **Email:** santhoshpanneer03@gmail.com
- **Portfolio:** https://santhoshh-maax.github.io/portfolio/

## License

This project is personal portfolio work. Feel free to reference the structure, but please don't reuse the content or branding as your own.
