from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_user_intake, add_intake, get_foods, add_user, get_user
from model import predict_deficiencies, optimize_diet
import pandas as pd
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)
init_db()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = get_user(data['username'], data['password'])
    if user:
        return jsonify({'user_id': user[0], 'message': 'Login successful'})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    try:
        add_user(data['username'], data['password'])
        return jsonify({'message': 'User registered'})
    except:
        return jsonify({'message': 'Username exists'}), 400

@app.route('/api/foods', methods=['GET'])
def foods():
    return jsonify(get_foods())

@app.route('/api/intake', methods=['POST'])
def add_intake_route():
    data = request.json
    add_intake(data['user_id'], data['food_id'], data['quantity'], datetime.now().strftime('%Y-%m-%d'))
    return jsonify({'message': 'Intake added'})

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    user_id = data['user_id']
    date = datetime.now().strftime('%Y-%m-%d')
    intake_df = get_user_intake(user_id, date)
    foods_df = pd.DataFrame(get_foods())
    
    deficiencies = predict_deficiencies(intake_df)
    recommendations = optimize_diet(intake_df, foods_df)
    
    return jsonify({
        'deficiencies': deficiencies,
        'recommendations': recommendations
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
