import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
MODEL_PATH = os.path.join(MODEL_DIR, "crop_recommendation_model.pkl")

def train(data_path: str):
    """Train a RandomForest model on the crop dataset and export it."""
    os.makedirs(MODEL_DIR, exist_ok=True)
    df = pd.read_csv(data_path)
    
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[features]
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)
    print(f"Model trained successfully. Accuracy: {score:.4f}")

    joblib.dump(model, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")
    return model

if __name__ == "__main__":
    dataset_file = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "../../../data/crop_dataset/crop_recommendation.csv")
    )
    if os.path.exists(dataset_file):
        train(dataset_file)
    else:
        print(f"Dataset file not found at: {dataset_file}")
