import sys
import os

# Add the current directory to sys.path so we can import from database and models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import ContactMessage

def view_messages():
    db = SessionLocal()
    try:
        messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
        
        print(f"\n📬 Total de mensajes recibidos: {len(messages)}")
        print("-" * 50)
        
        if not messages:
            print("No hay mensajes todavía.")
        
        for msg in messages:
            print(f"ID: {msg.id}")
            print(f"Fecha: {msg.created_at}")
            print(f"De: {msg.name} {msg.lastname} ({msg.email})")
            print(f"Mensaje: {msg.message}")
            print("-" * 50)
            
    except Exception as e:
        print(f"❌ Error al leer la base de datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    view_messages()
