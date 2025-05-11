from flask import Flask
from flask_cors import CORS
CORS(app)
app = Flask(__name__)
@ app.route('/')
def home():
    return "Nutrition App Backend Running"
if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)
    if __name__ == "__main__":
    app.run(debug=True)

