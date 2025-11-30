import json
import os
from database import engine, SessionLocal, Base
from models import Product, Category, ContactMessage

# Initial products data
INITIAL_PRODUCTS = [
    {"id": 1, "name": "Comida Premium para Perros 4kg", "price": 89900, "image": "assets/productos/Chunky-Cordero-4kg.png", "category": ["perros"], "stock": 50},
    {"id": 2, "name": "Juguete Hueso de Goma", "price": 30900, "image": "assets/productos/hueso-goma.png", "category": ["perros"], "stock": 100},
    {"id": 3, "name": "Snacks Naturales para Perro", "price": 19900, "image": "assets/productos/snacks-perro.png", "category": ["perros"], "stock": 75},
    {"id": 4, "name": "Comida Premium para Gatos 1.5kg", "price": 68900, "image": "assets/productos/comida-gatos.png", "category": ["gatos"], "stock": 60},
    {"id": 5, "name": "Plato Doble para Gatos", "price": 28900, "image": "assets/productos/plato-doble-gatos.png", "category": ["gatos"], "stock": 80},
    {"id": 6, "name": "Juguete Pluma Interactiva", "price": 35900, "image": "assets/productos/juguete-pluma.png", "category": ["gatos"], "stock": 45},
    {"id": 7, "name": "Rascador para Gatos", "price": 59900, "image": "assets/productos/rascador-gatos.png", "category": ["gatos"], "stock": 30},
    {"id": 8, "name": "Comedero de Acero Inoxidable", "price": 25900, "image": "assets/productos/comedero-inox.png", "category": ["perros", "gatos"], "stock": 120},
    {"id": 9, "name": "Cama Acolchada para Mascotas", "price": 99900, "image": "assets/productos/cama-mascotas.png", "category": ["perros", "gatos", "general"], "stock": 25},
    {"id": 10, "name": "Jaula para Hamster Mediana", "price": 75900, "image": "assets/productos/jaula-hamster.png", "category": ["hamster"], "stock": 15},
    {"id": 11, "name": "Rueda de Ejercicio para Hamster", "price": 18900, "image": "assets/productos/rueda-hamster.png", "category": ["hamster"], "stock": 40},
    {"id": 12, "name": "Bebedero para Aves", "price": 38900, "image": "assets/productos/bebedero-aves.png", "category": ["aves"], "stock": 35},
    {"id": 13, "name": "Jaula para Aves Grande", "price": 125900, "image": "assets/productos/jaula-aves.png", "category": ["aves"], "stock": 10},
    {"id": 14, "name": "Cepillo para Pelaje Suave", "price": 27900, "image": "assets/productos/cepillo-pelaje.png", "category": ["perros", "gatos"], "stock": 90},
    {"id": 15, "name": "Shampoo Neutro para Mascotas", "price": 34900, "image": "assets/productos/shampoo-mascotas.png", "category": ["perros", "gatos", "general"], "stock": 70},
    {"id": 16, "name": "Transportadora Mediana", "price": 114900, "image": "assets/productos/transportadora.png", "category": ["perros", "gatos", "general"], "stock": 20},
    {"id": 17, "name": "Toalla Absorbente para Mascotas", "price": 23900, "image": "assets/productos/toalla-mascotas.png", "category": ["perros", "gatos", "general"], "stock": 85},
    {"id": 18, "name": "Arena Sanitaria para Gatos 10kg", "price": 47900, "image": "assets/productos/arena-gatos.png", "category": ["gatos"], "stock": 55},
    {"id": 19, "name": "Vitaminas Multiespecie", "price": 45900, "image": "assets/productos/vitaminas.png", "category": ["perros", "gatos", "aves", "hamster", "general"], "stock": 65},
    {"id": 20, "name": "Cortaúñas para Mascotas", "price": 22900, "image": "assets/productos/cortaunas.png", "category": ["perros", "gatos", "aves", "general"], "stock": 95}
]

# Categories
CATEGORIES = [
    {"name": "Perros", "slug": "perros"},
    {"name": "Gatos", "slug": "gatos"},
    {"name": "Aves", "slug": "aves"},
    {"name": "Hamster", "slug": "hamster"},
    {"name": "General", "slug": "general"}
]

def init_database():
    """Initialize database with tables and initial data"""
    print("🔧 Inicializando base de datos...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas creadas")
    
    db = SessionLocal()
    
    try:
        # Check if categories already exist
        existing_categories = db.query(Category).count()
        if existing_categories == 0:
            print("📁 Creando categorías...")
            categories_dict = {}
            for cat_data in CATEGORIES:
                category = Category(**cat_data)
                db.add(category)
                db.flush()  # Get the ID
                categories_dict[cat_data["slug"]] = category
            db.commit()
            print(f"✅ {len(CATEGORIES)} categorías creadas")
        else:
            print(f"ℹ️  Categorías ya existen ({existing_categories} encontradas)")
            # Load existing categories
            categories_dict = {cat.slug: cat for cat in db.query(Category).all()}
        
        # Check if products already exist
        existing_products = db.query(Product).count()
        if existing_products == 0:
            print("📦 Migrando productos...")
            for prod_data in INITIAL_PRODUCTS:
                # Extract categories
                category_slugs = prod_data.pop("category")
                
                # Create product
                product = Product(**prod_data)
                
                # Add categories
                for slug in category_slugs:
                    if slug in categories_dict:
                        product.categories.append(categories_dict[slug])
                
                db.add(product)
            
            db.commit()
            print(f"✅ {len(INITIAL_PRODUCTS)} productos migrados")
        else:
            print(f"ℹ️  Productos ya existen ({existing_products} encontrados)")
        
        # Migrate messages from JSON if exists
        messages_file = "messages.json"
        if os.path.exists(messages_file):
            existing_messages = db.query(ContactMessage).count()
            if existing_messages == 0:
                print("💬 Migrando mensajes desde JSON...")
                try:
                    with open(messages_file, "r") as f:
                        messages_data = json.load(f)
                    
                    for msg_data in messages_data:
                        # Remove timestamp if exists (will be auto-generated)
                        msg_data.pop("timestamp", None)
                        message = ContactMessage(**msg_data)
                        db.add(message)
                    
                    db.commit()
                    print(f"✅ {len(messages_data)} mensajes migrados")
                except json.JSONDecodeError:
                    print("⚠️  Error al leer messages.json, se omite migración")
            else:
                print(f"ℹ️  Mensajes ya existen ({existing_messages} encontrados)")
        
        print("🎉 Base de datos inicializada correctamente")
        
    except Exception as e:
        print(f"❌ Error al inicializar base de datos: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
