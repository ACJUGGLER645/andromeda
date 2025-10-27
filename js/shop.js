// js/shop.js
let allProducts = [];

// Cargar todos los productos desde el JSON
async function loadAllProducts() {
  try {
    const response = await fetch("data/products.json");
    allProducts = await response.json();

    // Guardar los productos globalmente (para filter.js)
    window.productsData = allProducts;

    renderProducts(allProducts);

    // Avisar a otros scripts que los productos ya están listos
    window.dispatchEvent(new Event("productsLoaded"));
  } catch (error) {
    console.error("Error cargando los productos:", error);
  }
}

// Renderizar productos en la tienda
function renderProducts(products) {
  const container = document.querySelector(".products-grid");
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
      <button class="btn-add">Agregar al carrito</button>
    `;

    container.appendChild(card);
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadAllProducts);
