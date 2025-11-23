// =========================================
// FILTRO DE PRODUCTOS POR CATEGORÍA (actualizado)
// Soporta productos con una o varias categorías
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const filterCards = document.querySelectorAll(".category-card");
  const grid = document.querySelector("#productsGrid");

  // Esperar a que los productos estén listos
  window.addEventListener("productsLoaded", () => {
    const allProducts = window.productsData || [];

    // Configurar clic en cada categoría
    filterCards.forEach((card) => {
      card.addEventListener("click", () => {
        const category = card.getAttribute("data-category");

        // Cambiar estado activo visualmente
        filterCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        // Agregar efecto de transición (fade)
        grid.classList.add("fade-out");

        // Esperar la animación antes de renderizar
        setTimeout(() => {
          const filtered =
            category === "todos"
              ? allProducts
              : allProducts.filter((p) =>
                Array.isArray(p.category)
                  ? p.category.includes(category)
                  : p.category === category
              );

          renderProducts(filtered);
          grid.classList.remove("fade-out");
          grid.classList.add("fade-in");
        }, 200);
      });
    });
  });

  // Función para renderizar productos filtrados
  function renderProducts(products) {
    if (!grid) return;
    grid.innerHTML = "";

    if (products.length === 0) {
      grid.innerHTML = `<p class="no-products">No hay productos para esta categoría.</p>`;
      return;
    }

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toLocaleString("es-CO")}</p>
        <button class="btn-add" onclick="addToCart(${product.id})">Agregar al carrito</button>
      `;
      grid.appendChild(card);
    });
  }
});
