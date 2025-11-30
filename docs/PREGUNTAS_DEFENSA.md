# 🎓 Preguntas y Respuestas para la Defensa Técnica del Proyecto
# Andromeda Pet Shop

Este documento recopila las posibles preguntas que un profesor o evaluador técnico podría hacer sobre el desarrollo de **Andromeda Pet Shop**, junto con las respuestas explicadas para defender tu proyecto con seguridad.

---

## 🏗️ Arquitectura General

### 1. ¿Cuál es la arquitectura de su aplicación?
**Respuesta:**
La aplicación sigue una arquitectura **Cliente-Servidor** separada (Decoupled Architecture):
*   **Frontend (Cliente):** Desarrollado con HTML5, CSS3 y JavaScript Vanilla. Se encarga de la interfaz de usuario y la lógica de presentación. Está alojado en **Netlify**.
*   **Backend (Servidor):** Desarrollado con **Python** usando el framework **FastAPI**. Se encarga de la lógica de negocio, procesamiento de datos y conexión a la base de datos. Está alojado en **Railway**.
*   **Base de Datos:** Usamos **SQLite** (gestionada por **SQLAlchemy**) para almacenar productos, categorías y mensajes de contacto.

### 2. ¿Por qué separaron el Frontend del Backend?
**Respuesta:**
Para seguir el principio de **separación de responsabilidades**.
*   Permite que el frontend y el backend evolucionen independientemente.
*   El backend (API) podría ser consumido en el futuro por una aplicación móvil sin cambiar nada del código del servidor.
*   Facilita el despliegue escalable: podemos mejorar el servidor sin tocar la interfaz gráfica.

---

## 🎨 Frontend (HTML, CSS, JS)

### 3. ¿Cómo implementaron el "Modo Oscuro"?
**Respuesta:**
Utilizamos **Variables CSS (Custom Properties)** definidas en el `:root`.
*   Definimos variables para colores semánticos (ej. `--bg-body`, `--text-main`).
*   Creamos una clase `.dark-mode` en el `body` que redefine estas variables con colores oscuros.
*   Con **JavaScript**, alternamos esta clase en el `body` al hacer clic en el botón y guardamos la preferencia del usuario en `localStorage` para recordarla en futuras visitas.

### 4. ¿Cómo funciona el carrito de compras? ¿Se guarda en la base de datos?
**Respuesta:**
El carrito es **persistente en el lado del cliente** usando `localStorage`.
*   No se guarda en la base de datos del servidor (para mantenerlo simple y rápido).
*   JavaScript gestiona un array de objetos (productos) que se guarda como un string JSON en el navegador.
*   Cada vez que se agrega o elimina un producto, actualizamos este array y volvemos a renderizar la interfaz del carrito.

### 5. ¿Cómo se comunican con el Backend?
**Respuesta:**
Usamos la **Fetch API** nativa de JavaScript.
*   Hacemos peticiones HTTP asíncronas (`GET`, `POST`) a los endpoints de nuestra API (ej. `/api/products`).
*   Manejamos las respuestas con `async/await` para escribir código más limpio y legible.
*   Tenemos una función centralizada `window.getApiUrl()` que detecta automáticamente si estamos en desarrollo (`localhost`) o producción (`Railway`) para usar la URL correcta.

### 6. ¿Qué técnica de CSS usaron para el diseño (Grid vs Flexbox)?
**Respuesta:**
Usamos una combinación de ambas según la necesidad:
*   **CSS Grid:** Para las estructuras generales de la página (layouts) y grillas de productos, ya que nos permite controlar filas y columnas bidimensionalmente.
*   **Flexbox:** Para alinear elementos en una sola dimensión, como los ítems de la barra de navegación, el contenido de las tarjetas o el centrado de elementos.

---

## ⚙️ Backend (Python & FastAPI)

### 7. ¿Por qué eligieron FastAPI en lugar de Flask o Django?
**Respuesta:**
Elegimos **FastAPI** por varias razones técnicas:
*   **Velocidad:** Es uno de los frameworks de Python más rápidos, comparable a NodeJS.
*   **Tipado Estático:** Usa `Pydantic` para validar datos automáticamente, lo que reduce errores en tiempo de ejecución.
*   **Documentación Automática:** Genera automáticamente documentación interactiva (Swagger UI) en `/docs`, lo cual facilitó mucho las pruebas de los endpoints.
*   **Asincronía:** Soporta `async/await` nativamente, ideal para operaciones de entrada/salida como consultas a bases de datos.

### 8. ¿Qué es un ORM y cuál usaron?
**Respuesta:**
Usamos **SQLAlchemy** como ORM (Object-Relational Mapper).
*   Un ORM nos permite interactuar con la base de datos usando **clases y objetos de Python** en lugar de escribir consultas SQL crudas.
*   Por ejemplo, en lugar de `SELECT * FROM products`, escribimos `db.query(Product).all()`.
*   Esto hace el código más seguro (evita inyección SQL) y fácil de mantener.

### 9. ¿Cómo manejan el problema de CORS?
**Respuesta:**
Configuramos el **CORSMiddleware** en FastAPI.
*   CORS (Cross-Origin Resource Sharing) es una medida de seguridad de los navegadores que bloquea peticiones entre dominios diferentes (nuestro frontend en Netlify vs backend en Railway).
*   En el backend, definimos explícitamente qué orígenes (dominios) tienen permiso para pedir datos a nuestra API.

---

## 🚀 Despliegue y DevOps

### 10. ¿Qué es `Procfile` y `netlify.toml`?
**Respuesta:**
Son archivos de configuración para las plataformas de despliegue:
*   **`Procfile`:** Le dice a **Railway** cómo iniciar nuestro servidor Python (usando `uvicorn`).
*   **`netlify.toml`:** Le dice a **Netlify** cómo manejar las rutas del frontend, asegurando que si recargamos la página, el servidor siempre sirva `index.html` (útil para Single Page Applications).

### 11. ¿Cómo manejan las variables de entorno o URLs de producción?
**Respuesta:**
En el frontend, implementamos una detección dinámica del `hostname`.
*   Si el navegador detecta que está en `localhost` o `127.0.0.1`, usa la API local.
*   Si detecta cualquier otro dominio (producción), usa automáticamente la URL de Railway.
*   Esto nos permite trabajar en local y desplegar sin tener que cambiar el código manualmente cada vez.

---

## 🔍 Preguntas "Trampa" o de Detalle

### 12. ¿Qué pasa si la API se cae? ¿La página deja de funcionar?
**Respuesta:**
Hemos implementado un manejo de errores básico (`try/catch`).
*   Si la API falla, el `catch` captura el error y mostramos un mensaje amigable al usuario o usamos datos locales de respaldo (si existen) para que la estructura de la página no se rompa, aunque no se muestren los productos actualizados.

### 13. ¿Su aplicación es Responsive?
**Respuesta:**
Sí, utilizamos **Media Queries** en CSS (`@media`) para adaptar el diseño a móviles, tablets y escritorio.
*   Ajustamos el número de columnas en los Grids.
*   Cambiamos tamaños de fuente y paddings.
*   El menú de navegación se adapta a una versión móvil.

### 14. ¿Qué es esa página de "Matrix"?
**Respuesta:**
Es un "Easter Egg" (huevo de pascua) o funcionalidad oculta que agregamos para demostrar habilidades de manipulación del **Canvas de HTML5** y JavaScript para animaciones gráficas en tiempo real, simulando una terminal de acceso seguro para el seguimiento de órdenes.

---

## 📚 Tecnologías y Métodos Específicos

### 15. ¿Qué etiquetas HTML5 semánticas utilizaron y por qué?
**Respuesta:**
Utilizamos etiquetas semánticas para mejorar la accesibilidad y el SEO del sitio:
*   `<header>`: Para la cabecera del sitio (logo, navegación).
*   `<nav>`: Para envolver los enlaces de navegación principales.
*   `<main>`: Para el contenido principal único de cada página.
*   `<section>`: Para dividir el contenido en secciones temáticas (ej. "Quiénes somos", "Productos").
*   `<footer>`: Para el pie de página con información de contacto y enlaces legales.
*   `<article>`: Para contenido independiente como las tarjetas de productos.

### 16. ¿Qué estilos CSS avanzados implementaron?
**Respuesta:**
Además de Grid y Flexbox, utilizamos:
*   **Variables CSS (`:root`):** Para definir una paleta de colores global y facilitar el modo oscuro.
*   **Transiciones (`transition`):** Para suavizar cambios de estado (hover en botones, tarjetas).
*   **Animaciones (`@keyframes`):** Como la animación de "flotar" en la imagen del Hero o la lluvia de código en la página Matrix.
*   **Pseudo-elementos (`::before`, `::after`):** Para decoraciones visuales sin ensuciar el HTML (ej. fondos decorativos).

### 17. ¿Qué métodos de JavaScript son clave en el proyecto?
**Respuesta:**
*   `document.querySelector` / `querySelectorAll`: Para seleccionar elementos del DOM.
*   `addEventListener`: Para manejar eventos del usuario (clics, carga de página).
*   `fetch()`: Para realizar peticiones HTTP a la API.
*   `map()` / `forEach()`: Para iterar sobre arrays de productos y generar HTML dinámicamente.
*   `filter()`: Para la funcionalidad de filtrado de productos por categoría.
*   `localStorage.setItem` / `getItem`: Para persistir el carrito y el tema oscuro.
