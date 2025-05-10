import pandas as pd
import numpy as np

RDA = {
    'calories': 2000,
    'protein': 50,
    'fat': 70,
    'carbs': 300,
    'vitamin_a': 0.9,
    'vitamin_c': 90,
    'iron': 8
}

def predict_deficiencies(intake_df):
    if intake_df.empty:
        return {k: 'Deficient (no intake)' for k in RDA.keys()}
    
    totals = {}
    for nutrient in RDA.keys():
        if nutrient in intake_df.columns:
            totals[nutrient] = (intake_df[nutrient] * intake_df['quantity'] / 100).sum()
        else:
            totals[nutrient] = 0
    
    deficiencies = {}
    for nutrient, value in totals.items():
        if value < RDA[nutrient] * 0.7:
            deficiencies[nutrient] = f'Deficient ({value:.2f}/{RDA[nutrient]})'
        else:
            deficiencies[nutrient] = f'Adequate ({value:.2f}/{RDA[nutrient]})'
    
    return deficiencies

def optimize_diet(intake_df, foods_df):
    deficiencies = predict_deficiencies(intake_df)
    recommendations = []
    
    for nutrient, status in deficiencies.items():
        if 'Deficient' in status:
            rich_foods = foods_df.sort_values(by=nutrient, ascending=False).head(3)
            for _, food in rich_foods.iterrows():
                recommendations.append(f"Eat more {food['name']} (contains {food[nutrient]:.2f} {nutrient}/100g)")
    
    return recommendations if recommendations else ["Your diet meets RDA requirements!"] 
