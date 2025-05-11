from flask import Flask, request, jsonify
from model import predict_deficiency
from database import save_user_data
from waitress import serve

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    age = data.get('age')
    intake = data.get('intake')
    symptoms = data.get('symptoms')

    result = predict_deficiency(age, intake, symptoms)
    save_user_data(age, intake, symptoms, result)
    
    return jsonify(result)

if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=5000)
