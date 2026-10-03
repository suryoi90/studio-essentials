/**
 * STUDIO ESSENTIALS — Interactive Engine
 * Luxury editorial interactions, carousels, modal drawers & dossier views
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Mobile Navigation Drawer
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. Sticky Header Scroll Polish
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.45)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  });

  /* ==========================================================================
     3. Testimonial Carousel
     ========================================================================== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(index);
        resetInterval();
      });
    });

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 7000);
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    // Pause on hover
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
      carouselWrapper.addEventListener('mouseleave', () => startAutoSlide());
    }
  }

  /* ==========================================================================
     4. Consultation Modal Logic
     ========================================================================== */
  const modal = document.getElementById('consultation-modal');
  const modalClose = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.js-open-modal');
  const consultationForm = document.getElementById('consultation-form');
  const modalSuccess = document.getElementById('modal-success');
  const successCloseBtn = document.getElementById('success-close-btn');

  function openConsultationModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeConsultationModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Reset state after transition
    setTimeout(() => {
      if (consultationForm) consultationForm.style.display = 'flex';
      if (modalSuccess) modalSuccess.style.display = 'none';
      if (consultationForm) consultationForm.reset();
    }, 400);
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', openConsultationModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeConsultationModal);
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', closeConsultationModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeConsultationModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeConsultationModal();
    }
  });

  // Form Submission
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-booking-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>TRANSMITTING CONFIDENTIAL DOSSIER...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        consultationForm.style.display = 'none';
        modalSuccess.style.display = 'block';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 900);
    });
  }

  /* ==========================================================================
     5. Case Studies Interactive Dossier Modal
     ========================================================================== */
  const caseCards = document.querySelectorAll('.case-card');
  const caseModal = document.getElementById('case-modal');
  const caseModalClose = document.getElementById('case-modal-close');
  const caseDossierBody = document.getElementById('case-dossier-body');

  const caseData = {
    aurelia: {
      title: 'Aurelia Architecture',
      tag: 'CASE STUDY 01 — ARCHITECTURAL HERITAGE & DIGITAL SPATIAL LIVING',
      img: 'assets/images/case_study_one.jpg',
      description: 'Aurelia sought to reposition their bespoke architecture firm to attract high-net-worth residential and cultural commissions. Studio Essentials designed a monograph-inspired digital experience, pairing monumental typography with cinematic spatial photography and editorial cadence.',
      stat1: '+310%',
      lbl1: 'High-Value Inquiry Volume',
      stat2: '$14.2M',
      lbl2: 'Commission Pipeline Generated'
    },
    lumen: {
      title: 'Lumen & Essence',
      tag: 'CASE STUDY 02 — HAUTE PARFUMERIE & E-COMMERCE FLAGSHIP',
      img: 'assets/images/case_study_two.jpg',
      description: 'For private perfume atelier Lumen & Essence, our objective was translating nuanced olfactory sensations into tactile digital design. We deployed bespoke liquid gold animation, sensory copywriting, and an effortless private-access checkout flow.',
      stat1: '4.8x',
      lbl1: 'Conversion Lift on VIP Drops',
      stat2: '100%',
      lbl2: 'Edition 01 Sold Out in 48 Hours'
    },
    nocturne: {
      title: 'Nocturne Atelier',
      tag: 'CASE STUDY 03 — CONTEMPORARY CERAMICS & EXCLUSIVE EXHIBITION',
      img: 'assets/images/case_study_three.jpg',
      description: 'Sculptural fine-art studio Nocturne Atelier needed an international platform to showcase limited ceramic series. We established an understated gallery aesthetic that lets the raw clay and geometric silhouettes command complete visitor attention.',
      stat1: '82%',
      lbl1: 'International Collector Reach',
      stat2: 'Top 10',
      lbl2: 'Art & Architecture Award Finalist'
    }
  };

  caseCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      const project = caseData[projectKey];

      if (project && caseDossierBody && caseModal) {
        caseDossierBody.innerHTML = `
          <div class="case-dossier-grid">
            <div class="case-dossier-media">
              <img src="${project.img}" alt="${project.title}" class="case-dossier-img" />
            </div>
            <div class="case-dossier-text">
              <span class="dossier-tag">${project.tag}</span>
              <h3>${project.title}</h3>
              <p class="dossier-body">${project.description}</p>
              <div class="dossier-stats">
                <div class="stat-item">
                  <div class="num">${project.stat1}</div>
                  <div class="lbl">${project.lbl1}</div>
                </div>
                <div class="stat-item">
                  <div class="num">${project.stat2}</div>
                  <div class="lbl">${project.lbl2}</div>
                </div>
              </div>
              <div style="margin-top: 2rem;">
                <button class="btn-luxury-gold js-open-modal" onclick="document.getElementById('case-modal').classList.remove('is-open'); document.getElementById('consultation-modal').classList.add('is-open');">
                  <span>DISCUSS SIMILAR VISION</span>
                </button>
              </div>
            </div>
          </div>
        `;

        caseModal.classList.add('is-open');
        caseModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (caseModalClose && caseModal) {
    caseModalClose.addEventListener('click', () => {
      caseModal.classList.remove('is-open');
      caseModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) {
        caseModal.classList.remove('is-open');
        caseModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     6. Newsletter / Dossier Form
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm && newsletterFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        newsletterFeedback.textContent = '✦ Welcome to the Studio Essentials Private Registry.';
        newsletterFeedback.style.color = '#c8a882';
        emailInput.value = '';
      }
    });
  }

  /* ==========================================================================
     7. Smooth Active Navigation on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

});
