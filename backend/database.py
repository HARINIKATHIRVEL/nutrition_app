import sqlite3

def init_db():
    conn = sqlite3.connect('nutrition.db')
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
    
    conn.commit()
    conn.close()
