from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Register
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    conn = sqlite3.connect('nutrition.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User registered'}), 201

# Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    conn = sqlite3.connect('nutrition.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({'user_id': user[0], 'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Login failed'}), 401

# Root
@app.route('/')
def index():
    return "Welcome to Nutrition API"
