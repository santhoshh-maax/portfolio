(function () {
  'use strict';

  // ----- Navbar scroll effect -----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ----- Mobile menu toggle -----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Footer year -----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ----- Optional: subtle fade-in on scroll -----
  const sections = document.querySelectorAll('.section');
  const observerOptions = { rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
  });

  // ----- Certificate galleries -----
  const galleryTriggers = document.querySelectorAll('.academic-card-clickable[data-gallery]');
  const galleryModals = {
    achievements: document.getElementById('gallery-modal-achievements'),
    courses: document.getElementById('gallery-modal-courses'),
    roadmap: document.getElementById('gallery-modal-roadmap')
  };

  function openGallery(modal) {
    if (!modal) return;
    modal.removeAttribute('hidden');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeGallery(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  galleryTriggers.forEach(function (trigger) {
    var galleryId = trigger.getAttribute('data-gallery');
    var modal = galleryModals[galleryId];
    if (!modal) return;

    trigger.addEventListener('click', function () {
      openGallery(modal);
    });
  });

  document.querySelectorAll('.gallery-modal').forEach(function (modal) {
    var closeBtn = modal.querySelector('.gallery-close');
    var backdrop = modal.querySelector('.gallery-modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', function () { closeGallery(modal); });
    if (backdrop) backdrop.addEventListener('click', function () { closeGallery(modal); });
  });

  // ----- Lightbox -----
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');
  var lightboxPrev = lightbox && lightbox.querySelector('.lightbox-prev');
  var lightboxNext = lightbox && lightbox.querySelector('.lightbox-next');
  var currentGalleryImages = [];
  var currentLightboxIndex = 0;

  var lightboxCaption = document.getElementById('lightbox-caption');

  function openLightbox(src, galleryImages, index) {
    if (!lightbox || !lightboxImg) return;
    currentGalleryImages = galleryImages || [];
    currentLightboxIndex = index || 0;
    lightboxImg.src = src;
    lightboxImg.alt = galleryImages && galleryImages[currentLightboxIndex] ? galleryImages[currentLightboxIndex].alt : '';
    if (lightboxCaption) lightboxCaption.textContent = galleryImages && galleryImages[currentLightboxIndex] && galleryImages[currentLightboxIndex].caption ? galleryImages[currentLightboxIndex].caption : '';
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxPrev.style.display = currentGalleryImages.length > 1 ? '' : 'none';
    lightboxNext.style.display = currentGalleryImages.length > 1 ? '' : 'none';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('hidden', '');
    var anyGalleryOpen = document.querySelector('.gallery-modal.is-open');
    document.body.style.overflow = anyGalleryOpen ? 'hidden' : '';
  }

  function showLightboxImage(index) {
    if (!currentGalleryImages.length || !lightboxImg) return;
    currentLightboxIndex = (index + currentGalleryImages.length) % currentGalleryImages.length;
    var item = currentGalleryImages[currentLightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = item.caption || '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showLightboxImage(currentLightboxIndex - 1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { showLightboxImage(currentLightboxIndex + 1); });

  document.querySelectorAll('.gallery-item').forEach(function (item, index) {
    var img = item.querySelector('img');
    var captionEl = item.querySelector('.gallery-caption');
    if (!img) return;
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      var gallery = item.closest('.gallery-grid');
      var galleryItems = gallery.querySelectorAll('.gallery-item');
      var images = Array.from(galleryItems).map(function (g) {
        var im = g.querySelector('img');
        var cap = g.querySelector('.gallery-caption');
        return {
          src: im ? im.src : '',
          alt: im ? im.alt || '' : '',
          caption: cap ? cap.textContent.trim() : ''
        };
      });
      openLightbox(img.src, images, index);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openModal = document.querySelector('.gallery-modal.is-open');
    if (lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    } else if (openModal) {
      closeGallery(openModal);
    }
  });

  // ----- Contact Form Handler -----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;

      window.location.href = `mailto:santhoshpanneer03@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // ----- Name Animation -----
  function triggerNameAnimation() {
    const nameElement = document.querySelector('.animate-name');
    if (!nameElement) return;

    // Use a data-attribute to store original text if not already stored
    // This allows us to reset cleanly
    if (!nameElement.dataset.originalText) {
      // First run: Parse the DOM to get text and structure
      // Simple approach: stick to rebuild logic but we need to ensure we don't parse the ALREADY split spans.
      // If it has .letter, it's already animated. We should rebuild from what?
      // Safest: Store the structure in memory or just re-run the split on the textContent if structure is simple.
      // Since we have an inner span .accent, simple textContent won't work perfectly.
      // Let's rely on the fact that we can just rebuild it if we persist the original HTML?
      // nameElement.dataset.originalHtml = nameElement.innerHTML; 
      // BUT if we run this on page load, the HTML is clean.
    }

    // Actually, simpler: define the content we want.
    // "Santhosh" + <span class="accent">Panneer Selvam</span> ? 
    // Wait, the original HTML was: San<span class="accent">thosh</span> Panneer Selvam

    // Let's hardcode the structure rebuild to make it robust for replay
    nameElement.innerHTML = '';

    const part1 = "San";
    const part2 = "thosh"; // accent
    const part3 = " Panneer Selvam";

    let delayCounter = 0;
    const delayIncrement = 0.1; // Slower speed requested

    // Part 1
    const span1 = document.createElement('span');
    part1.split('').forEach(char => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.className = 'letter';
      charSpan.style.setProperty('--delay', `${delayCounter}s`);
      span1.appendChild(charSpan);
      delayCounter += delayIncrement;
    });
    nameElement.appendChild(span1);

    // Part 2 (Accent)
    const span2 = document.createElement('span');
    span2.className = 'accent';
    part2.split('').forEach(char => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.className = 'letter';
      charSpan.style.setProperty('--delay', `${delayCounter}s`);
      span2.appendChild(charSpan);
      delayCounter += delayIncrement;
    });
    nameElement.appendChild(span2);

    // Part 3
    const span3 = document.createElement('span');
    part3.split('').forEach(char => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.className = 'letter';
      charSpan.style.setProperty('--delay', `${delayCounter}s`);
      if (char === ' ') charSpan.innerHTML = '&nbsp;';
      span3.appendChild(charSpan);
      delayCounter += delayIncrement;
    });
    nameElement.appendChild(span3);
  }

  // Run on load
  triggerNameAnimation();

  // Run on Home click
  const homeLink = document.querySelector('a[href="#hero"]');
  if (homeLink) {
    homeLink.addEventListener('click', () => {
      // Small timeout to allow potential smooth scroll to start? 
      // Or just trigger immediately.
      triggerNameAnimation();
    });
  }
})();
