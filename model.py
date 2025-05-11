# backend/model.py

def predict_deficiency(food_items, symptoms):
    # Placeholder rule-based logic for predicting deficiencies
    deficiencies = []

    # Simulated rule: If certain food items are missing, predict deficiencies
    if "fruits" not in food_items.lower():
        deficiencies.append("Vitamin C deficiency")
    if "vegetables" not in food_items.lower():
        deficiencies.append("Vitamin A deficiency")
    if "meat" not in food_items.lower() and "protein" not in food_items.lower():
        deficiencies.append("Protein deficiency")

    # Add prediction based on symptoms (simplified)
    if "fatigue" in symptoms.lower():
        deficiencies.append("Iron deficiency")
    if "bone pain" in symptoms.lower():
        deficiencies.append("Vitamin D deficiency")

    # If no deficiencies found, return a default message
    if not deficiencies:
        deficiencies.append("No deficiencies detected")

    return {"deficiencies": deficiencies}
