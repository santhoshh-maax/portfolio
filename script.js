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
      var galleryItems = gallery ? gallery.querySelectorAll('.gallery-item') : [item];
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

  document.querySelectorAll('.ns-img, .expandable-img, .rec-letter-img, .expandable-img-trigger, [data-lightbox-src]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      var src = el.getAttribute('data-lightbox-src') || (el.tagName === 'IMG' ? el.src : (el.querySelector('img') ? el.querySelector('img').src : ''));
      var caption = el.getAttribute('data-lightbox-caption') || el.getAttribute('alt') || (el.querySelector('img') ? el.querySelector('img').alt : '');
      if (src) {
        openLightbox(src, [{ src: src, alt: caption, caption: caption }], 0);
      }
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

    nameElement.innerHTML = '';

    const words = [
      {
        parts: [
          { text: "San", className: "" },
          { text: "thosh", className: "accent" }
        ]
      },
      {
        parts: [
          { text: "Panneer", className: "" }
        ]
      },
      {
        parts: [
          { text: "Selvam", className: "" }
        ]
      }
    ];

    let delayCounter = 0;
    const delayIncrement = 0.08;

    words.forEach((wordObj, index) => {
      if (index > 0) {
        const spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        spaceSpan.className = 'word-space';
        nameElement.appendChild(spaceSpan);
      }

      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';

      wordObj.parts.forEach(part => {
        const partSpan = document.createElement('span');
        if (part.className) partSpan.className = part.className;

        part.text.split('').forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'letter';
          charSpan.style.setProperty('--delay', `${delayCounter}s`);
          partSpan.appendChild(charSpan);
          delayCounter += delayIncrement;
        });

        wordSpan.appendChild(partSpan);
      });

      nameElement.appendChild(wordSpan);
    });
  }

  // Run on load
  triggerNameAnimation();

  // Run on Home click
  const homeLink = document.querySelector('a[href="#hero"]');
  if (homeLink) {
    homeLink.addEventListener('click', () => {
      triggerNameAnimation();
    });
  }

  // ============================================
  // SP-AI INTERACTIVE CHATBOT SYSTEM
  // ============================================

  const heroMessages = document.getElementById('hero-chat-messages');
  const drawerMessages = document.getElementById('drawer-chat-messages');
  const heroForm = document.getElementById('hero-chat-form');
  const drawerForm = document.getElementById('drawer-chat-form');
  const heroInput = document.getElementById('hero-chat-input');
  const drawerInput = document.getElementById('drawer-chat-input');
  const heroReset = document.getElementById('hero-chat-reset');
  const chatDrawer = document.getElementById('chat-drawer');
  const floatingToggle = document.getElementById('floating-chat-toggle');
  const drawerClose = document.getElementById('drawer-chat-close');

  let chatHistory = [];

  // Explicit Portfolio Q&A Knowledge Base
  const portfolioQA = [
    {
      patterns: [/college/i, /university/i, /where.*studying/i, /studying at/i, /which college/i, /institution/i, /mount zion/i],
      answer: "🎓 Santhosh is pursuing his B.E. in Computer Science & Engineering at <strong>Mount Zion College of Engineering and Technology</strong> (2023–2027)."
    },
    {
      patterns: [/degree/i, /course/i, /branch/i, /major/i, /what is he studying/i, /education/i, /academics/i],
      answer: "📚 Santhosh is studying <strong>B.E. Computer Science and Engineering (CSE)</strong>, focusing on AI, Robotics, Automation, and Embedded Systems."
    },
    {
      patterns: [/school/i, /schooling/i, /higher secondary/i, /hsc/i, /12th/i, /10th/i, /alagappa/i, /karakudi|karaikudi/i],
      answer: "🏫 Santhosh completed his higher secondary education at <strong>Alagappa Matriculation Higher Secondary School, Karaikudi</strong> in 2020, focusing on Computer Science and Mathematics."
    },
    {
      patterns: [/current.*role/i, /current.*job/i, /where.*work/i, /glacien/i, /fde\b/i, /forward deployed/i],
      answer: "💼 Santhosh currently works as a <strong>Forward Deployed Engineer (FDE) at Glacien.ai</strong> (Aug 2026 – Present), engaging in AI research, software integration, and cutting-edge AI technology development."
    },
    {
      patterns: [/zedindex/i, /mobile app.*intern/i, /previous.*intern/i, /previous.*job/i],
      answer: "📱 Santhosh worked as a <strong>Mobile App Developer Intern at Zedindex</strong> (Jun 2026 – July 2026, 1 Month), building cross-platform mobile applications using Flutter and Dart."
    },
    {
      patterns: [
        /proficien/i,
        /technical/i,
        /tools?\s*experience/i,
        /skills?\s*experience/i,
        /skills?\s*breakdown/i,
        /how\s*much.*experience/i,
        /years?\s*of\s*experience/i,
        /i\s*work\s*with/i,
        /tech\s*stack/i,
        /programming\s*languages?/i,
        /tools?/i,
        /technolog/i,
        /frameworks?/i,
        /skills?/i
      ],
      answer: "🛠️ <strong>Experience & Technical Proficiency Breakdown:</strong><br>• <strong>Robotics & Hardware:</strong> Arduino (2+ Yrs, 85%), Embedded C (2+ Yrs, 80%), Python (2+ Yrs, 85%), Ubuntu Linux (2+ Yrs, 80%)<br>• <strong>App & Web:</strong> Flutter & Dart (1.5+ Yrs, 85%), HTML5 & CSS3 (2+ Yrs, 90%), JavaScript (2+ Yrs, 80%), Node.js & Laravel (1+ Yr, 75%)<br>• <strong>Cloud & DevOps:</strong> AWS (1+ Yr, 85% — Certified Data Engineer), Git & GitHub (2+ Yrs, 90%), Docker (1+ Yr, 75%), Postman (1.5+ Yrs, 85%)<br>• <strong>Databases & IDEs:</strong> MongoDB & MSSQL (1.5+ Yrs, 80%), VS Code (2+ Yrs, 95%), Android Studio (1.5+ Yrs, 80%)",
      actions: [
        { text: '🛠️ Scroll to Tools Section', type: 'scroll', target: '#about' },
        { text: '🚀 Show Top Projects', type: 'prompt', value: 'Show featured projects' }
      ]
    },
    {
      patterns: [
        /work\s*experience/i,
        /job\s*experience/i,
        /internship/i,
        /career/i,
        /timeline/i,
        /work\s*history/i,
        /past\s*jobs?/i,
        /previous\s*jobs?/i,
        /where.*worked/i,
        /employment/i,
        /^(?=.*experience)(?!.*(technical|proficiency|tool|stack|hardware|language)).*$/i
      ],
      answer: "💼 <strong>Professional Work Experience & Timeline:</strong><br>• <strong>Forward Deployed Engineer (FDE)</strong> @ <em>Glacien.ai</em> (Aug 2026 – Present)<br>  Focus: AI research, software integration & cutting-edge AI tech.<br>• <strong>Mobile App Developer Intern</strong> @ <em>Zedindex</em> (Jun 2026 – July 2026, 1 Month)<br>  Focus: Cross-platform mobile applications in Flutter & Dart.<br>• <strong>Combat Medic (CFC)</strong> @ <em>Singapore Armed Forces (SAF)</em> (Aug 2021 – Aug 2023, 1.5 Years)<br>  Focus: Field medical support, emergency care, NDP ambulance medic, with official Doctor Recommendation Letter.",
      actions: [
        { text: '💼 Scroll to Experience', type: 'scroll', target: '#experience' },
        { text: '📄 Recommendation Letter', type: 'prompt', value: 'Tell me about the recommendation letter' }
      ]
    },
    {
      patterns: [/recommend/i, /commend/i, /reference/i, /doctor.*letter/i, /medical.*letter/i, /lim zheyuan/i, /dr\b.*daniel/i, /daniel/i, /zheyuan/i, /medical officer/i, /\bletter\b/i],
      answer: "📄 <strong>Medical Center Doctor Recommendation Letter:</strong><br>During his National Service (2021–2023) at Kranji Regional Health Hub (KRHH), Santhosh was awarded an official letter of recommendation by <strong>CPT(DR) Lim Zheyuan Daniel</strong> (Medical Officer, Singapore Armed Forces).<br><br>The doctor commended Santhosh for his <em>high standards as a medic</em>, <em>swift emergency responses</em>, <em>commendations from senior military commanders</em>, and <em>exceptional empathy towards patients</em> during clinical procedures and ambulance duty.",
      actions: [
        { text: '📄 Scroll to Recommendation Letter', type: 'scroll', target: '#ns' },
        { text: '🎖️ Army Service Details', type: 'prompt', value: 'Tell me about National Service' }
      ]
    },
    {
      patterns: [/locat/i, /where.*(live|stay|staying|based|from|located|santhosh|he|you)/i, /where\s+(is|are)\s+(santhosh|he|you)/i, /address/i, /560321/i, /singapore/i, /maps?/i, /google\s*maps?/i, /city/i, /country/i, /place/i],
      answer: "📍 <strong>Current Location:</strong><br>Santhosh is based in <strong>Singapore (Postal Code: 560321)</strong>. You can view his exact location on Google Maps or reach out via the contact form!",
      actions: [
        { text: '🗺️ Open Google Maps', type: 'link', url: 'https://maps.app.goo.gl/TPyzFZSHfYwwRetH7' },
        { text: '📍 Scroll to Location', type: 'scroll', target: '#contact' }
      ]
    },
    {
      patterns: [/army/i, /saf\b/i, /national service/i, /rank/i, /medic/i, /combat medic/i, /kranji/i, /tekong/i, /nee soon/i],
      answer: "🎖️ Santhosh served as a <strong>Corporal First Class (CFC) Combat Medic & Ambulance Medic</strong> in the <strong>Singapore Armed Forces (SAF)</strong> at Kranji Camp 3 (Aug 2021 – Aug 2023). He earned the <strong>Medical Contingent Star Award twice</strong>, served at NDP 2022/2023 and SAF Day Parades, and holds an official Recommendation Letter from his Medical Center Doctor!",
      actions: [
        { text: '🎖️ Scroll to National Service', type: 'scroll', target: '#ns' },
        { text: '📄 View Recommendation Letter', type: 'prompt', value: 'Tell me about the recommendation letter' }
      ]
    },
    {
      patterns: [/star award/i, /medals/i, /military award/i],
      answer: "⭐ Santhosh received the <strong>SAF Medical Contingent Star Award twice (2022, 2023)</strong> for excellence during his National Service."
    },
    {
      patterns: [/aws/i, /amazon web services/i, /data engineer/i, /credly/i, /aws cert/i],
      answer: "🏅 Santhosh holds the <strong>AWS Certified Data Engineer - Associate</strong> credential, along with 20+ specialized AWS course certificates spanning Agentic AI, Bedrock, S3 Vectors, Prompt Engineering, and Modern Data Architecture!",
      actions: [
        { text: '🏅 Verify AWS Badge', type: 'link', url: 'https://www.credly.com/badges/d4df2afa-c578-4e9c-97f8-857c2f0f5f37/public_url' },
        { text: '🏆 Scroll to Academics & Certs', type: 'scroll', target: '#academics' }
      ]
    },
    {
      patterns: [/road bot/i, /rover/i, /pothole/i, /yolo/i, /realsense/i],
      answer: "🤖 <strong>Road Bot — AI Powered Autonomous Rover</strong><br>An autonomous rover built to detect and repair potholes in real time using YOLOv8, Intel RealSense depth sensing, and a custom concrete screw-conveyor mixing mechanism.",
      actions: [
        { text: '💻 GitHub Repo', type: 'link', url: 'https://github.com/santhoshh-maax/RoadBot_Autonomus_Rover.git' },
        { text: '▶ Watch Video', type: 'link', url: 'https://youtu.be/7h7qQ3mTSSQ' }
      ]
    },
    {
      patterns: [/rag/i, /retrieval/i, /mongodb/i, /ollama/i, /gemma/i, /langchain/i, /fastapi/i],
      answer: "⚡ <strong>RAG Chatbot</strong><br>Built using MongoDB Atlas Vector Search, Ollama (Gemma 3), LangChain, and FastAPI. It performs context-aware document retrieval and local LLM response streaming.",
        actions: [
          { text: '💻 GitHub Repo', type: 'link', url: 'https://github.com/santhoshh-maax/RAG-Application.git' },
          { text: '▶ Watch Video', type: 'link', url: 'https://youtu.be/7lTqPjjjvEs' }
        ]
    },
    {
      patterns: [/step assist/i, /smart crutch/i, /crutch/i, /gait/i, /fall detection/i],
      answer: "🩺 <strong>Step Assist — Smart IoT Crutch</strong><br>A medical assistant device with fall detection sensors, step counting, gait analysis, and a Flutter mobile app with voice assistance for elderly users.",
      actions: [{ text: '▶ Watch Video', type: 'link', url: 'https://youtu.be/v015h-hPsK4' }]
    },
    {
      patterns: [/smart toilet/i, /esp32/i, /telegram bot/i],
      answer: "🚽 <strong>Smart Toilet Monitoring System</strong><br>An ESP32 IoT system that automates sanitation with PIR/Ultrasonic sensors, humidity control, gas leak detection, and Telegram bot alerts.",
      actions: [{ text: '💻 GitHub Repo', type: 'link', url: 'https://github.com/santhoshh-maax/Smart-Toilet.git' }]
    },
    {
      patterns: [/gesture/i, /mediapipe/i, /opencv/i, /led/i],
      answer: "🖐️ <strong>Gesture Controlled LED System</strong><br>Real-time touchless LED control using OpenCV, MediaPipe, webcam hand gesture recognition, and serial communication with ESP32.",
      actions: [{ text: '💻 GitHub Repo', type: 'link', url: 'https://github.com/santhoshh-maax/Guester-controller.git' }]
    },
    {
      patterns: [/todo/i, /lah/i, /task app/i],
      answer: "📱 <strong>Todo's Lah</strong><br>A cross-platform task reminder app built with Flutter and Dart, featuring local persistence, scheduled notifications, dynamic theme support, and automated GitHub Actions APK builds.",
      actions: [{ text: '📥 Download App', type: 'link', url: 'https://santhoshh-maax.github.io/todo-s-lah-v1/' }]
    },
    {
      patterns: [/plant/i, /watering/i, /twilio/i, /sms/i, /soil/i],
      answer: "🌱 <strong>Automated Plant Monitoring System</strong><br>An Arduino-based smart irrigation system that waters plants automatically based on soil moisture and sends Twilio SMS notifications."
    },
    {
      patterns: [/cpr/i, /sim vital/i, /simulation/i, /mannequin/i],
      answer: "🫀 <strong>SIM VITAL — CPR Simulation</strong><br>An educational medical simulator combining embedded sensors and real-time visualization on a mannequin for CPR trainees."
    },
    {
      patterns: [/sih/i, /smart india hackathon/i, /finalist/i, /greater noida/i, /delhi/i],
      answer: "🏆 Santhosh was a <strong>SIH 2025 Hardware Edition Finalist</strong> held at Greater Noida, New Delhi."
    },
    {
      patterns: [/cmti/i, /bengaluru/i, /runner/i],
      answer: "🥉 Santhosh won <strong>3rd Runners Up</strong> at the CMTI 2026 Design & Innovation Clinic in Bengaluru."
    },
    {
      patterns: [/care college/i, /dsu/i, /dhanalakshmi/i, /ramakrishnan/i, /prizes/i, /hackathons/i, /expo/i, /awards|achievements/i],
      answer: "🏆 <strong>Key Achievements & Awards:</strong><br>• SIH 2025 Hardware Finalist (Delhi)<br>• CMTI 2026 3rd Runner Up (Bengaluru)<br>• 1st Prize Project Expo @ CARE College, Trichy<br>• 2nd Prize Paper Presentation @ CARE College, Trichy<br>• 2nd Prize Startup Pitching @ Dhanalakshmi Srinivasan University<br>• 1st Prize Project Expo @ K.Ramakrishnan College of Engineering"
    },
    {
      patterns: [/projects/i, /project/i, /what has he built/i, /apps/i, /work done/i],
      answer: "🚀 <strong>Santhosh's Top Projects:</strong><br>1. 🤖 <em>Road Bot</em> — AI Pothole Repair Rover<br>2. 🧠 <em>RAG Chatbot</em> — MongoDB Vector & Ollama<br>3. 🩼 <em>Step Assist</em> — Smart IoT Crutch<br>4. 📱 <em>Todo's Lah</em> — Flutter App<br>5. 🚽 <em>Smart Toilet System</em> — ESP32 & Telegram<br>6. 🖐️ <em>Gesture Control</em> — MediaPipe & OpenCV<br>7. 🌱 <em>Automated Plant Monitor</em> — Arduino & SMS",
      actions: [{ text: '🚀 Scroll to Projects', type: 'scroll', target: '#projects' }]
    },

    {
      patterns: [/who is/i, /about/i, /bio/i, /profile/i, /background/i, /overview/i, /who/i],
      answer: "<strong>Santhosh Panneer Selvam</strong> is a B.E. Computer Science & Engineering student at Mount Zion College of Engineering and Technology, specializing in AI, Robotics, Automation, and IoT hardware systems. Currently working as a Forward Deployed Engineer (FDE) at Glacien.ai!",
      actions: [
        { text: '📜 Scroll to About', type: 'scroll', target: '#about' },
        { text: '📄 Download Resume', type: 'link', url: 'resume.pdf', download: true }
      ]
    },
    {
      patterns: [/email/i, /mail/i, /gmail/i, /phone|number/i, /contact/i, /reach/i, /hire/i, /linkedin/i, /github/i, /instagram/i],
      answer: "📩 <strong>Contact Santhosh:</strong><br>📍 Location: Singapore 560321 (<a href='https://maps.app.goo.gl/TPyzFZSHfYwwRetH7' target='_blank'>View on Google Maps</a>)<br>📧 Email: <a href='mailto:santhoshpanneer03@gmail.com'>santhoshpanneer03@gmail.com</a><br>🔗 LinkedIn: <a href='https://www.linkedin.com/in/santhosh-panneer-selvam-547721358/' target='_blank'>Santhosh Panneer Selvam</a><br>💻 GitHub: <a href='https://github.com/santhoshh-maax' target='_blank'>santhoshh-maax</a><br>📸 Instagram: @santhosh_ps22",
      actions: [
        { text: '📩 Open Contact Form', type: 'scroll', target: '#contact' },
        { text: '🗺️ Open Google Maps', type: 'link', url: 'https://maps.app.goo.gl/TPyzFZSHfYwwRetH7' }
      ]
    },
    {
      patterns: [/resume/i, /cv/i, /download/i],
      answer: "📄 You can download Santhosh's official resume right here!",
      actions: [{ text: '📥 Download Resume (PDF)', type: 'link', url: 'resume.pdf', download: true }]
    },
    {
      patterns: [/\bhi\b/i, /\bhello\b/i, /\bhey\b/i, /\bstart\b/i, /\bhelp\b/i, /who are you/i],
      answer: "👋 Hi there! I'm <strong>SP-AI</strong>, Santhosh's Interactive Portfolio Guide. Ask me anything about his projects, Glacien.ai role, Doctor Recommendation Letter, Singapore location, or technical tool proficiencies!"
    }
  ];

  function getBotResponse(userText) {
    const text = userText.trim();

    for (const qa of portfolioQA) {
      if (qa.patterns.some(pattern => pattern.test(text))) {
        return {
          text: qa.answer,
          actions: qa.actions || []
        };
      }
    }

    // Fallback for unrelated questions
    return {
      text: "I am not sure about that or I could not find anything related to it in Santhosh's portfolio.",
      actions: [
        { text: '🤖 Who is Santhosh?', type: 'prompt', value: 'Who is Santhosh?' },
        { text: '🎓 College & Degree', type: 'prompt', value: 'What college is he studying at?' },
        { text: '🚀 Top Projects', type: 'prompt', value: 'Show featured projects' },
        { text: '💼 Experience', type: 'prompt', value: 'What is his work experience?' }
      ]
    };
  }

  function renderMessages() {
    [heroMessages, drawerMessages].forEach(container => {
      if (!container) return;
      container.innerHTML = '';

      chatHistory.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${msg.sender}-msg`;

        const iconDiv = document.createElement('div');
        iconDiv.className = 'chat-msg-icon';
        iconDiv.innerHTML = msg.sender === 'bot' ? '<i class="fa-solid fa-compass"></i>' : '<i class="fa-solid fa-user"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'chat-msg-content';
        contentDiv.innerHTML = msg.html;

        if (msg.actions && msg.actions.length > 0) {
          const actionRow = document.createElement('div');
          actionRow.style.marginTop = '8px';

          msg.actions.forEach(act => {
            const btn = document.createElement('button');
            btn.className = 'chat-action-btn';
            btn.innerHTML = act.text;

            if (act.type === 'scroll') {
              btn.addEventListener('click', () => {
                const target = document.querySelector(act.target);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              });
            } else if (act.type === 'link') {
              btn.addEventListener('click', () => {
                if (act.download) {
                  const a = document.createElement('a');
                  a.href = act.url;
                  a.download = '';
                  a.click();
                } else {
                  window.open(act.url, '_blank');
                }
              });
            } else if (act.type === 'prompt') {
              btn.addEventListener('click', () => {
                handleUserMessage(act.value);
              });
            }

            actionRow.appendChild(btn);
          });
          contentDiv.appendChild(actionRow);
        }

        msgDiv.appendChild(iconDiv);
        msgDiv.appendChild(contentDiv);
        container.appendChild(msgDiv);
      });

      container.scrollTop = container.scrollHeight;
    });
  }

  function addBotTypingThenMessage(botResp) {
    [heroMessages, drawerMessages].forEach(container => {
      if (!container) return;
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg bot-msg temp-typing';
      typingDiv.innerHTML = `
        <div class="chat-msg-icon"><i class="fa-solid fa-compass"></i></div>
        <div class="chat-msg-content">
          <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>
      `;
      container.appendChild(typingDiv);
      container.scrollTop = container.scrollHeight;
    });

    setTimeout(() => {
      document.querySelectorAll('.temp-typing').forEach(el => el.remove());
      chatHistory.push({
        sender: 'bot',
        html: botResp.text,
        actions: botResp.actions
      });
      renderMessages();
    }, 450);
  }

  function handleUserMessage(text) {
    if (!text || !text.trim()) return;
    const userText = text.trim();

    chatHistory.push({
      sender: 'user',
      html: userText
    });
    renderMessages();

    if (heroInput) heroInput.value = '';
    if (drawerInput) drawerInput.value = '';

    const botResp = getBotResponse(userText);
    addBotTypingThenMessage(botResp);
  }

  function initChatbot() {
    chatHistory = [
      {
        sender: 'bot',
        html: "👋 <strong>Welcome to Santhosh's Portfolio!</strong><br>I am the <strong>Interactive Portfolio Guide</strong>. Ask me anything about his robotics projects, education, Glacien.ai work, Doctor Recommendation Letter, Singapore location, or technical tool proficiency!",
        actions: [
          { text: '👤 Profile', type: 'prompt', value: 'Who is Santhosh?' },
          { text: '💼 Experience', type: 'prompt', value: 'What is his work experience?' },
          { text: '📄 Recommendation', type: 'prompt', value: 'Tell me about the recommendation letter' },
          { text: '🛠️ Tool Proficiency', type: 'prompt', value: 'What is his technical proficiency and tools experience?' },
          { text: '📍 Location', type: 'prompt', value: 'Where is Santhosh located?' },
          { text: '🚀 Projects', type: 'prompt', value: 'Show featured projects' }
        ]
      }
    ];
    renderMessages();
  }

  initChatbot();

  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserMessage(heroInput.value);
    });
  }

  if (drawerForm) {
    drawerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserMessage(drawerInput.value);
    });
  }

  if (heroReset) {
    heroReset.addEventListener('click', function () {
      initChatbot();
    });
  }

  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const promptText = chip.getAttribute('data-prompt');
      if (promptText) handleUserMessage(promptText);
    });
  });

  const heroChatTrigger = document.getElementById('hero-chat-trigger');

  if (heroChatTrigger && chatDrawer) {
    heroChatTrigger.addEventListener('click', function () {
      chatDrawer.removeAttribute('hidden');
      if (drawerInput) drawerInput.focus();
    });
  }

  if (floatingToggle && chatDrawer) {
    floatingToggle.addEventListener('click', function () {
      const isHidden = chatDrawer.hasAttribute('hidden');
      if (isHidden) {
        chatDrawer.removeAttribute('hidden');
        if (drawerInput) drawerInput.focus();
      } else {
        chatDrawer.setAttribute('hidden', '');
      }
    });
  }

  if (drawerClose && chatDrawer) {
    drawerClose.addEventListener('click', function () {
      chatDrawer.setAttribute('hidden', '');
    });
  }

  // ----- Tools Filter Tabs -----
  var toolFilterBtns = document.querySelectorAll('.tool-filter-btn');
  var toolDetailCards = document.querySelectorAll('.tool-detail-card');
  if (toolFilterBtns.length && toolDetailCards.length) {
    toolFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        toolFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        toolDetailCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInCard 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();
