# Portfolio – Santhosh Panneer Selvam

A robotics & automation themed portfolio site built with HTML, CSS, and JavaScript.

## Quick setup

1. **Email**  
   In `index.html`, search for `santhosh@example.com` and replace both occurrences with your real email address.

2. **Resume**  
   Add your resume PDF in this folder and name it `resume.pdf`. The “Download Resume” buttons will then work. If you use another name, update the `href` in both places in `index.html`:
   - Hero: `href="resume.pdf"`
   - Contact: `href="resume.pdf"`

3. **Projects**  
   For each project in the Projects section:
   - Replace the `src` of the `<img>` with your project image (or keep the placeholder).
   - Set the `<a class="project-video-link">` `href` to your video URL (YouTube, Vimeo, etc.).
   - Edit the `<h3>` and `<p>` with your project title and description.
   - Add or remove project cards by copying the whole `<article class="project-card">...</article>` block.

4. **Academics**  
   Edit the text inside the academic cards (degree, achievements, coursework) to match your profile.

5. **Certificate galleries**  
   Clicking **Achievements & Certifications** or **Course Certifications** opens a photo gallery. Add your images as follows:
   - **Achievements:** Create folder `certificates/achievements/` and add images (e.g. `1.jpg`, `2.jpg`, `3.jpg`). In `index.html`, inside `#gallery-achievements-grid`, add or edit `<div class="gallery-item">` blocks with `<img src="certificates/achievements/yourfile.jpg" alt="Description">`.
   - **Course certs:** Create folder `certificates/courses/` and add images. In `index.html`, inside `#gallery-courses-grid`, add or edit `<div class="gallery-item">` blocks the same way.  
   You can add more items by copying a `<div class="gallery-item">…</div>` block. Clicking an image opens a full-size lightbox with prev/next.

## Run locally

Open `index.html` in a browser, or use a simple local server, e.g.:

```bash
# Python 3
python -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` – All content and sections
- `styles.css` – Robotics/automation theme (dark, accent color, grid)
- `script.js` – Navbar scroll, mobile menu, footer year, section fade-in

## Sections

1. **Hero** – Name, tagline, “Get in Touch”, “Download Resume”
2. **About** – Short intro and focus areas
3. **National Service** – SAF, CFC, Combat Medic
4. **Projects** – Cards with image, video link, description
5. **Academics** – Education and achievements
6. **Contact** – Email link and resume download

Customize copy and links in `index.html` to match your details.
