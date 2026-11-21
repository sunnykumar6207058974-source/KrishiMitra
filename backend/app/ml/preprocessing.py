import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean agricultural dataset by dropping duplicates and handling nulls."""
    df = df.copy()
    df = df.drop_duplicates()
    df = df.dropna()
    return df

def get_feature_matrix(df: pd.DataFrame):
    """Extract features (N, P, K, temp, humidity, ph, rainfall) and target labels."""
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[features]
    y = df['label']
    return X, y
