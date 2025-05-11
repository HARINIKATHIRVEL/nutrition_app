import sqlite3

def save_user_data(age, intake, symptoms, result):
    conn = sqlite3.connect('nutrition.db')
    cursor = conn.cursor()

    # Create table if not exists
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            age INTEGER,
            intake TEXT,
            symptoms TEXT,
            result TEXT
        )
    ''')

    # Insert the user data
    cursor.execute('''
        INSERT INTO user_data (age, intake, symptoms, result)
        VALUES (?, ?, ?, ?)
    ''', (age, str(intake), str(symptoms), str(result)))

    conn.commit()
    conn.close()
