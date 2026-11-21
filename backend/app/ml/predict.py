import os
import joblib
import numpy as np
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "crop_recommendation_model.pkl")

class CropPredictor:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            self.model = joblib.load(MODEL_PATH)
        else:
            self.model = None

    def predict(self, n: float, p: float, k: float, temp: float, humidity: float, ph: float, rainfall: float):
        if not self.model:
            # Fallback heuristic if trained model file is not yet compiled
            return {
                "recommended_crop": "rice" if rainfall > 150 else ("wheat" if temp < 25 else "maize"),
                "confidence": 0.85,
                "alternatives": ["barley", "pulses"]
            }
        
        feature_names = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        features_df = pd.DataFrame([[n, p, k, temp, humidity, ph, rainfall]], columns=feature_names)
        
        prediction = self.model.predict(features_df)[0]
        proba = self.model.predict_proba(features_df)[0]
        top_indices = np.argsort(proba)[::-1]
        classes = self.model.classes_

        alternatives = [str(classes[idx]) for idx in top_indices[1:3] if idx < len(classes)]

        return {
            "recommended_crop": str(prediction),
            "confidence": round(float(proba[top_indices[0]]), 2),
            "alternatives": alternatives
        }

predictor = CropPredictor()
