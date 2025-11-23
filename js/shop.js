// js/shop.js
let allProducts = [];

// Cargar todos los productos desde la API o variable global
async function loadAllProducts() {
  try {
    // Intentar cargar desde la API
    try {
      const response = await fetch('http://localhost:8000/api/products');
      if (response.ok) {
        allProducts = await response.json();
        console.log("Productos cargados desde la API (Python)");
      } else {
        throw new Error("API response not ok");
      }
    } catch (apiError) {
      console.warn("No se pudo conectar a la API, usando datos locales:", apiError);
      // Fallback a datos locales
      allProducts = window.productsData || [];
    }

    // Guardar globalmente por si acaso
    window.productsData = allProducts;

    renderProducts(allProducts);

    // Avisar a otros scripts que los productos ya están listos (si es necesario)
    window.dispatchEvent(new Event("productsLoaded"));
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

// Renderizar productos en la tienda
function renderProducts(products) {
  const container = document.querySelector(".products-grid");
  if (!container) return;

  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = `<p class="no-products">No hay productos disponibles.</p>`;
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

    container.appendChild(card);
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadAllProducts);
