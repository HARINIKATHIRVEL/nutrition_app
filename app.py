from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend communication

@app.route('/predict', methods=['POST'])
def predict_deficiencies():
    try:
        # Get JSON data from the request
        data = request.get_json()
        age = int(data.get('age', 0))
        weight = int(data.get('weight', 0))
        diet = data.get('diet', 'omnivore')
        symptoms = data.get('symptoms', [])

        # Basic validation
        if age <= 0 or weight <= 0:
            return jsonify({'error': 'Invalid age or weight'}), 400
        if diet not in ['omnivore', 'vegetarian', 'vegan']:
            return jsonify({'error': 'Invalid diet preference'}), 400

        # Simple deficiency prediction logic (replace with ML model in production)
        deficiencies = []
        if 'fatigue' in symptoms or diet == 'vegan':
            deficiencies.append('Vitamin B12')
        if 'hair_loss' in symptoms or 'dry_skin' in symptoms:
            deficiencies.append('Iron')
        if 'weak_bones' in symptoms or diet == 'vegan':
            deficiencies.append('Calcium')
        if 'fatigue' in symptoms and age > 50:
            deficiencies.append('Vitamin D')

        # Diet optimization suggestions
        diet_plan = {
            'Vitamin B12': {
                'omnivore': 'Fish, eggs, dairy',
                'vegetarian': 'Dairy, fortified cereals',
                'vegan': 'Fortified plant milk, nutritional yeast'
            },
            'Iron': {
                'omnivore': 'Red meat, spinach, lentils',
                'vegetarian': 'Lentils, spinach, tofu',
                'vegan': 'Lentils, spinach, pumpkin seeds'
            },
            'Calcium': {
                'omnivore': 'Milk, cheese, broccoli',
                'vegetarian': 'Milk, cheese, kale',
                'vegan': 'Fortified plant milk, kale, almonds'
            },
            'Vitamin D': {
                'omnivore': 'Salmon, egg yolks, fortified milk',
                'vegetarian': 'Egg yolks, fortified milk',
                'vegan': 'Fortified plant milk, mushrooms'
            }
        }

        # Prepare response
        response = {
            'deficiencies': deficiencies,
            'diet_recommendations': [
                {'nutrient': deficiency, 'foods': diet_plan[deficiency][diet]}
                for deficiency in deficiencies
            ] if deficiencies else [{'nutrient': 'None', 'foods': 'Continue with a balanced diet'}]
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
