from database import SessionLocal
from models import ContactMessage, Product

def view_data():
    db = SessionLocal()
    try:
        print("\n=== MENSAJES DE CONTACTO ===")
        messages = db.query(ContactMessage).all()
        if not messages:
            print("No hay mensajes.")
        else:
            for msg in messages:
                print(f"ID: {msg.id} | De: {msg.name} {msg.lastname} ({msg.email})")
                print(f"Mensaje: {msg.message}")
                print("-" * 30)

        print("\n=== PRODUCTOS ===")
        products = db.query(Product).count()
        print(f"Total de productos en base de datos: {products}")
        
    finally:
        db.close()

if __name__ == "__main__":
    view_data()
