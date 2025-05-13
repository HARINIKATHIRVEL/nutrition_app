import sqlite3
import os

def init_db():
    # Absolute path to avoid file creation issues
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "nutrition.db")
    
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories REAL,
        protein REAL,
        fat REAL,
        carbs REAL,
        vitamin_a REAL,
        vitamin_c REAL,
        iron REAL
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS intake (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        food_id INTEGER,
        quantity REAL,
        date TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (food_id) REFERENCES foods(id)
    )''')
    
    sample_foods = [
        ('Chicken Breast', 165, 31, 3.6, 0, 0.01, 0, 0.7),
        ('Broccoli', 35, 2.8, 0.4, 7, 0.623, 89.2, 0.7),
        ('Rice', 130,
