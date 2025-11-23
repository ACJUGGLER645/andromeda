# ✅ Checklist de Despliegue - Andromeda Pet Shop

## 🎯 Resumen Rápido

Este proyecto se despliega en **DOS plataformas separadas**:
- **Railway** → Backend (Python/FastAPI + SQLite)
- **Netlify** → Frontend (HTML/CSS/JS)

---

## 📦 Railway (Backend)

### Archivos que SE DESPLIEGAN en Railway:

```
backend_python/
├── ✅ main.py              (Aplicación FastAPI)
├── ✅ database.py          (Configuración SQLAlchemy)
├── ✅ models.py            (Modelos: Product, Category, ContactMessage)
├── ✅ init_db.py           (Inicialización automática de BD)
├── ✅ requirements.txt     (fastapi, uvicorn, sqlalchemy, pydantic)
└── ✅ Procfile             (web: uvicorn main:app --host 0.0.0.0 --port $PORT)
```

### Archivos que NO se despliegan (excluidos por .gitignore):

```
backend_python/
├── ❌ andromeda.db         (Se crea automáticamente en Railway)
├── ❌ messages.json        (Datos migrados a BD)
└── ❌ __pycache__/         (Cache de Python)
```

### Configuración Especial en Railway:

- **Root Directory**: `backend_python`
- **Volumen Persistente**: `/app/backend_python` (para que andromeda.db persista)
- **Puerto**: Automático (Railway asigna $PORT)

---

## 🌐 Netlify (Frontend)

### Archivos que SE DESPLIEGAN en Netlify:

```
/ (raíz del proyecto)
├── ✅ index.html
├── ✅ tienda.html
├── ✅ contacto.html
├── ✅ sobrenosotros.html
├── ✅ netlify.toml
├── ✅ robots.txt
├── ✅ sitemap.xml
├── ✅ css/
│   ├── styles.css
│   ├── tienda.css
│   ├── contacto.css
│   ├── sobrenosotros.css
│   ├── components.css
│   ├── footer.css
│   └── header.css
├── ✅ js/
│   ├── main.js
│   ├── contact.js
│   ├── components.js
│   ├── footer.js
│   ├── header.js
│   └── tienda.js
└── ✅ assets/
    └── productos/
        └── (todas las imágenes)
```

### Archivos que NO se despliegan:

```
├── ❌ backend_python/      (Va a Railway)
├── ❌ .venv/               (Entorno virtual local)
├── ❌ .git/                (Control de versiones)
├── ❌ .DS_Store            (Archivos de sistema Mac)
└── ❌ docs/                (Documentación, opcional)
```

### Configuración Especial en Netlify:

- **Publish Directory**: `.` (raíz)
- **Frontend (Vercel)**: ✅ `vercel.json` creado, URL configurada, despliegue exitoso.
- **Build Command**: (vacío)
- **Redirects**: Configurados en `netlify.toml`

---

## 🔗 Conexión Frontend ↔ Backend

### Archivo a Modificar: `js/components.js`
 
 **ANTES del despliegue:**
 ```javascript
 return "https://andromeda-petshop-production.up.railway.app"; // Placeholder
 ```
 
 **DESPUÉS de obtener URL de Railway:**
 ```javascript
 return "https://TU-PROYECTO.up.railway.app"; // URL Real
 ```

### Archivo a Modificar: `backend_python/main.py`

**DESPUÉS de obtener URL de Netlify:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tu-sitio.netlify.app",  # ← Agregar tu URL de Netlify
        "http://localhost:8080",          # Para desarrollo local
    ],
    ...
)
```

---

## 📋 Checklist Pre-Despliegue

### Verificación de Archivos

- [ ] `backend_python/Procfile` existe
- [ ] `backend_python/requirements.txt` contiene: fastapi, uvicorn, sqlalchemy, pydantic
- [ ] `netlify.toml` existe en la raíz
- [ ] `.gitignore` excluye `*.db`, `__pycache__/`, `.venv/`
- [ ] `andromeda.db` NO está en `git status`

### Verificación de Código

- [ ] `js/components.js` tiene la URL de producción correcta
- [ ] `main.py` tiene CORS configurado
- [ ] Todos los archivos HTML tienen meta tags actualizados
- [ ] `sitemap.xml` tiene URLs correctas

### Pruebas Locales

- [ ] Backend funciona en `localhost:8000`
- [ ] Frontend funciona en `localhost:8080`
- [ ] Formulario de contacto envía datos correctamente
- [ ] Datos se guardan en `andromeda.db`
- [ ] Productos se cargan desde la BD

### Git y GitHub

- [ ] Repositorio creado en GitHub
- [ ] Todos los cambios están en commit
- [ ] Push exitoso a `main`
- [ ] No hay archivos sensibles en el repositorio

---

## 🚀 Orden de Despliegue Recomendado

1. **Primero: Railway (Backend)**
   - Desplegar backend
   - Obtener URL de Railway
   - Probar endpoints

2. **Segundo: Actualizar Frontend**
   - Actualizar `API_URL` en `js/contact.js`
   - Commit y push

3. **Tercero: Netlify (Frontend)**
   - Desplegar frontend
   - Obtener URL de Netlify

4. **Cuarto: Actualizar CORS**
   - Actualizar `allow_origins` en `main.py`
   - Commit y push (Railway redesplegará automáticamente)

5. **Quinto: Verificación Final**
   - Probar formulario de contacto en producción
   - Verificar que los datos se guarden

---

## ⚠️ Errores Comunes a Evitar

### ❌ Error 1: Subir andromeda.db a GitHub
**Solución**: Asegúrate de que esté en `.gitignore`

### ❌ Error 2: No configurar volumen en Railway
**Resultado**: Los datos se pierden al redesplegar  
**Solución**: Settings → Volumes → Mount Path: `/app/backend_python`

### ❌ Error 3: No actualizar API_URL en contact.js
**Resultado**: Formulario no funciona en producción  
**Solución**: Cambiar `localhost:8000` por URL de Railway

### ❌ Error 4: No configurar CORS
**Resultado**: Error de CORS en el navegador  
**Solución**: Agregar URL de Netlify a `allow_origins`

### ❌ Error 5: Root Directory incorrecto en Railway
**Resultado**: Railway no encuentra los archivos  
**Solución**: Settings → Root Directory → `backend_python`

---

## 📞 Soporte

Si tienes problemas, consulta:
- [docs/DEPLOYMENT_STEP_BY_STEP.md](file:///Users/alejocorreal/ProyectosAC/Andromeda/docs/DEPLOYMENT_STEP_BY_STEP.md) - Guía detallada paso a paso
- [docs/DATABASE.md](file:///Users/alejocorreal/ProyectosAC/Andromeda/docs/DATABASE.md) - Documentación de la base de datos
- Sección de Troubleshooting en la guía de despliegue
