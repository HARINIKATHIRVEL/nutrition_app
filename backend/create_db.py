import sqlite3
import os

def init_db():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "nutrition.db")
    print("📁 Creating DB at:", db_path)  # Add this line for debugging

    conn = sqlite3.connect(db_path)
import sqlite3
import os

def init_db():
    # ✅ Fix for line 5 — Use absolute path to avoid "unable to open database file"
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "nutrition.db")
    
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Create users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    # Create foods table
    c.execute('''
        CREATE TABLE IF NOT EXISTS foods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            calories REAL,
            protein REAL,
            fat REAL,
            carbs REAL,
            vitamin_a REAL,
            vitamin_c REAL,
            iron REAL
        )
    ''')

    # Create intake table
    c.execute('''
        CREATE TABLE IF NOT EXISTS intake (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            food_id INTEGER,
            quantity REAL,
            date TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (food_id) REFERENCES foods(id)
        )
    ''')

    # Insert sample food data
    sample_foods = [
        ('Chicken Breast', 165, 31, 3.6, 0, 0.01, 0, 0.7),
        ('Broccoli', 35, 2.8, 0.4, 7, 0.623, 89.2, 0.7),
        ('Rice', 130, 2.7, 0.3, 28, 0, 0, 0.2),
        ('Salmon', 208, 20, 13, 0, 0.032, 0, 0.8),
        ('Banana', 89, 1.1, 0.3, 23, 0.026, 8.7, 0.3),
    ]

    c.executemany('''
        INSERT OR IGNORE INTO foods 
        (name, calories, protein, fat, carbs, vitamin_a, vitamin_c, iron) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', sample_foods)

    conn.commit()
    conn.close()

# ✅ Fix for line 55 — make sure init_db() is called safely
if __name__ == "__main__":
    try:
        init_db()
        print("✅ nutrition.db created successfully!")
    except Exception as e:
        print("❌ Error creating DB:", e)
