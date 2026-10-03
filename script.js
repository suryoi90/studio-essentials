/**
 * STUDIO ESSENTIALS — Interactive Engine & E-Commerce Cart
 * Luxury editorial interactions, product catalog, cart drawer & WhatsApp checkout
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
     2. Sticky Header Shadow
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
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

    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
      carouselWrapper.addEventListener('mouseleave', () => startAutoSlide());
    }
  }

  /* ==========================================================================
     4. Category Filter Tabs
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInDown 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. Shopping Cart State & Drawer Logic
     ========================================================================== */
  let cart = [];
  const openCartBtn = document.getElementById('open-cart-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartDrawerBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartCounter = document.getElementById('cart-counter');
  const cartTotalVal = document.getElementById('cart-total-val');
  const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp-btn');

  function formatIDR(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCounter.textContent = totalCount;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="cart-empty-message">Keranjang belanja Anda masih kosong.</div>';
      cartTotalVal.textContent = 'Rp 0';
      return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.qty;
      total += itemSubtotal;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      itemRow.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-thumb" />
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">${formatIDR(item.price)} × ${item.qty} = ${formatIDR(itemSubtotal)}</div>
        </div>
        <button class="cart-item-remove" data-index="${index}" title="Hapus Item">&times;</button>
      `;
      cartItemsContainer.appendChild(itemRow);
    });

    cartTotalVal.textContent = formatIDR(total);

    // Attach remove handlers
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }

  function openCartDrawer() {
    cartDrawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawerBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCartDrawer();
    });
  }

  // Add to cart buttons
  document.querySelectorAll('.js-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);
      const img = btn.getAttribute('data-img');

      const existingIndex = cart.findIndex(item => item.id === id);
      if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
      } else {
        cart.push({ id, name, price, img, qty: 1 });
      }

      updateCartUI();
      openCartDrawer();
    });
  });

  // WhatsApp Checkout
  if (checkoutWhatsappBtn) {
    checkoutWhatsappBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong. Silakan pilih produk terlebih dahulu.');
        return;
      }

      let message = `Halo Studio Essentials (casaglow.id), saya ingin memesan:\n\n`;
      let total = 0;
      cart.forEach((item, i) => {
        const sub = item.price * item.qty;
        total += sub;
        message += `${i + 1}. ${item.name} (${item.qty} pcs) - ${formatIDR(sub)}\n`;
      });
      message += `\nTotal: ${formatIDR(total)}\n\nMohon info ketersediaan stok & ongkos kirim. Terima kasih!`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
    });
  }

  /* ==========================================================================
     6. Product Detail / Quick View Modal
     ========================================================================== */
  const productData = {
    'bag-simple': {
      model: 'Essentials Bag',
      brand: 'Studio Essentials',
      category: 'Tas',
      price: 'Rp 315.000',
      rawPrice: 315000,
      color: 'Abstract-colour',
      desc: 'Simple design',
      material: 'Premium heavy canvas',
      img: 'assets/images/bag_simple.jpg',
      fullDesc: 'Tas studio berkapasitas lapang dengan bahan premium heavy canvas yang kokoh dan tahan lama. Dirancang khusus untuk memuat matras pilates, handuk, pakaian olahraga, hingga esensial harian Anda dengan tampilan minimalis nan anggun.'
    },
    'bag-printed': {
      model: 'Essentials Bag',
      brand: 'Studio Essentials',
      category: 'Tas',
      price: 'Rp 315.000',
      rawPrice: 315000,
      color: 'Abstract-colour',
      desc: 'Full Printed Edition',
      material: 'Premium heavy canvas',
      img: 'assets/images/bag_printed.jpg',
      fullDesc: 'Koleksi signature Essentials Bag dengan motif artistik full-printed berpadu kanvas tebal pilihan. Menggabungkan nilai seni grafis modern dengan fungsionalitas tas jinjing studio kelas atas.'
    },
    'grip-socks': {
      model: 'Grip Socks',
      brand: 'Studio Essentials',
      category: 'Kaos Kaki',
      price: 'Rp 115.000',
      rawPrice: 115000,
      color: 'White - Darkbrown',
      desc: 'Simple design',
      material: 'Premium socks with non-slip studio grip',
      img: 'assets/images/grip_socks.jpg',
      fullDesc: 'Kaos kaki Pilates dan Yoga ergonomis dengan daya cengkeram silikon non-slip superior di bagian telapak. Kombinasi warna elegan white-darkbrown yang estetik dan lembut di kulit.'
    },
    'activewear': {
      model: 'Activewear Capsule',
      brand: 'Studio Essentials',
      category: 'Activewear',
      price: 'Konsultasi / Pre-Order',
      rawPrice: 0,
      color: 'Neutral Tones (Espresso & Ivory)',
      desc: 'Sculpt Sets & Studio Tops',
      material: '4-Way Sculpt Lycra',
      img: 'assets/images/activewear.jpg',
      fullDesc: 'Lini pakaian aktif studio dengan material elastis 4 arah yang membentuk tubuh secara alami dan memberikan keleluasaan bergerak tanpa hambatan saat sesi reformer maupun mat class.'
    }
  };

  const productModal = document.getElementById('product-modal');
  const productModalClose = document.getElementById('product-modal-close');
  const productModalBody = document.getElementById('product-modal-body');

  document.querySelectorAll('.js-view-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-product');
      const item = productData[key];

      if (item && productModal && productModalBody) {
        productModalBody.innerHTML = `
          <div class="case-dossier-grid">
            <div class="case-dossier-media">
              <img src="${item.img}" alt="${item.model}" class="case-dossier-img" />
            </div>
            <div class="case-dossier-text">
              <span class="dossier-tag">${item.brand.toUpperCase()} • ${item.category.toUpperCase()}</span>
              <h3>${item.model}</h3>
              <p style="font-size: 1.3rem; font-family: var(--font-serif); color: var(--accent-gold); margin-bottom: 0.8rem; font-weight: 600;">
                ${item.price}
              </p>
              <p class="dossier-body">${item.fullDesc}</p>
              
              <div class="dossier-stats" style="grid-template-columns: 1fr 1fr; margin-bottom: 1.5rem;">
                <div class="stat-item">
                  <div class="lbl">WARNA</div>
                  <div style="color: var(--text-light-primary); font-size: 0.88rem; font-weight: 600;">${item.color}</div>
                </div>
                <div class="stat-item">
                  <div class="lbl">BAHAN</div>
                  <div style="color: var(--text-light-primary); font-size: 0.88rem; font-weight: 600;">${item.material}</div>
                </div>
                <div class="stat-item" style="margin-top: 0.75rem;">
                  <div class="lbl">KETERANGAN</div>
                  <div style="color: var(--text-light-primary); font-size: 0.88rem; font-weight: 600;">${item.desc}</div>
                </div>
                <div class="stat-item" style="margin-top: 0.75rem;">
                  <div class="lbl">BRAND</div>
                  <div style="color: var(--text-light-primary); font-size: 0.88rem; font-weight: 600;">${item.brand} (casaglow.id)</div>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                ${item.rawPrice > 0 ? `
                  <button class="btn-luxury-gold" id="modal-add-to-cart-btn">
                    <span>+ MASUKKAN KERANJANG</span>
                  </button>
                ` : ''}
                <a href="https://wa.me/6281234567890?text=Halo%20Studio%20Essentials,%20saya%20tertarik%20dengan%20${encodeURIComponent(item.model + ' ' + item.desc)}" target="_blank" rel="noreferrer" class="btn-ghost-luxury">
                  <span>ORDER VIA WHATSAPP ↗</span>
                </a>
              </div>
            </div>
          </div>
        `;

        const modalAddBtn = document.getElementById('modal-add-to-cart-btn');
        if (modalAddBtn) {
          modalAddBtn.addEventListener('click', () => {
            const existing = cart.find(c => c.id === key);
            if (existing) {
              existing.qty += 1;
            } else {
              cart.push({ id: key, name: `${item.model} (${item.desc})`, price: item.rawPrice, img: item.img, qty: 1 });
            }
            updateCartUI();
            productModal.classList.remove('is-open');
            document.body.style.overflow = '';
            openCartDrawer();
          });
        }

        productModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (productModalClose && productModal) {
    productModalClose.addEventListener('click', () => {
      productModal.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        productModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal && productModal.classList.contains('is-open')) {
        productModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      if (cartDrawerBackdrop && cartDrawerBackdrop.classList.contains('is-open')) {
        closeCartDrawer();
      }
    }
  });

});
