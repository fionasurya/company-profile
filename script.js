localStorage.clear();

(function(){
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.navbar a');

  function showSectionById(id){
    sections.forEach(s => {
      if(s.id === id){
        s.classList.add('active');
        s.style.display = 'flex';
      } else {
        s.classList.remove('active');
        s.style.display = 'none';
      }
    });

    window.scrollTo(0, 0);

    document.documentElement.scrollTop = 0;

    if(id === 'price-list'){
      const satuanBtn = document.querySelector('.filter-btn[data-category="satuan"]');
      const priceCards = document.querySelectorAll('.price-card');

      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      if (satuanBtn) satuanBtn.classList.add('active');

      priceCards.forEach(card => {
        if (card.dataset.category === 'satuan') {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  navLinks.forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = this.dataset.target || this.getAttribute('href').replace('#','');
      showSectionById(target);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    showSectionById('beranda');
  });

  const lihatPriceBtn = document.getElementById('lihat-price');
  if(lihatPriceBtn){
    lihatPriceBtn.addEventListener('click', function(e){
      e.preventDefault();
      showSectionById('price-list');
    });
  }

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

document.addEventListener("DOMContentLoaded", () => {
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const cartSection = document.getElementById("cart-section");
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const whatsappBtn = document.getElementById("whatsapp-btn");
  let total = 0;

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"));

      const item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <div class="cart-box" style="display:flex; justify-content:space-between; align-items:center; background:#111; border-radius:12px; padding:10px; margin:5px 0;">
          <div style="color:white;">
            <strong>${name}</strong><br>
            <span class="price">Rp${price.toLocaleString("id-ID")}</span>
          </div>
          <button class="btn-pink hapus-item" style="padding:6px 12px; cursor:pointer;">Hapus</button>
        </div>
      `;
      cartItems.appendChild(item);
      total += price;
      totalPriceEl.textContent = `Total: Rp${total.toLocaleString("id-ID")}`;
    });
  });

cartItems.innerHTML = "";
total = 0;
totalPriceEl.textContent = "Total: Rp0";

  cartItems.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("hapus-item")) {
      const item = e.target.closest(".cart-item");
      if (item) {
        const priceText = item.querySelector(".price").textContent.replace(/\D/g, "");
        const price = parseInt(priceText);
        total -= price;
        item.remove();
        totalPriceEl.textContent = `Total: Rp${total.toLocaleString("id-ID")}`;
      }
    }
  });

  if (cartToggleBtn && cartSection) {
    cartToggleBtn.addEventListener("click", () => {
      const isHidden = cartSection.style.display === "none" || cartSection.style.display === "";
      cartSection.style.display = isHidden ? "block" : "none";
      cartToggleBtn.textContent = isHidden ? "❌ Tutup Keranjang" : "🛒 Lihat Keranjang";
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const items = cartItems.querySelectorAll(".cart-item");
      if (items.length === 0) {
        alert("Keranjang masih kosong!");
        return;
      }
      let message = "🛍️ *Pesanan BIG SEWA*\n\n";
      items.forEach(item => {
        const name = item.querySelector("strong").textContent;
        const price = item.querySelector(".price").textContent;
        message += `• ${name} - ${price}\n`;
      });
      message += `\n${totalPriceEl.textContent}\n\nKirim dari website BIG SEWA 🌸`;

      const whatsappNumber = "6281234567890";
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
    });
  }
});

})();
