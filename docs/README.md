# 🐾 Andromeda Pet Shop

![Andromeda Pet Shop](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Andromeda Pet Shop** es una tienda en línea moderna y completa dedicada a productos para mascotas. Ofrece una experiencia de usuario intuitiva y atractiva, con un catálogo diverso de productos para perros, gatos, aves, hamsters y más.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Despliegue](#-despliegue)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## ✨ Características

### Frontend
- 🎨 **Diseño Moderno y Responsive**: Interfaz optimizada para desktop, tablet y móvil
- 🛒 **Carrito de Compras**: Sistema completo de carrito con contador y gestión de productos
- 🔍 **Filtrado por Categorías**: Navegación intuitiva por tipo de mascota
- 📱 **Menú Hamburguesa**: Navegación móvil fluida y accesible
- 💬 **Formulario de Contacto**: Sistema de contacto con validación y feedback visual
- ✅ **Popup Personalizado**: Confirmación elegante al enviar mensajes

### Backend
- 🚀 **API REST con FastAPI**: Backend moderno y eficiente en Python
- 📦 **Gestión de Productos**: Endpoints para consultar productos y filtrar por categoría
- 💾 **Persistencia de Mensajes**: Almacenamiento de mensajes de contacto en JSON
- 🔒 **CORS Configurado**: Listo para integración con frontend
- ⚡ **Alto Rendimiento**: FastAPI ofrece velocidad comparable a Node.js

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript (Vanilla)**: Lógica del cliente sin dependencias
- **Google Fonts (Poppins)**: Tipografía moderna y legible

### Backend
- **Python 3.8+**: Lenguaje de programación principal
- **FastAPI**: Framework web moderno y rápido
- **Uvicorn**: Servidor ASGI de alto rendimiento
- **Pydantic**: Validación de datos
- **JSON**: Almacenamiento de datos

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **VS Code**: Editor recomendado

---

## 📁 Estructura del Proyecto

```
Andromeda/
├── assets/                    # Imágenes y recursos
│   ├── categories/           # Iconos de categorías
│   └── productos/            # Imágenes de productos
├── backend_python/           # Backend FastAPI
│   ├── main.py              # Aplicación principal
│   ├── messages.json        # Mensajes de contacto
│   └── requirements.txt     # Dependencias Python
├── css/                      # Hojas de estilo
│   ├── navbar.css           # Navegación y carrito
│   ├── hero.css             # Sección hero
│   ├── products.css         # Productos
│   ├── categories.css       # Categorías
│   ├── contacto.css         # Formulario de contacto
│   ├── footer.css           # Pie de página
│   └── about.css            # Sección "Quiénes somos"
├── js/                       # Scripts JavaScript
│   ├── components.js        # Header y Footer
│   ├── data.js              # Datos de productos
│   ├── products.js          # Lógica de productos
│   ├── shop.js              # Carrito de compras
│   ├── filter.js            # Filtrado de categorías
│   └── contact.js           # Formulario de contacto
├── docs/                     # Documentación
│   ├── README.md            # Este archivo
│   └── DEPLOYMENT.md        # Guía de despliegue
├── index.html               # Página principal
├── tienda.html              # Página de tienda
├── contacto.html            # Página de contacto
└── sobrenosotros.html       # Página "Sobre nosotros"
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- **Python 3.8+** instalado
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)
- **Editor de código** (VS Code recomendado)

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Andromeda
```

### 2. Configurar el Backend

#### Crear entorno virtual (recomendado)
```bash
cd backend_python
python -m venv venv

# En macOS/Linux:
source venv/bin/activate

# En Windows:
venv\Scripts\activate
```

#### Instalar dependencias
```bash
pip install -r requirements.txt
```

#### Ejecutar el servidor
```bash
python main.py
```

El backend estará disponible en: `http://localhost:8000`

### 3. Ejecutar el Frontend

Abre el archivo `index.html` en tu navegador, o usa un servidor local:

#### Opción 1: Servidor HTTP de Python
```bash
# Desde la raíz del proyecto
python -m http.server 8080
```
Luego abre: `http://localhost:8080`

#### Opción 2: Live Server (VS Code)
1. Instala la extensión "Live Server"
2. Click derecho en `index.html` → "Open with Live Server"

---

## 🌐 Despliegue

Para desplegar el proyecto en producción, sigue nuestra guía detallada:

👉 **[DEPLOYMENT_STEP_BY_STEP.md](./DEPLOYMENT_STEP_BY_STEP.md)** 

Esta guía te llevará paso a paso por todo el proceso de despliegue, desde la preparación hasta la verificación final, asegurando que nada falle.

### Plataformas Recomendadas

**Frontend:**
- ✅ **Netlify** (recomendado) - Despliegue automático desde GitHub, SSL gratis, CDN global
- **Vercel** - Alternativa rápida con excelente performance
- **GitHub Pages** - Opción gratuita para proyectos open source

**Backend:**
- ✅ **Railway** (recomendado) - Fácil configuración con Python, plan gratuito disponible
- **Render** - Plan gratuito con auto-sleep después de inactividad
- **Heroku** - Opción clásica y confiable
- **VPS** (DigitalOcean, AWS) - Mayor control y personalización

---

## 📸 Capturas de Pantalla

### Página Principal
La página de inicio presenta un hero atractivo con llamado a la acción, productos destacados y categorías de mascotas.

### Tienda
Sistema de filtrado por categorías con visualización dinámica de productos.

### Carrito de Compras
Modal lateral con gestión completa de productos, cantidades y total.

### Formulario de Contacto
Formulario funcional con validación y popup de confirmación personalizado.

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 👥 Autores

**Andromeda Pet Shop Team**

---

## 📞 Contacto

Para preguntas o sugerencias, utiliza el formulario de contacto en la aplicación o abre un issue en GitHub.

---

## 🙏 Agradecimientos

- Iconos de categorías y productos
- Google Fonts por la tipografía Poppins
- Comunidad de FastAPI por la excelente documentación

---

**¡Gracias por usar Andromeda Pet Shop! 🐶🐱🐹🐦**
