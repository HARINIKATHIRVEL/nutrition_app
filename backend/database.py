import sqlite3
import pandas as pd
import os

# Define the absolute path to the database
db_path = os.path.join(os.path.dirname(__file__), 'nutrition.db')

def init_db():
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()

        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        ''')

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

        # Sample food data
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
        print("✅ Database and tables initialized successfully.")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
    finally:
        conn.close()

def get_user_intake(user_id, date):
    conn = sqlite3.connect(db_path)
    query = '''
        SELECT f.name, i.quantity, f.calories, f.protein, f.fat, f.carbs, 
               f.vitamin_a, f.vitamin_c, f.iron
        FROM intake i 
        JOIN foods f ON i.food_id = f.id
        WHERE i.user_id = ? AND i.date = ?
    '''
    df = pd.read_sql_query(query, conn, params=(user_id, date))
    conn.close()
    return df

def add_intake(user_id, food_id, quantity, date):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute(
        'INSERT INTO intake (user_id, food_id, quantity, date) VALUES (?, ?, ?, ?)',
        (user_id, food_id, quantity, date)
    )
    conn.commit()
    conn.close()

def get_foods():
    conn = sqlite3.connect(db_path)
    df = pd.read_sql_query('SELECT * FROM foods', conn)
    conn.close()
    return df.to_dict('records')

def add_user(username, password):
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
    except sqlite3.IntegrityError as e:
        raise ValueError("Username already exists")
    finally:
        conn.close()

def get_user(username, password):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT id FROM users WHERE username = ? AND password = ?', (username, password))
    user = c.fetchone()
    conn.close()
    return user
