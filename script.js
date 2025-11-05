(function(){
  // Sections & nav
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navbar a');

  function showSectionById(id){
    sections.forEach(s=> {
      if(s.id === id){
        s.classList.add('active');
        s.style.display = 'flex';
      } else {
        s.classList.remove('active');
        s.style.display = 'none';
      }
    });
    document.documentElement.scrollTop = 0;
  }

  // NAVBAR LINKS
  navLinks.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = this.dataset.target || this.getAttribute('href').replace('#','');
      showSectionById(target);
    });
  });

  // INIT SHOW
  document.addEventListener('DOMContentLoaded', ()=> {
    showSectionById('beranda');
  });

  // === TOMBOL "LIHAT PRICE LIST" ===
  const lihatPriceBtn = document.getElementById('lihat-price');
  if(lihatPriceBtn){
    lihatPriceBtn.addEventListener('click', function(e){
      e.preventDefault();
      showSectionById('price-list');
    });
  }

  // === FILTER LOGIC ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const priceCards = document.querySelectorAll('.price-card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      priceCards.forEach(card=>{
        if(category === 'all' || card.dataset.category === category || !card.dataset.category)
          card.style.display = 'block';
        else
          card.style.display = 'none';
      });
    });
  });

  // === CART LOGIC ===
  let cart = JSON.parse(localStorage.getItem('bigsewa_cart') || '[]');

  function saveCart(){ localStorage.setItem('bigsewa_cart', JSON.stringify(cart)); }
  function updateCartCount(){
    const el = document.getElementById('cart-count');
    if(el) el.textContent = cart.length;
  }

  function renderCart(){
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    if(!container || !totalEl) return;
    container.innerHTML = '';
    if(cart.length === 0){
      container.innerHTML = '<p style="color:#ddd;text-align:center;padding:14px">Keranjang masih kosong 😊</p>';
      totalEl.textContent = 'Total: Rp0';
      updateCartCount();
      return;
    }
    let total = 0;
    cart.forEach((item, idx)=>{
      const wrap = document.createElement('div');
      wrap.className = 'cart-item';
      wrap.innerHTML = `
        <div>
          <strong style="color:var(--pink)">${item.name}</strong><br>
          <span style="color:#ddd">Rp${parseInt(item.price).toLocaleString('id-ID')}</span>
        </div>
        <div>
          <button class="remove-btn" data-index="${idx}">Hapus</button>
        </div>
      `;
      container.appendChild(wrap);
      total += parseInt(item.price);
    });
    totalEl.textContent = `Total: Rp${total.toLocaleString('id-ID')}`;
    updateCartCount();
    saveCart();
  }

  // ADD TO CART
  function attachAddToCartHandlers(){
    document.querySelectorAll('.add-to-cart').forEach(btn=>{
      btn.removeEventListener('click', btn._added);
      const handler = ()=>{
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price) || 0;
        cart.push({name, price});
        renderCart();
        alert(`${name} berhasil ditambahkan ke keranjang!`);
      };
      btn.addEventListener('click', handler);
      btn._added = handler;
    });
  }

  document.addEventListener('click', function(e){
    if(e.target && e.target.matches('.remove-btn')){
      const idx = parseInt(e.target.dataset.index);
      if(!isNaN(idx)){
        cart.splice(idx,1);
        renderCart();
      }
    }
  });

  // BACK TO PRODUCTS
  const backBtn = document.getElementById('back-to-products');
  if(backBtn){
    backBtn.addEventListener('click', function(){
      showSectionById('price-list');
    });
  }

  // WHATSAPP BUTTON
  const waBtn = document.getElementById('whatsapp-btn');
  if(waBtn){
    waBtn.addEventListener('click', function(){
      if(cart.length === 0){ alert('Keranjang masih kosong!'); return; }
      let message = 'Halo kak, saya ingin memesan:%0A';
      let total = 0;
      cart.forEach(item=>{
        message += `- ${item.name} (Rp${parseInt(item.price).toLocaleString('id-ID')})%0A`;
        total += parseInt(item.price);
      });
      message += `%0ATotal: Rp${total.toLocaleString('id-ID')}`;
      const wa = '6285745565042';
      window.open(`https://wa.me/${wa}?text=${message}`, '_blank');
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = this.name.value.trim();
      const msg = this.message.value.trim();
      const wa = '6285745565042';
      const text = `Halo, saya ${name}. ${msg}`;
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  // CART ICON LINK
  document.querySelectorAll('.cart-link').forEach(link=>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      showSectionById('cart');
      renderCart();
    });
  });

  // INIT
  attachAddToCartHandlers();
  renderCart();
  updateCartCount();

  const priceContainer = document.querySelector('.price-container');
  if(priceContainer){
    const obs = new MutationObserver(()=>{
      attachAddToCartHandlers();
    });
    obs.observe(priceContainer, {childList:true, subtree:true});
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('add-to-cart')){
      document.activeElement.click();
    }
  });
})();
