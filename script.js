/**
 * STUDIO ESSENTIALS — Markly Bags Shop Interactive Engine
 * Dynamic model switcher, catalog filters, shopping cart & WhatsApp checkout
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Mobile Drawer Navigation
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
      });
    });
  }

  /* ==========================================================================
     2. Sticky Header Shadow
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  });

  /* ==========================================================================
     3. Hero Dynamic Model Switcher (Simple vs Full Printed)
     ========================================================================== */
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const heroDynamicImage = document.getElementById('hero-dynamic-image');

  const heroModels = {
    simple: {
      img: 'assets/images/editorial_hero_model.jpg'
    },
    printed: {
      img: 'assets/images/bag_printed.jpg'
    }
  };

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modelKey = btn.getAttribute('data-model');
      const data = heroModels[modelKey];

      if (data && heroDynamicImage) {
        heroDynamicImage.style.opacity = '0.3';
        setTimeout(() => {
          heroDynamicImage.src = data.img;
          heroDynamicImage.style.opacity = '1';
        }, 180);
      }
    });
  });

  /* ==========================================================================
     4. Category Filter Pills
     ========================================================================== */
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.markly-product-card');

  window.quickFilter = function(filterVal) {
    const targetPill = document.querySelector(`.filter-pill[data-filter="${filterVal}"]`);
    if (targetPill) targetPill.click();
    const searchModal = document.getElementById('search-modal');
    if (searchModal) searchModal.classList.remove('is-open');
    const shopSec = document.getElementById('shop');
    if (shopSec) shopSec.scrollIntoView({ behavior: 'smooth' });
  };

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. Shopping Cart State & Drawer (Markly Style)
     ========================================================================== */
  let cart = [];
  const openCartBtn = document.getElementById('open-cart-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartCounter = document.getElementById('cart-counter');
  const cartDrawerCount = document.getElementById('cart-drawer-count');
  const cartTotalVal = document.getElementById('cart-total-val');
  const shippingBarFill = document.getElementById('shipping-bar-fill');
  const shippingProgressText = document.getElementById('shipping-progress-text');
  const checkoutWhatsappBtn = document.getElementById('checkout-whatsapp-btn');

  function formatIDR(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCounter.textContent = totalCount;
    cartDrawerCount.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;

    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
    });

    cartTotalVal.textContent = formatIDR(total);

    // Free shipping progress (target: Rp 500.000)
    const target = 500000;
    const progress = Math.min(100, Math.round((total / target) * 100));
    if (shippingBarFill) shippingBarFill.style.width = progress + '%';
    
    if (shippingProgressText) {
      if (total >= target) {
        shippingProgressText.textContent = '🎉 Selamat! Anda Mendapatkan Gratis Ongkir!';
      } else {
        const diff = target - total;
        shippingProgressText.textContent = `Tambah ${formatIDR(diff)} lagi untuk Gratis Ongkir!`;
      }
    }

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">🛍️</div>
          <p>Keranjang Anda masih kosong</p>
          <a href="#shop" class="btn-solid-black" style="font-size: 0.8rem; padding: 0.6rem 1.2rem;" onclick="document.getElementById('cart-drawer-backdrop').classList.remove('is-open');">
            Belanja Sekarang
          </a>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item-card';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-thumb-img" />
        <div class="cart-item-info">
          <h4 class="cart-name">${item.name}</h4>
          <div class="cart-price-math">${formatIDR(item.price)} × ${item.qty} = <strong>${formatIDR(item.price * item.qty)}</strong></div>
        </div>
        <button class="cart-trash-btn" data-index="${index}" title="Hapus">✕</button>
      `;
      cartItemsContainer.appendChild(row);
    });

    document.querySelectorAll('.cart-trash-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }

  function openCart() {
    cartBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) closeCart();
    });
  }

  // Add to cart buttons
  document.querySelectorAll('.js-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);
      const img = btn.getAttribute('data-img');

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, img, qty: 1 });
      }

      updateCartUI();
      openCart();
    });
  });

  // Checkout via WhatsApp
  if (checkoutWhatsappBtn) {
    checkoutWhatsappBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong.');
        return;
      }

      let message = `Halo Studio Essentials (casaglow.id),\nSaya ingin memesan produk berikut:\n\n`;
      let total = 0;
      cart.forEach((item, i) => {
        const sub = item.price * item.qty;
        total += sub;
        message += `${i + 1}. ${item.name} (${item.qty} pcs) - ${formatIDR(sub)}\n`;
      });

      message += `\nTotal Belanja: ${formatIDR(total)}\n\nMohon informasi ongkos kirim dan nomor rekening pembayaran. Terima kasih!`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/6281234567890?text=${encoded}`, '_blank');
    });
  }

  /* ==========================================================================
     6. Product Detail Quick View Modal
     ========================================================================== */
  const productData = {
    'bag-simple': {
      model: 'Essentials Bag',
      brand: 'Studio Essentials',
      category: 'Tas',
      price: 'Rp 315.000',
      rawPrice: 315000,
      color: 'abstract-colour',
      desc: 'simple design',
      material: 'premium heavy canvas',
      img: 'assets/images/bag_simple.jpg',
      fullDesc: 'Tas studio berkapasitas besar yang terbuat dari bahan premium heavy canvas berdensitas tinggi. Sangat kokoh untuk memuat matras pilates, botol tumbler 1 liter, handuk, pakaian ganti, dan perlengkapan harian Anda.'
    },
    'bag-printed': {
      model: 'Essentials Bag',
      brand: 'Studio Essentials',
      category: 'Tas',
      price: 'Rp 315.000',
      rawPrice: 315000,
      color: 'abstract-colour',
      desc: 'Full Printed Edition',
      material: 'premium heavy canvas',
      img: 'assets/images/bag_printed.jpg',
      fullDesc: 'Edisi istimewa Essentials Bag dengan motif artistik full-printed abstrak. Memberikan tampilan berkelas dan modern saat dibawa ke studio maupun bepergian.'
    },
    'grip-socks': {
      model: 'Grip Socks',
      brand: 'Studio Essentials',
      category: 'Kaos Kaki',
      price: 'Rp 115.000',
      rawPrice: 115000,
      color: 'white-darkbrown',
      desc: 'simple design',
      material: 'premium socks',
      img: 'assets/images/grip_socks.jpg',
      fullDesc: 'Kaos kaki studio Pilates & Yoga dengan silikon grip anti-slip di bagian telapak. Menjamin kestabilan dan keamanan Anda di atas alat Reformer.'
    },
    'activewear': {
      model: 'Activewear Capsule',
      brand: 'Studio Essentials',
      category: 'Activewear',
      price: 'Capsule Preview / Pre-Order',
      rawPrice: 0,
      color: 'neutral tones',
      desc: 'Sculpt & Studio Set',
      material: 'premium stretch fabric',
      img: 'assets/images/activewear.jpg',
      fullDesc: 'Lini pakaian aktif eksklusif Studio Essentials dengan material elastis 4 arah yang adem, nyaman, dan menyokong setiap gerakan tubuh.'
    }
  };

  const productModal = document.getElementById('product-modal');
  const productModalClose = document.getElementById('product-modal-close');
  const productModalBody = document.getElementById('product-modal-body');

  document.querySelectorAll('.js-view-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-product');
      const item = productData[key];

      if (item && productModal && productModalBody) {
        productModalBody.innerHTML = `
          <div class="modal-product-layout">
            <div class="modal-product-media">
              <img src="${item.img}" alt="${item.model}" />
            </div>
            <div class="modal-product-info">
              <span class="modal-product-kicker">${item.brand.toUpperCase()} • ${item.category.toUpperCase()}</span>
              <h2 class="modal-product-title">${item.model}</h2>
              <div class="modal-product-price">${item.price}</div>
              <p class="modal-product-desc">${item.fullDesc}</p>

              <div class="modal-specs-grid">
                <div class="modal-spec-item">
                  <strong>WARNA</strong>
                  <span>${item.color}</span>
                </div>
                <div class="modal-spec-item">
                  <strong>BAHAN</strong>
                  <span>${item.material}</span>
                </div>
                <div class="modal-spec-item">
                  <strong>KETERANGAN</strong>
                  <span>${item.desc}</span>
                </div>
                <div class="modal-spec-item">
                  <strong>DOMAIN TOKO</strong>
                  <span>casaglow.id</span>
                </div>
              </div>

              <div class="modal-actions-row">
                ${item.rawPrice > 0 ? `
                  <button class="btn-cover-gold" id="modal-add-cart-btn">
                    <span>+ Add to Bag</span>
                  </button>
                ` : ''}
                <a href="https://wa.me/6281234567890?text=Halo%20Studio%20Essentials,%20saya%20tertarik%20dengan%20${encodeURIComponent(item.model + ' ' + item.desc)}" target="_blank" rel="noreferrer" class="btn-cover-dark">
                  <span>Pesan Langsung via WhatsApp ↗</span>
                </a>
              </div>
            </div>
          </div>
        `;

        const modalAddBtn = document.getElementById('modal-add-cart-btn');
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
            openCart();
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

  /* ==========================================================================
     7. Search Overlay
     ========================================================================== */
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');

  if (searchToggleBtn && searchModal) {
    searchToggleBtn.addEventListener('click', () => {
      searchModal.classList.add('is-open');
      if (searchInput) searchInput.focus();
    });

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', () => {
        searchModal.classList.remove('is-open');
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('is-open');
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        productCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          if (text.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal && productModal.classList.contains('is-open')) {
        productModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      if (cartBackdrop && cartBackdrop.classList.contains('is-open')) {
        closeCart();
      }
      if (searchModal && searchModal.classList.contains('is-open')) {
        searchModal.classList.remove('is-open');
      }
    }
  });

  /* ==========================================================================
     8. Testimonials Carousel (Luxe Theme)
     ========================================================================== */
  const testimonials = [
    {
      quote: '“Kualitas canvas Essentials Bag Simple benar-benar kokoh dan elegan. Muat laptop kerja 14 inch, botol air tumbler 1L, dan matras pilates sekaligus. Bahannya tebal dan jatuh rapi.”',
      author: 'NADIA LARASATI',
      role: 'Verified Buyer • Jakarta Selatan'
    },
    {
      quote: '“Grip socks white-darkbrown nya super estetik dan grip-nya mantap sekali pas latihan reformer pilates. Nggak licin sama sekali dan bahannya empuk di kaki.”',
      author: 'CLARA MARSHALL',
      role: 'Pilates Instructor • Surabaya'
    },
    {
      quote: '“Motif Full Printed Essentials Bag sangat artistik dan unik. Tiap kali saya bawa ke studio banyak yang tanya beli di mana. Packing casaglow.id juga sangat aman.”',
      author: 'VIONA KARINA',
      role: 'Verified Buyer • Bandung'
    }
  ];

  let currentTestiIdx = 0;
  const testiPrevBtn = document.getElementById('testi-prev-btn');
  const testiNextBtn = document.getElementById('testi-next-btn');
  const testiQuoteBox = document.getElementById('testimonial-quote-box');
  const testiDots = document.querySelectorAll('.testimonial-dots-row .dot');

  function renderTestimonial(idx) {
    if (!testiQuoteBox) return;
    const t = testimonials[idx];
    testiQuoteBox.style.opacity = '0.3';
    setTimeout(() => {
      testiQuoteBox.innerHTML = `
        <blockquote class="testimonial-quote-text">${t.quote}</blockquote>
        <div class="testimonial-author-tag">
          <h5 class="author-name">${t.author}</h5>
          <span class="author-role">${t.role}</span>
        </div>
      `;
      testiQuoteBox.style.opacity = '1';
    }, 150);

    testiDots.forEach((dot, dIdx) => {
      if (dIdx === idx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (testiPrevBtn) {
    testiPrevBtn.addEventListener('click', () => {
      currentTestiIdx = (currentTestiIdx - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestiIdx);
    });
  }

  if (testiNextBtn) {
    testiNextBtn.addEventListener('click', () => {
      currentTestiIdx = (currentTestiIdx + 1) % testimonials.length;
      renderTestimonial(currentTestiIdx);
    });
  }

  testiDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentTestiIdx = idx;
      renderTestimonial(currentTestiIdx);
    });
  });

});

