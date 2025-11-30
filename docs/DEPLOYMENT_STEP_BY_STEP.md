# 🚀 Guía de Despliegue Paso a Paso - Andromeda Pet Shop

Esta guía te llevará paso a paso por el proceso completo de despliegue del proyecto Andromeda Pet Shop, desde la preparación hasta la verificación final.

---

## ⏱️ Tiempo Estimado

- **Preparación:** 10-15 minutos
- **Backend (Railway):** 15-20 minutos
- **Frontend (Netlify):** 10-15 minutos
- **Configuración y Verificación:** 15-20 minutos
- **Total:** ~50-70 minutos

---

## 📋 Índice Rápido

1. [Preparación Inicial](#1️⃣-preparación-inicial)
2. [Despliegue del Backend](#2️⃣-despliegue-del-backend-fastapi)
3. [Despliegue del Frontend](#3️⃣-despliegue-del-frontend)
4. [Conexión y Configuración](#4️⃣-conexión-frontend-backend)
5. [Verificación Final](#5️⃣-verificación-final)
6. [Troubleshooting](#6️⃣-troubleshooting)

---

## 🏗️ Arquitectura de Despliegue

Andromeda Pet Shop se despliega en **dos plataformas separadas**:

### Railway (Backend) 🚂
**Qué se despliega:** Solo la carpeta `backend_python/`

**Archivos necesarios en Railway:**
```
backend_python/
├── main.py              ✅ Aplicación FastAPI
├── database.py          ✅ Configuración de BD
├── models.py            ✅ Modelos SQLAlchemy
├── init_db.py           ✅ Inicialización de BD
├── requirements.txt     ✅ Dependencias Python
└── Procfile             ✅ Comando de inicio
```

**Archivos que NO se suben:**
- ❌ `andromeda.db` (se crea automáticamente en Railway)
- ❌ `messages.json` (datos migrados a BD)
- ❌ `__pycache__/` (cache de Python)

**Configuración especial:**
- Root Directory: `backend_python`
- Volumen persistente: `/app/backend_python` (para la BD)

---

### Netlify (Frontend) 🌐
**Qué se despliega:** Todo el proyecto EXCEPTO `backend_python/`

**Archivos necesarios en Netlify:**
```
/ (raíz del proyecto)
├── index.html           ✅ Página principal
├── tienda.html          ✅ Página de tienda
├── contacto.html        ✅ Página de contacto
├── sobrenosotros.html   ✅ Página sobre nosotros
├── matrix.html          ✅ Página oculta (Matrix)
├── netlify.toml         ✅ Configuración de Netlify
├── robots.txt           ✅ SEO
├── sitemap.xml          ✅ SEO
├── css/                 ✅ Estilos
│   ├── styles.css
│   ├── tienda.css
│   ├── contacto.css
│   └── ...
├── js/                  ✅ JavaScript
│   ├── main.js
│   ├── contact.js
│   ├── components.js
│   └── ...
└── assets/              ✅ Imágenes
    └── productos/
```

**Archivos que NO se suben:**
- ❌ `backend_python/` (va a Railway)
- ❌ `.venv/` (entorno virtual local)
- ❌ `.git/` (control de versiones)
- ❌ `.DS_Store` (archivos de sistema)

**Configuración especial:**
- Publish directory: `.` (raíz)
- Build command: (vacío)

---

### 📊 Flujo de Comunicación

```
Usuario → Netlify (Frontend) → Railway (Backend) → SQLite DB
         HTML/CSS/JS          FastAPI API         andromeda.db
```

**Ejemplo:**
1. Usuario llena formulario en `contacto.html` (Netlify)
2. JavaScript envía POST a `https://tu-backend.railway.app/api/contact`
3. FastAPI guarda en SQLite (Railway)
4. Respuesta JSON regresa al frontend
5. Popup de éxito se muestra al usuario

---

## 1️⃣ Preparación Inicial

### Paso 1.1: Verificar Archivos del Proyecto

Antes de comenzar, asegúrate de tener todos los archivos necesarios:

```bash
cd /Users/alejocorreal/ProyectosAC/Andromeda
```

#### 📦 Archivos para Railway (Backend)

Verifica que existan en `backend_python/`:

```bash
ls -la backend_python/
```

**Checklist:**
- ✅ `main.py` - Aplicación FastAPI con endpoints
- ✅ `database.py` - Configuración SQLAlchemy
- ✅ `models.py` - Modelos de datos (Product, Category, ContactMessage)
- ✅ `init_db.py` - Script de inicialización de BD
- ✅ `requirements.txt` - Debe contener: fastapi, uvicorn, sqlalchemy, pydantic
- ✅ `Procfile` - Comando de inicio para Railway

**Verificar contenido de archivos críticos:**

```bash
# Verificar requirements.txt
cat backend_python/requirements.txt
# Debe mostrar:
# fastapi
# uvicorn
# sqlalchemy
# pydantic

# Verificar Procfile
cat backend_python/Procfile
# Debe mostrar:
# web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

#### 🌐 Archivos para Netlify (Frontend)

Verifica que existan en la raíz del proyecto:

```bash
ls -la
```

**Checklist:**
- ✅ `index.html` - Página principal
- ✅ `tienda.html` - Página de tienda
- ✅ `contacto.html` - Página de contacto
- ✅ `sobrenosotros.html` - Página sobre nosotros
- ✅ `matrix.html` - Página oculta (Matrix)
- ✅ `netlify.toml` - Configuración de Netlify
- ✅ `robots.txt` - SEO
- ✅ `sitemap.xml` - SEO
- ✅ `css/` - Carpeta con estilos (7 archivos)
- ✅ `js/` - Carpeta con JavaScript (6 archivos)
- ✅ `assets/` - Carpeta con imágenes

**Verificar netlify.toml:**

```bash
cat netlify.toml
# Debe mostrar:
# [build]
#   publish = "."
# 
# [[redirects]]
#   from = "/*"
#   to = "/index.html"
#   status = 200
```

---

#### 🔍 Verificación de .gitignore

**IMPORTANTE:** Asegúrate de que `.gitignore` excluya archivos innecesarios:

```bash
cat .gitignore
```

Debe contener:
```
.venv/
__pycache__/
*.pyc
.DS_Store
.env
backend_python/andromeda.db
backend_python/messages.json
*.db
*.db-journal
```

Si no existe o está incompleto, créalo/actualízalo:

```bash
cat > .gitignore << 'EOF'
.venv/
__pycache__/
*.pyc
.DS_Store
.env
backend_python/andromeda.db
backend_python/messages.json
*.db
*.db-journal
EOF
```

### Paso 1.2: Crear Repositorio en GitHub

Si aún no tienes un repositorio:
```bash
# 1. Inicializar Git (si no está inicializado)
git init

# 2. Verificar que .gitignore esté correcto (ya lo hicimos en Paso 1.1)
cat .gitignore

# 3. Verificar qué archivos se subirán (NO debe incluir .db, __pycache__, etc.)
git status

# 4. Agregar archivos
git add .

# 5. Verificar nuevamente (asegúrate que andromeda.db NO esté en la lista)
git status

# 6. Hacer commit
git commit -m "feat: Add SQLite database and complete project structure

- Implement SQLite with SQLAlchemy ORM
- Add database models (Product, Category, ContactMessage)
- Create initialization script for database
- Update API endpoints to use database
- Add deployment configurations (Procfile, netlify.toml)
- Update documentation"

# 7. Crear repositorio en GitHub
# Ve a github.com → New repository → Nombre: andromeda-petshop
# NO inicialices con README, .gitignore o license (ya los tienes)

# 8. Conectar repositorio local con GitHub
git remote add origin https://github.com/TU-USUARIO/andromeda-petshop.git
git branch -M main
git push -u origin main
```

> **⚠️ VERIFICACIÓN CRÍTICA:** Antes de hacer push, asegúrate de que `andromeda.db` NO esté en `git status`. Si aparece, agrégalo a `.gitignore` y ejecuta `git rm --cached backend_python/andromeda.db`.

---

### Paso 1.3: Probar Localmente (Recomendado)

Antes de desplegar, es **altamente recomendable** probar todo localmente:

#### Backend (FastAPI + SQLite)

```bash
cd backend_python

# Instalar dependencias
python3 -m pip install -r requirements.txt

# Inicializar base de datos
python3 init_db.py
```

**Salida esperada:**
```
🔧 Inicializando base de datos...
✅ Tablas creadas
📁 Creando categorías...
✅ 5 categorías creadas
📦 Migrando productos...
✅ 20 productos migrados
💬 Migrando mensajes desde JSON...
✅ 4 mensajes migrados (si existen)
🎉 Base de datos inicializada correctamente
```

**Iniciar servidor:**
```bash
python3 main.py
```

**Verificar endpoints:**
```bash
# En otra terminal
curl http://localhost:8000/
curl http://localhost:8000/api/products
curl http://localhost:8000/api/categories
```

#### Frontend (HTML/CSS/JS)

```bash
# En la raíz del proyecto
cd ..
python3 -m http.server 8080
```

**Probar en navegador:**
1. Abre `http://localhost:8080`
2. Navega a Contacto
3. Envía un mensaje de prueba
4. Verifica que aparezca el popup de éxito

**Verificar en base de datos:**
```bash
cd backend_python
sqlite3 andromeda.db "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 1;"
```

> **✅ Checkpoint:** Si todo funciona localmente, estás listo para desplegar.

> **⚠️ Importante:** NO subas `andromeda.db` a GitHub. Asegúrate de que esté en `.gitignore`.

---

## 2️⃣ Despliegue del Backend (FastAPI)

### Opción Recomendada: Railway

> **📦 Recordatorio:** Railway solo desplegará la carpeta `backend_python/` gracias a la configuración de Root Directory que haremos en el Paso 2.5.

#### Paso 2.1: Verificar Archivos de Despliegue

Antes de continuar, verifica que estos archivos existan:

```bash
# Verificar Procfile
cat backend_python/Procfile
# Debe mostrar: web: uvicorn main:app --host 0.0.0.0 --port $PORT

# Verificar requirements.txt
cat backend_python/requirements.txt
# Debe contener: fastapi, uvicorn, sqlalchemy, pydantic
```

> **✅ Importante:** Si seguiste el Paso 1.1 correctamente, estos archivos ya existen y están en tu repositorio de GitHub.

---

#### Paso 2.2: Registrarse en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en **"Login"** o **"Start a New Project"**
3. Selecciona **"Login With GitHub"**
4. Autoriza Railway para acceder a tus repositorios

#### Paso 2.3: Crear Nuevo Proyecto

1. En el dashboard de Railway, click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona tu repositorio **"andromeda-petshop"**
4. Railway comenzará a detectar tu proyecto

#### Paso 2.4: Configurar el Proyecto

1. **Configurar Root Directory:**
   - Click en tu servicio (aparecerá como "andromeda-petshop")
   - Ve a **Settings** (⚙️)
   - Busca **"Root Directory"**
   - Escribe: `backend_python`
   - Click en **"Save"**

2. **Configurar Volumen para Base de Datos:**
   - En la misma página de Settings
   - Ve a **"Volumes"**
   - Click en **"New Volume"**
   - Mount Path: `/app/backend_python`
   - Click en **"Add"**
   
   > **💡 Importante:** Esto asegura que `andromeda.db` persista entre redespliegues.

3. **Verificar Variables de Entorno (opcional):**
   - En la misma página de Settings
   - Ve a **"Variables"**
   - Agrega si necesitas: `ENVIRONMENT=production`

4. **Esperar el Despliegue:**
   - Railway comenzará a construir tu aplicación
   - Verás logs en tiempo real
   - La base de datos se inicializará automáticamente en el primer despliegue
   - Espera a que aparezca ✅ **"Success"**

#### Paso 2.5: Obtener la URL del Backend

1. En el dashboard de tu proyecto
2. Click en tu servicio
3. Ve a **"Settings"**
4. Busca **"Domains"**
5. Click en **"Generate Domain"**
6. Copia la URL generada (ejemplo: `https://andromeda-backend-production.up.railway.app`)

**⚠️ IMPORTANTE:** Guarda esta URL, la necesitarás para el frontend.

#### Paso 2.6: Verificar que el Backend Funciona

Abre tu navegador y ve a:
```
https://TU-URL-RAILWAY.railway.app/
```

Deberías ver:
```json
{"message":"API de Andromeda Pet Shop funcionando 🚀 (Python/FastAPI + SQLite)"}
```

También prueba:
```
https://TU-URL-RAILWAY.railway.app/api/products
```

Deberías ver la lista de productos en JSON.

> **✅ Checkpoint:** Si ves los datos correctamente, tu backend está funcionando perfectamente. Guarda la URL para el siguiente paso.

---

## 3️⃣ Despliegue del Frontend

### Opción Recomendada: Netlify

#### Paso 3.1: Actualizar URL del Backend (¡Solo un archivo!)
 
 Gracias a la configuración dinámica que hemos implementado, solo necesitas actualizar un archivo.
 
 1. Abre `js/components.js`
 2. Ve al final del archivo y busca la función `window.getApiUrl`.
 3. Reemplaza la URL de producción con la que obtuviste en Railway:
 
    ```javascript
    // js/components.js
    window.getApiUrl = function() {
      const hostname = window.location.hostname;
    
      // Si hostname es localhost, 127.0.0.1 o vacío (file://), usar backend local
      if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "") {
        return "http://localhost:8000";
      } else {
        // 👇 PEGA TU URL DE RAILWAY AQUÍ
        return "https://TU-URL-RAILWAY.railway.app"; 
      }
    };
    ```
 
 4. Guarda y haz commit:
    ```bash
    git add js/components.js
    git commit -m "Update production API URL"
    git push origin main
    ```
 
 > **✨ Magia:** Esto actualizará automáticamente la conexión en `index.html`, `tienda.html` y `contacto.html`. ¡No necesitas editar nada más!

#### Paso 3.2: Actualizar URLs en Meta Tags SEO

**IMPORTANTE:** Actualiza las URLs en los meta tags de todas las páginas HTML.

En cada archivo (`index.html`, `tienda.html`, `contacto.html`, `sobrenosotros.html`), busca y reemplaza:

```html
<!-- ANTES -->
<link rel="canonical" href="https://andromeda-petshop.com/" />
<meta property="og:url" content="https://andromeda-petshop.com/" />

<!-- DESPUÉS (usa tu dominio de Netlify o personalizado) -->
<link rel="canonical" href="https://TU-SITIO.netlify.app/" />
<meta property="og:url" content="https://TU-SITIO.netlify.app/" />
```

> **Nota:** Puedes hacer esto después de obtener tu URL de Netlify.

#### Paso 3.3: Crear Archivo de Configuración de Netlify

Crea `netlify.toml` en la raíz del proyecto:

```bash
cat > netlify.toml << 'EOF'
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
```

Haz commit:
```bash
git add netlify.toml
git commit -m "Add Netlify configuration"
git push origin main
```

#### Paso 3.4: Registrarse en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Click en **"Sign up"**
3. Selecciona **"GitHub"**
4. Autoriza Netlify

#### Paso 3.5: Importar Proyecto

1. En el dashboard de Netlify, click en **"Add new site"**
2. Selecciona **"Import an existing project"**
3. Click en **"Deploy with GitHub"**
4. Busca y selecciona tu repositorio **"andromeda-petshop"**
### Opción Alternativa: Vercel 🌐

#### Paso 3.1: Configurar proyecto en Vercel

1. Ve a https://vercel.com y crea una cuenta o inicia sesión.
2. Haz click en **New Project**.
3. Conecta tu repositorio de GitHub y selecciona **andromeda-petshop**.
4. En **Root Directory** escribe `.` (la raíz del proyecto).
5. En **Framework Preset** elige **Other → Static Site**.
6. Deja los campos de **Build Command** y **Output Directory** vacíos.
7. Haz click en **Deploy**.

#### Paso 3.2: Configurar rewrites (vercel.json)

Vercel necesita redirigir todas las rutas a `index.html` para que el router del SPA funcione. Crea o actualiza el archivo `vercel.json` en la raíz del proyecto con:

```json
{
  "version": 2,
  "name": "andromeda-petshop",
  "public": ".",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> **⚠️ Importante:** Este archivo ya fue creado previamente; verifica que su contenido coincida.

#### Paso 3.3: Actualizar URL del Backend en el Frontend
 
 1. Abre `js/components.js`.
 2. Ve al final del archivo y busca la función `window.getApiUrl`.
 3. Reemplaza la URL de producción con la URL del backend en Railway (obtenida en el paso 2.5).
 
 ```javascript
 // js/components.js
 window.getApiUrl = function() {
   const hostname = window.location.hostname;
 
   // Si hostname es localhost, 127.0.0.1 o vacío (file://), usar backend local
   if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "") {
     return "http://localhost:8000";
   } else {
     // 👇 PEGA TU URL DE RAILWAY AQUÍ
     return "https://TU-URL-RAILWAY.railway.app"; 
   }
 };
 ```
 
 4. Guarda y haz commit:
 
 ```bash
 git add js/components.js
 git commit -m "Update API_URL for Vercel deployment"
 ```

#### Paso 3.4: Deploy en Vercel

Vercel detectará automáticamente los cambios y redeployará. Una vez completado, visita la URL proporcionada (ejemplo: `https://andromeda-petshop.vercel.app`).

#### Paso 3.5: Verificación Final

- Abre la URL de Vercel en el navegador.
- Navega a la sección de Contacto y envía un mensaje.
- Verifica en Railway que el mensaje se haya guardado en la base de datos.
- Si todo funciona, el despliegue está completo.

---

#### Paso 3.6: Configurar el Despliegue

En la página de configuración:

1. **Site name:** `andromeda-petshop` (o el nombre que prefieras)
2. **Branch to deploy:** `main`
3. **Build command:** (dejar vacío)
4. **Publish directory:** `.` (punto)
5. Click en **"Deploy site"**

#### Paso 3.7: Esperar el Despliegue

- Netlify comenzará a desplegar tu sitio
- Verás el progreso en tiempo real
- Espera a que aparezca **"Published"** con un ✅

#### Paso 3.8: Obtener la URL del Frontend

1. En el dashboard de tu sitio
2. Verás la URL en la parte superior (ejemplo: `https://andromeda-petshop.netlify.app`)
3. Click en la URL para abrir tu sitio

> **⚠️ Nota:** Es normal que el formulario de contacto aún no funcione. Lo configuraremos en el siguiente paso.

---

## 4️⃣ Conexión Frontend-Backend

### Paso 4.1: Configurar CORS en el Backend

Ahora que tienes la URL de tu frontend, debes configurar CORS:

1. Abre `backend_python/main.py`
2. Busca la sección de CORS (líneas 7-14)
3. Actualiza `allow_origins`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://TU-SITIO.netlify.app",  # ← Cambia esto
        "http://localhost:8080",  # Para desarrollo local
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

4. Guarda, haz commit y push:
```bash
git add backend_python/main.py
git commit -m "Configure CORS for production"
git push origin main
```

5. **Railway redesplegará automáticamente** tu backend con los nuevos cambios.

### Paso 4.2: Actualizar Meta Tags con URL Real

Ahora que tienes tu URL de Netlify, actualiza los meta tags:

**En `index.html`:**
```html
<link rel="canonical" href="https://andromeda-petshop.netlify.app/" />
<meta property="og:url" content="https://andromeda-petshop.netlify.app/" />
<meta property="og:image" content="https://andromeda-petshop.netlify.app/assets/hero-pets.png" />
```

**En `tienda.html`:**
```html
<link rel="canonical" href="https://andromeda-petshop.netlify.app/tienda.html" />
<meta property="og:url" content="https://andromeda-petshop.netlify.app/tienda.html" />
```

**En `contacto.html`:**
```html
<link rel="canonical" href="https://andromeda-petshop.netlify.app/contacto.html" />
<meta property="og:url" content="https://andromeda-petshop.netlify.app/contacto.html" />
```

**En `sobrenosotros.html`:**
```html
<link rel="canonical" href="https://andromeda-petshop.netlify.app/sobrenosotros.html" />
<meta property="og:url" content="https://andromeda-petshop.netlify.app/sobrenosotros.html" />
```

Guarda y despliega:
```bash
git add index.html tienda.html contacto.html sobrenosotros.html
git commit -m "Update meta tags with production URLs"
git push origin main
```

Netlify redesplegará automáticamente.

### Paso 4.3: Actualizar Sitemap

Abre `sitemap.xml` y reemplaza todas las URLs:

```xml
<!-- ANTES -->
<loc>https://andromeda-petshop.com/</loc>

<!-- DESPUÉS -->
<loc>https://andromeda-petshop.netlify.app/</loc>
```

Haz esto para todas las URLs en el sitemap.

```bash
git add sitemap.xml
git commit -m "Update sitemap with production URLs"
git push origin main
```

> **✅ Checkpoint:** Ahora tu frontend y backend están completamente conectados y configurados para producción.

---

## 5️⃣ Verificación Final

### Paso 5.1: Probar el Frontend

1. Abre tu sitio: `https://TU-SITIO.netlify.app`
2. Verifica que todas las páginas carguen:
   - ✅ Página principal
   - ✅ Tienda
   - ✅ Contacto
   - ✅ Sobre nosotros

3. Verifica que los estilos se vean correctamente
4. Verifica que las imágenes carguen

### Paso 5.2: Probar el Formulario de Contacto

1. Ve a la página de **Contacto**
2. Llena el formulario con datos de prueba:
   - Nombre: Test
   - Apellido: Usuario
   - Email: test@example.com
   - Mensaje: Probando formulario

3. Click en **"Enviar mensaje"**
4. Deberías ver el popup de éxito ✅

### Paso 5.3: Verificar que el Mensaje se Guardó

1. Ve a Railway
2. Abre tu proyecto
3. Click en tu servicio
4. Ve a **"Deployments"** → **"View Logs"**
5. Deberías ver un mensaje como:
   ```
   Nuevo mensaje guardado de Test (test@example.com)
   ```

### Paso 5.4: Verificar SEO

1. **Facebook Sharing Debugger:**
   - Ve a: https://developers.facebook.com/tools/debug/
   - Pega tu URL: `https://TU-SITIO.netlify.app`
   - Click en **"Debug"**
   - Verifica que aparezcan título, descripción e imagen

2. **Twitter Card Validator:**
   - Ve a: https://cards-dev.twitter.com/validator
   - Pega tu URL
   - Verifica la vista previa

3. **Google Rich Results Test:**
   - Ve a: https://search.google.com/test/rich-results
   - Pega tu URL
   - Verifica que detecte el structured data

### Paso 5.5: Probar Nuevas Funcionalidades
 
 1. **Modo Matrix:**
    - Ve al footer de la página.
    - Haz click en el enlace "Orden de seguimiento".
    - Verifica que se abra la página `matrix.html` con la animación de lluvia de código.
    - Haz click en el botón "Access Mainframe" para volver al inicio.
 
 2. **SEO Optimizado:**
    - Haz click derecho en cualquier página -> "Ver código fuente".
    - Verifica que existan las etiquetas `<meta name="description">` y `<meta name="keywords">`.
    - Verifica las etiquetas Open Graph (`og:title`, `og:description`, `og:image`).
 
 ### Paso 5.6: Probar en Dispositivos Móviles
 
 1. Abre tu sitio en un móvil
 2. Verifica que el diseño responsive funcione
 3. Prueba el menú hamburguesa
 4. Prueba el formulario de contacto

> **🎉 ¡Excelente!** Si todo funciona correctamente, tu sitio está listo para producción.

---

## 6️⃣ Troubleshooting

### Problema 1: "CORS Error" en el Formulario

**Síntoma:** Al enviar el formulario, aparece un error de CORS en la consola.

**Solución:**
1. Verifica que la URL del frontend esté en `allow_origins` en `main.py`
2. Asegúrate de que Railway haya redesplegado después del cambio
3. Limpia la caché del navegador (Ctrl+Shift+R)

### Problema 2: Backend No Responde

**Síntoma:** El formulario no envía datos o aparece error de red.

**Solución:**
1. Verifica que el backend esté corriendo:
   ```
   https://TU-URL-RAILWAY.railway.app/
   ```
2. Revisa los logs en Railway:
   - Dashboard → Tu servicio → Deployments → View Logs
3. Verifica que la URL en `js/contact.js` sea correcta

### Problema 3: Imágenes No Cargan

**Síntoma:** Las imágenes aparecen rotas (🖼️❌).

**Solución:**
1. Verifica que la carpeta `assets/` esté en el repositorio
2. Verifica las rutas en HTML (deben ser relativas: `assets/imagen.png`)
3. Asegúrate de que las imágenes estén en el commit:
   ```bash
   git add assets/
   git commit -m "Add assets folder"
   git push origin main
   ```

### Problema 4: Estilos CSS No Se Aplican

**Síntoma:** El sitio se ve sin estilos.

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Recarga la página
4. Verifica que los archivos CSS se carguen (status 200)
5. Si aparecen 404, verifica las rutas en HTML

### Problema 5: "Module Not Found" en Railway

**Síntoma:** Railway muestra error al desplegar.

**Solución:**
1. Verifica que `requirements.txt` esté en `backend_python/`
2. Verifica que contenga todas las dependencias:
   ```txt
   fastapi
   uvicorn
   sqlalchemy
   pydantic
   ```
3. Haz push de los cambios:
   ```bash
   git add backend_python/requirements.txt
   git commit -m "Update requirements"
   git push origin main
   ```

### Problema 7: Base de Datos No Persiste

**Síntoma:** Los mensajes de contacto desaparecen después de redesplegar.

**Solución:**
1. Verifica que configuraste el volumen en Railway:
   - Settings → Volumes → Debe existir un volumen montado en `/app/backend_python`
2. Si no existe, créalo:
   - New Volume → Mount Path: `/app/backend_python`
3. Redespliega el proyecto

### Problema 8: Error "Database is Locked"

**Síntoma:** Errores al guardar mensajes de contacto.

**Solución:**
1. Esto es normal con SQLite bajo alta concurrencia
2. Para producción con mucho tráfico, considera migrar a PostgreSQL
3. Ver documentación en `docs/DATABASE.md`

### Problema 6: Sitemap No Funciona

**Síntoma:** Google Search Console no encuentra el sitemap.

**Solución:**
1. Verifica que `sitemap.xml` esté en la raíz del proyecto
2. Accede directamente: `https://TU-SITIO.netlify.app/sitemap.xml`
3. Verifica que las URLs sean correctas
4. En Google Search Console, envía el sitemap:
   ```
   https://TU-SITIO.netlify.app/sitemap.xml
   ```

---

## 📊 Checklist Final de Despliegue

Usa esta lista para asegurarte de que todo esté configurado:

### Backend (Railway)
- [ ] `Procfile` creado en `backend_python/`
- [ ] `requirements.txt` actualizado con SQLAlchemy
- [ ] Volumen configurado en Railway para persistencia
- [ ] Proyecto desplegado en Railway
- [ ] Base de datos inicializada automáticamente
- [ ] URL del backend obtenida y guardada
- [ ] CORS configurado con URL del frontend
- [ ] Endpoint `/` responde correctamente
- [ ] Endpoint `/api/products` responde correctamente
- [ ] Endpoint `/api/categories` responde correctamente

### Frontend (Netlify)
- [ ] `netlify.toml` creado en la raíz
- [ ] URL del backend actualizada en `js/contact.js`
- [ ] Meta tags actualizados con URL de producción
- [ ] Sitemap actualizado con URL de producción
- [ ] Sitio desplegado en Netlify
- [ ] Todas las páginas cargan correctamente
- [ ] Imágenes se ven correctamente
- [ ] Estilos CSS se aplican correctamente

### Funcionalidad
- [ ] Formulario de contacto funciona
- [ ] Mensajes se guardan en el backend
- [ ] Popup de éxito aparece
- [ ] Navegación entre páginas funciona
- [ ] Menú hamburguesa funciona en móvil
- [ ] Diseño responsive se ve bien

### SEO
- [ ] Meta tags verificados en Facebook Debugger
- [ ] Twitter Cards verificadas
- [ ] Structured data verificado en Google Rich Results
- [ ] Sitemap accesible
- [ ] robots.txt accesible

---

## 🎯 Próximos Pasos

Después del despliegue exitoso:

### 1. Configurar Dominio Personalizado (Opcional)

**En Netlify:**
1. Ve a Site settings → Domain management
2. Click en "Add custom domain"
3. Sigue las instrucciones para configurar DNS

**En Railway:**
1. Ve a Settings → Domains
2. Click en "Custom Domain"
3. Agrega tu dominio

### 2. Configurar Google Search Console

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad
3. Verifica la propiedad
4. Envía el sitemap: `https://TU-SITIO.netlify.app/sitemap.xml`

### 3. Configurar Google Analytics

1. Crea una cuenta en [analytics.google.com](https://analytics.google.com)
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Agrega el código a todas las páginas HTML (antes de `</head>`):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. Monitorear el Sitio

- **Railway:** Revisa logs regularmente
- **Netlify:** Monitorea analytics
- **Google Search Console:** Revisa errores de rastreo
- **PageSpeed Insights:** Verifica performance

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa los logs:**
   - Railway: Dashboard → Deployments → View Logs
   - Netlify: Deploys → Deploy log

2. **Consulta la documentación:**
   - [Railway Docs](https://docs.railway.app/)
   - [Netlify Docs](https://docs.netlify.com/)
   - [FastAPI Docs](https://fastapi.tiangolo.com/)

3. **Busca en la comunidad:**
   - [Railway Discord](https://discord.gg/railway)
   - [Netlify Community](https://answers.netlify.com/)
   - [Stack Overflow](https://stackoverflow.com/)

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, ¡has desplegado exitosamente Andromeda Pet Shop! 🚀🐾

**URLs de tu proyecto:**
- Frontend: `https://TU-SITIO.netlify.app`
- Backend: `https://TU-BACKEND.railway.app`

¡Ahora tu tienda de mascotas está en línea y lista para recibir visitantes! 🎊
