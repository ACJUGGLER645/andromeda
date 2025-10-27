// ==========================
// NAVBAR FUNCTIONALITY (Versión segura)
// ==========================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
const topbar = document.getElementById("topbar");
const overlay = document.getElementById("overlay");
const contactInline = document.getElementById("contactInline"); // opcional

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
  overlay.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-menu a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("no-scroll");

    const navLinks = document.getElementById("navLinks");
    if (navLinks) navLinks.style.display = "flex";
  }
}

// --- Efecto de scroll dinámico ---
if (navbar && topbar) {
  window.addEventListener("scroll", () => {
    const isScrolled = window.scrollY > 80;

    navbar.classList.toggle("compact", isScrolled);
    topbar.classList.toggle("hidden", isScrolled);

    // Solo si existe contactInline
    if (contactInline) {
      contactInline.classList.toggle("visible", isScrolled);
    }
  });
}
// ==========================