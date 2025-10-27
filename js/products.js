// js/products.js
async function loadFeaturedProducts() {
  try {
    const response = await fetch("data/products.json");
    const products = await response.json();

    // 🔹 Solo los 4 primeros productos (destacados)
    const featured = products.slice(0, 4);

    const container = document.querySelector(".products-grid");
    container.innerHTML = ""; // limpiar antes

    featured.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toLocaleString("es-CO")}</p>
        <button class="btn-add">Agregar al carrito</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando productos destacados:", error);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadFeaturedProducts);
