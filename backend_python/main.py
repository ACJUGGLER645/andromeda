from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

# Import database and models
from database import get_db, engine, Base
from models import Product, Category, ContactMessage
from init_db import init_database

# Lifespan context manager for startup/shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database
    print("🚀 Iniciando aplicación...")
    init_database()
    yield
    # Shutdown: cleanup if needed
    print("👋 Cerrando aplicación...")

app = FastAPI(lifespan=lifespan)

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar el dominio exacto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API de Andromeda Pet Shop funcionando 🚀 (Python/FastAPI + SQLite)"}

@app.get("/api/products")
def get_products(category: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all products, optionally filtered by category"""
    query = db.query(Product)
    
    if category:
        # Filter by category slug
        query = query.join(Product.categories).filter(Category.slug == category)
    
    products = query.all()
    return [product.to_dict() for product in products]

@app.get("/api/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a specific product by ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product.to_dict()

@app.get("/api/categories")
def get_categories(db: Session = Depends(get_db)):
    """Get all categories"""
    categories = db.query(Category).all()
    return [category.to_dict() for category in categories]

class ContactMessageCreate(BaseModel):
    name: str
    lastname: str
    email: str
    message: str

@app.post("/api/contact")
def submit_contact(contact: ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact message"""
    # Create new message
    new_message = ContactMessage(
        name=contact.name,
        lastname=contact.lastname,
        email=contact.email,
        message=contact.message
    )
    
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    print(f"💬 Nuevo mensaje guardado de {contact.name} {contact.lastname} ({contact.email})")
    
    return {
        "status": "success", 
        "message": "Mensaje recibido y guardado",
        "id": new_message.id
    }

@app.get("/api/messages")
def get_messages(db: Session = Depends(get_db)):
    """Get all contact messages (for admin purposes)"""
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    return [message.to_dict() for message in messages]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
