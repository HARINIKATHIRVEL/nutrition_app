from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from datetime import datetime
import os
from waitress import serve

app = Flask(__name__)
CORS(app)

# --- Helper Functions ---

def calculate_bmi(height_cm, weight_kg):
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    if bmi < 18.5:
        return round(bmi, 2), "Underweight"
    elif 18.5 <= bmi < 24.9:
        return round(bmi, 2), "Normal"
    elif 25 <= bmi < 29.9:
        return round(bmi, 2), "Overweight"
    else:
        return round(bmi, 2), "Obese"

def mock_predict_deficiencies(symptoms):
    mapping = {
        'Fatigue': 'Iron',
        'Hair Loss': 'Zinc',
        'Pale Skin': 'Vitamin B12',
        'Weakness': 'Calcium',
        'Dizziness': 'Vitamin D',
        'Delayed Growth': 'Protein'
    }
    return list({mapping[s] for s in symptoms if s in mapping})

def mock_recommend_food(deficiencies):
    food_map = {
        'Iron': 'Spinach',
        'Zinc': 'Pumpkin seeds',
        'Vitamin B12': 'Milk',
        'Calcium': 'Yogurt',
        'Vitamin D': 'Egg yolk',
        'Protein': 'Lentils'
    }
    return [food_map[d] for d in deficiencies if d in food_map]

# --- API Routes ---

@app.route('/api/calculate_bmi', methods=['POST'])
def calculate_bmi_api():
    data = request.get_json()
    age = int(data.get('age', 0))
    if age < 10 or age > 15:
        return jsonify({'error': 'Age must be between 10 and 15'}), 400

    height = float(data['height'])
    weight = float(data['weight'])
    symptoms = data.get('symptoms', [])
    gender = data.get('gender', 'Not specified')  # Not used in logic, but collected

    bmi, category = calculate_bmi(height, weight)
    deficiencies = mock_predict_deficiencies(symptoms)
    recommendations = mock_recommend_food(deficiencies)

    return jsonify({
        'bmi': bmi,
        'category': category,
        'deficiencies': deficiencies,
        'recommendations': recommendations
    })



# --- Start the App with Waitress ---

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
# --- Start the App with Flask (Local Development) ---

if __name__ == '__main__':
    if os.environ.get('ENV') == 'production':
        serve(app, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True, host='0.0.0.0', port=5000)
