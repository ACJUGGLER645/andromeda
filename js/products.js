// js/products.js
async function loadFeaturedProducts() {
  try {
    let products = [];

    // Intentar cargar desde la API
    try {
      const response = await fetch('http://localhost:8000/api/products');
      if (response.ok) {
        products = await response.json();
        console.log("Productos cargados desde la API (Python)");
      } else {
        throw new Error("API response not ok");
      }
    } catch (apiError) {
      console.warn("No se pudo conectar a la API, usando datos locales:", apiError);
      // Fallback a datos locales
      products = window.productsData || [];
    }

    // 🔹 Solo los 4 primeros productos (destacados)
    const featured = products.slice(0, 4);

    const container = document.querySelector(".products-grid");
    if (!container) return;

    container.innerHTML = ""; // limpiar antes

    featured.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toLocaleString("es-CO")}</p>
        <button class="btn-add" onclick="addToCart(${product.id})">Agregar al carrito</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando productos destacados:", error);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadFeaturedProducts);
