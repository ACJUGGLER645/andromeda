# 🗄️ Documentación de Base de Datos - Andromeda Pet Shop

## Descripción General

Andromeda Pet Shop utiliza **SQLite** como base de datos para almacenar productos, categorías y mensajes de contacto. SQLite es una base de datos ligera, sin servidor, que almacena todos los datos en un único archivo (`andromeda.db`).

---

## 📊 Estructura de la Base de Datos

### Diagrama de Relaciones

```mermaid
erDiagram
    PRODUCTS ||--o{ PRODUCT_CATEGORIES : has
    CATEGORIES ||--o{ PRODUCT_CATEGORIES : has
    CONTACT_MESSAGES }o--|| NONE : standalone
    
    PRODUCTS {
        int id PK
        string name
        float price
        string image
        string description
        int stock
        datetime created_at
    }
    
    CATEGORIES {
        int id PK
        string name
        string slug UK
    }
    
    PRODUCT_CATEGORIES {
        int product_id FK
        int category_id FK
    }
    
    CONTACT_MESSAGES {
        int id PK
        string name
        string lastname
        string email
        string message
        datetime created_at
        boolean is_read
    }
```

---

## 📋 Tablas

### 1. `products` - Productos

Almacena información de todos los productos disponibles en la tienda.

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | INTEGER | Identificador único | PRIMARY KEY, AUTO INCREMENT |
| `name` | VARCHAR | Nombre del producto | NOT NULL |
| `price` | FLOAT | Precio en pesos colombianos | NOT NULL |
| `image` | VARCHAR | Ruta de la imagen | NOT NULL |
| `description` | VARCHAR | Descripción del producto | NULLABLE |
| `stock` | INTEGER | Cantidad en inventario | DEFAULT 0 |
| `created_at` | DATETIME | Fecha de creación | DEFAULT CURRENT_TIMESTAMP |

**Ejemplo:**
```sql
SELECT * FROM products WHERE id = 1;
```
```
id: 1
name: Comida Premium para Perros 4kg
price: 89900.0
image: assets/productos/Chunky-Cordero-4kg.png
description: NULL
stock: 50
created_at: 2025-11-23 00:05:48
```

---

### 2. `categories` - Categorías

Almacena las categorías de productos (perros, gatos, aves, etc.).

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | INTEGER | Identificador único | PRIMARY KEY, AUTO INCREMENT |
| `name` | VARCHAR | Nombre de la categoría | NOT NULL, UNIQUE |
| `slug` | VARCHAR | Identificador URL-friendly | NOT NULL, UNIQUE |

**Categorías actuales:**
- Perros (`perros`)
- Gatos (`gatos`)
- Aves (`aves`)
- Hamster (`hamster`)
- General (`general`)

**Ejemplo:**
```sql
SELECT * FROM categories;
```

---

### 3. `product_categories` - Relación Productos-Categorías

Tabla de asociación para la relación muchos-a-muchos entre productos y categorías.

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `product_id` | INTEGER | ID del producto | FOREIGN KEY → products.id, PRIMARY KEY |
| `category_id` | INTEGER | ID de la categoría | FOREIGN KEY → categories.id, PRIMARY KEY |

**Ejemplo:**
```sql
-- Obtener todas las categorías de un producto
SELECT c.name, c.slug 
FROM categories c
JOIN product_categories pc ON c.id = pc.category_id
WHERE pc.product_id = 8;
```

---

### 4. `contact_messages` - Mensajes de Contacto

Almacena todos los mensajes enviados a través del formulario de contacto.

| Columna | Tipo | Descripción | Restricciones |
|---------|------|-------------|---------------|
| `id` | INTEGER | Identificador único | PRIMARY KEY, AUTO INCREMENT |
| `name` | VARCHAR | Nombre del remitente | NOT NULL |
| `lastname` | VARCHAR | Apellido del remitente | NOT NULL |
| `email` | VARCHAR | Email del remitente | NOT NULL |
| `message` | TEXT | Contenido del mensaje | NOT NULL |
| `created_at` | DATETIME | Fecha de envío | DEFAULT CURRENT_TIMESTAMP |
| `is_read` | BOOLEAN | Mensaje leído | DEFAULT FALSE |

**Ejemplo:**
```sql
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5;
```

---

## 🔧 Comandos Útiles de SQLite

### Acceder a la Base de Datos

```bash
cd backend_python
sqlite3 andromeda.db
```

### Comandos Básicos

```sql
-- Ver todas las tablas
.tables

-- Ver estructura de una tabla
.schema products

-- Modo de visualización mejorado
.mode column
.headers on

-- Salir
.quit
```

### Consultas Comunes

#### Productos

```sql
-- Listar todos los productos
SELECT id, name, price, stock FROM products;

-- Productos por categoría
SELECT p.name, p.price 
FROM products p
JOIN product_categories pc ON p.id = pc.product_id
JOIN categories c ON pc.category_id = c.id
WHERE c.slug = 'perros';

-- Productos con bajo stock
SELECT name, stock FROM products WHERE stock < 30;

-- Actualizar stock de un producto
UPDATE products SET stock = 100 WHERE id = 1;

-- Actualizar precio
UPDATE products SET price = 95000 WHERE id = 1;
```

#### Mensajes de Contacto

```sql
-- Ver todos los mensajes (más recientes primero)
SELECT id, name, email, created_at FROM contact_messages 
ORDER BY created_at DESC;

-- Mensajes no leídos
SELECT * FROM contact_messages WHERE is_read = 0;

-- Marcar mensaje como leído
UPDATE contact_messages SET is_read = 1 WHERE id = 5;

-- Contar mensajes por día
SELECT DATE(created_at) as fecha, COUNT(*) as total 
FROM contact_messages 
GROUP BY DATE(created_at);

-- Eliminar un mensaje
DELETE FROM contact_messages WHERE id = 5;
```

#### Categorías

```sql
-- Ver todas las categorías con conteo de productos
SELECT c.name, COUNT(pc.product_id) as total_productos
FROM categories c
LEFT JOIN product_categories pc ON c.id = pc.category_id
GROUP BY c.id, c.name;
```

---

## ➕ Agregar Nuevos Productos

### Opción 1: Usando SQL Directamente

```sql
-- 1. Insertar el producto
INSERT INTO products (name, price, image, stock) 
VALUES ('Collar Antipulgas', 45900, 'assets/productos/collar-antipulgas.png', 60);

-- 2. Obtener el ID del producto recién creado
SELECT last_insert_rowid();

-- 3. Asociar con categorías (ejemplo: perros y gatos)
INSERT INTO product_categories (product_id, category_id) 
VALUES 
  (21, 1),  -- perros
  (21, 2);  -- gatos
```

### Opción 2: Usando Python Script

Crea un archivo `add_product.py`:

```python
from database import SessionLocal
from models import Product, Category

db = SessionLocal()

# Crear producto
new_product = Product(
    name="Collar Antipulgas",
    price=45900,
    image="assets/productos/collar-antipulgas.png",
    stock=60
)

# Agregar categorías
perros = db.query(Category).filter(Category.slug == "perros").first()
gatos = db.query(Category).filter(Category.slug == "gatos").first()

new_product.categories.extend([perros, gatos])

# Guardar
db.add(new_product)
db.commit()
print(f"✅ Producto '{new_product.name}' agregado con ID: {new_product.id}")

db.close()
```

Ejecutar:
```bash
python3 add_product.py
```

---

## 🔄 Backup y Restauración

### Crear Backup

```bash
# Backup simple (copiar archivo)
cp andromeda.db andromeda_backup_$(date +%Y%m%d).db

# Backup con dump SQL
sqlite3 andromeda.db .dump > backup_$(date +%Y%m%d).sql
```

### Restaurar desde Backup

```bash
# Desde archivo .db
cp andromeda_backup_20251123.db andromeda.db

# Desde dump SQL
sqlite3 andromeda_new.db < backup_20251123.sql
```

---

## 🚀 Migración a PostgreSQL (Futuro)

Si en el futuro necesitas migrar a PostgreSQL para mayor escalabilidad:

### 1. Exportar Datos

```bash
# Exportar a CSV
sqlite3 andromeda.db <<EOF
.headers on
.mode csv
.output products.csv
SELECT * FROM products;
.output categories.csv
SELECT * FROM categories;
.output contact_messages.csv
SELECT * FROM contact_messages;
EOF
```

### 2. Actualizar `database.py`

```python
# Cambiar de:
SQLALCHEMY_DATABASE_URL = "sqlite:///./andromeda.db"

# A:
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/andromeda"
```

### 3. Importar Datos a PostgreSQL

Usar herramientas como `pgloader` o scripts personalizados.

---

## 📈 Optimización

### Índices Recomendados

```sql
-- Índice para búsquedas por email
CREATE INDEX idx_messages_email ON contact_messages(email);

-- Índice para filtrar mensajes no leídos
CREATE INDEX idx_messages_read ON contact_messages(is_read);

-- Índice para búsquedas de productos por nombre
CREATE INDEX idx_products_name ON products(name);
```

### Mantenimiento

```sql
-- Analizar base de datos para optimizar queries
ANALYZE;

-- Compactar base de datos (recuperar espacio)
VACUUM;
```

---

## 🔒 Seguridad

> [!WARNING]
> **Importante:** El archivo `andromeda.db` contiene todos los datos. Asegúrate de:
> - Incluirlo en `.gitignore` para no subirlo a GitHub
> - Hacer backups regulares
> - En Railway, configurar volumen persistente

### Agregar a `.gitignore`

```bash
echo "backend_python/andromeda.db" >> .gitignore
```

---

## 🐛 Troubleshooting

### Problema: "Database is locked"

**Causa:** Múltiples procesos intentando escribir simultáneamente.

**Solución:**
```python
# En database.py, agregar timeout
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False, "timeout": 30}
)
```

### Problema: Tabla no existe

**Solución:**
```bash
# Reinicializar base de datos
python3 init_db.py
```

### Problema: Datos corruptos

**Solución:**
```bash
# Verificar integridad
sqlite3 andromeda.db "PRAGMA integrity_check;"

# Si hay errores, restaurar desde backup
cp andromeda_backup.db andromeda.db
```

---

## 📞 Soporte

Para más información sobre SQLite:
- [Documentación oficial de SQLite](https://www.sqlite.org/docs.html)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Tutorial de SQLite](https://www.sqlitetutorial.net/)
