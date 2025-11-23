document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");

  if (headerContainer) {
    headerContainer.innerHTML = `
      <!-- 🔹 TOPBAR -->
      <div class="topbar" id="topbar">
        <div class="topbar-container">
          <div class="topbar-left">
            <span>📞 +57 3118857400</span>
            <span>✉️ Andromedapetshop@outlook.com</span>
          </div>
          <div class="topbar-right">
            <span>📍 Calle 71p Sur #27j-10, Bogotá</span>
          </div>
        </div>
      </div>

      <!-- 🔹 NAVBAR -->
      <header class="navbar" id="navbar">
        <div class="navbar-container">
          <!-- LOGO -->
          <div class="logo">
            <span class="paw">🐾</span>
            <h1>Andromeda</h1>
          </div>

          <!-- ENLACES -->
          <nav class="nav-links" id="navLinks">
            <a href="index.html" data-page="index.html">Inicio</a>
            <a href="tienda.html" data-page="tienda.html">Tienda</a>
            <a href="sobrenosotros.html" data-page="sobrenosotros.html">Sobre nosotros</a>
            <a href="contacto.html" data-page="contacto.html">Contáctanos</a>
          </nav>

          <!-- ICONO DE CARRITO -->
          <div class="cart" onclick="toggleCart()">
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Carrito"
              class="cart-icon"
            />
            <span id="cart-count" class="cart-count">0</span>
          </div>

          <!-- BOTÓN MENÚ MÓVIL -->
          <div class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <!-- MENÚ MÓVIL -->
        <nav class="mobile-menu" id="mobileMenu">
          <a href="index.html" data-page="index.html">Inicio</a>
          <a href="tienda.html" data-page="tienda.html">Tienda</a>
          <a href="sobrenosotros.html" data-page="sobrenosotros.html">Sobre nosotros</a>
          <a href="contacto.html" data-page="contacto.html">Contáctanos</a>
          <hr />
          <div class="mobile-contact">
            <p>📞 +57 3118857400</p>
            <p>✉️ Andromedapetshop@outlook.com</p>
            <p>📍 Calle 71p Sur #27j-10, Bogotá</p>
          </div>
        </nav>

        <div class="overlay" id="overlay"></div>
      </header>

      <!-- 🔹 CART MODAL -->
      <div id="cart-modal" class="cart-modal">
        <div class="cart-header">
          <h2>Tu Carrito</h2>
          <button class="close-cart" onclick="toggleCart()">×</button>
        </div>
        <div class="cart-items" id="cart-items">
          <!-- Items will be injected here -->
          <p class="empty-cart-msg">Tu carrito está vacío.</p>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-total-price">$0</span>
          </div>
          <button class="btn-checkout" onclick="alert('Funcionalidad de pago próximamente')">Pagar</button>
        </div>
      </div>
      <div id="cart-overlay" class="cart-overlay" onclick="toggleCart()"></div>
    `;
  }

  if (footerContainer) {
    footerContainer.innerHTML = `
      <!-- 🔹 FOOTER -->
      <footer class="footer">
        <div class="footer-container">
          <!-- Columna 1 -->
          <div class="footer-brand">
            <h2>🐾 Andromeda Pet Shop</h2>
            <p>
              Tu mascota es parte de la familia, y en nuestra tienda la tratamos como tal.
              Ofrecemos lo mejor para su bienestar, salud y felicidad.
            </p>
            <div class="social-icons">
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Facebook" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111421.png" alt="Instagram" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/5968/5968852.png" alt="TikTok" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png" alt="YouTube" /></a>
            </div>
          </div>

          <!-- Columna 2 -->
          <div class="footer-links">
            <h3>Empresa</h3>
            <ul>
              <li><a href="tienda.html">Productos</a></li>
              <li><a href="sobrenosotros.html">Sobre nosotros</a></li>
            </ul>
          </div>

          <!-- Columna 3 -->
          <div class="footer-links">
            <h3>Servicio al cliente</h3>
            <ul>
              <li><a href="contacto.html">Contáctanos</a></li>
              <li><a href="#">Envío</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Orden de seguimiento</a></li>
            </ul>
          </div>

          <!-- Columna 4 -->
          <div class="footer-contact">
            <h3>Datos de contacto</h3>
            <p>Calle 71p Sur #27j-10, Bogotá</p>
            <p>+57 3118857400</p>
            <p>Andromedapetshop@outlook.com</p>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="payments">
            <img src="assets/pagos/visa.png" alt="Visa" />
            <img src="assets/pagos/amex.png" alt="American Express" />
            <img src="assets/pagos/mastercard.png" alt="Mastercard" />
            <img src="assets/pagos/paypal.png" alt="PayPal" />
          </div>

          <p>© 2025 Andromeda Pet Shop. ALR</p>
        </div>
      </footer>
    `;
  }

  // Highlight active link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(`a[data-page="${currentPage}"]`);
  links.forEach(link => link.classList.add("active"));

  // Initialize Navbar Logic
  initNavbar();

  // Initialize Cart Logic
  updateCartUI();
});

function initNavbar() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navbar = document.getElementById("navbar");
  const topbar = document.getElementById("topbar");
  const overlay = document.getElementById("overlay");
  const contactInline = document.getElementById("contactInline");

  // --- Menú móvil ---
  if (menuToggle && mobileMenu && overlay) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("open");
      overlay.classList.toggle("show");
      document.body.classList.toggle("no-scroll");

      // Ocultar el menú principal al abrir el menú móvil
      const navLinks = document.getElementById("navLinks");
      if (navLinks) navLinks.style.display = isOpen ? "none" : "flex";
    });

    // Cerrar menú al hacer clic en overlay o en un enlace del menú
    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      overlay.classList.remove("show");
      document.body.classList.remove("no-scroll");

      const navLinks = document.getElementById("navLinks");
      if (navLinks) navLinks.style.display = "flex";
    };

    overlay.addEventListener("click", closeMenu);
    document.querySelectorAll(".mobile-menu a").forEach((link) =>
      link.addEventListener("click", closeMenu)
    );
  }

  // --- Efecto de scroll dinámico ---
  if (navbar && topbar) {
    window.addEventListener("scroll", () => {
      const isScrolled = window.scrollY > 80;

      navbar.classList.toggle("compact", isScrolled);
      topbar.classList.toggle("hidden", isScrolled);

      if (contactInline) {
        contactInline.classList.toggle("visible", isScrolled);
      }
    });
  }
}

// ==========================
// CART LOGIC
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  const overlay = document.getElementById("cart-overlay");
  if (modal && overlay) {
    modal.classList.toggle("open");
    overlay.classList.toggle("open");
  }
}

function addToCart(productId) {
  const product = window.productsData.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();

  // Open cart to show feedback
  const modal = document.getElementById("cart-modal");
  if (modal && !modal.classList.contains("open")) {
    toggleCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total-price");

  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
  }

  if (cartItemsContainer && cartTotal) {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío.</p>`;
    } else {
      cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement("div");
        itemEl.classList.add("cart-item");
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>$${item.price.toLocaleString("es-CO")}</p>
            <div class="cart-item-controls">
              <button onclick="updateQuantity(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        `;
        cartItemsContainer.appendChild(itemEl);
      });
    }

    cartTotal.textContent = `$${total.toLocaleString("es-CO")}`;
  }
}

// Expose functions globally
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
