from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# IntakeLog table
class IntakeLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    food_items = db.Column(db.String(500), nullable=False)
    symptoms = db.Column(db.String(500), nullable=True)
    calories = db.Column(db.Integer, nullable=False)  # ✅ FIXED: This is now correct
    prediction = db.Column(db.String(500), nullable=False)

    user = db.relationship('User', backref=db.backref('intake_logs', lazy=True))
