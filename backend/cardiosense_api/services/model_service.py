from pathlib import Path
from typing import Any
import pandas as pd
import joblib
import numpy as np
from tensorflow.keras.models import load_model


# ===============================
# PATHS
# ===============================
BASE_DIR = Path(__file__).resolve().parent.parent

RF_MODEL_PATH = BASE_DIR / "models"/"model.pkl"
LSTM_MODEL_PATH = BASE_DIR / "models"/"best_lstm_model.h5"

print("RF PATH:", RF_MODEL_PATH)
print("LSTM PATH:", LSTM_MODEL_PATH)
print("RF EXISTS:", RF_MODEL_PATH.exists())
print("LSTM EXISTS:", LSTM_MODEL_PATH.exists())

_rf_model = None
_lstm_model = None



# ===============================
# LOAD MODELS
# ===============================
def get_rf_model() -> Any:
    global _rf_model
    if _rf_model is None:
        _rf_model = joblib.load(RF_MODEL_PATH)
    return _rf_model


def get_lstm_model() -> Any:
    global _lstm_model
    if _lstm_model is None:
        _lstm_model = load_model(LSTM_MODEL_PATH)
    return _lstm_model





# ===============================
# PREPROCESS INPUT
# ===============================
def preprocess_input(data: dict) -> np.ndarray:
    # 🔥 Create full feature dictionary
    features = {
        'age': data['age'],
        'trestbps': data['trestbps'],
        'chol': data['chol'],
        'fbs': data['fbs'],
        'thalch': data['thalach'],  # ⚠️ name match

        # Derived / default values
        'exang': 1 if data['thalach'] < 100 else 0,
        'oldpeak': (data['chol'] / 200),

        # One-hot encoded defaults
        'sex_Male': 1,
        'dataset_Hungary': 0,
        'dataset_Switzerland': 0,
        'dataset_VA Long Beach': 0,

        # Chest pain encoding
        'cp_atypical angina': 1 if data['cp'] == 1 else 0,
        'cp_non-anginal': 1 if data['cp'] == 2 else 0,
        'cp_typical angina': 1 if data['cp'] == 0 else 0,

        # Rest ECG
        'restecg_normal': 1,
        'restecg_st-t abnormality': 0,

        # Slope
        'slope_flat': 1,
        'slope_upsloping': 0,
    }

    # 🔥 Ensure correct order
    columns = [
        'age', 'trestbps', 'chol', 'fbs', 'thalch', 'exang', 'oldpeak',
        'sex_Male',
        'dataset_Hungary', 'dataset_Switzerland', 'dataset_VA Long Beach',
        'cp_atypical angina', 'cp_non-anginal', 'cp_typical angina',
        'restecg_normal', 'restecg_st-t abnormality',
        'slope_flat', 'slope_upsloping'
    ]

    df = pd.DataFrame([features])[columns]

    df_scaled = df.values

    return df.values

# ===============================
# RANDOM FOREST
# ===============================
def predict_rf(data: dict) -> int:
    model = get_rf_model()

    X = preprocess_input(data)

    prediction = model.predict(X)[0]

    return int(prediction)


# ===============================
# LSTM
# ===============================
def predict_lstm(data: dict) -> int:
    model = get_lstm_model()

    X = preprocess_input(data)

    # 🔥 Convert to sequence (timesteps = 15)
    X_seq = np.repeat(X, 15, axis=0).reshape(1, 15, -1)

    prediction = model.predict(X_seq, verbose=0)

    return int(prediction[0][0] > 0.5)


# ===============================
# COMBINE
# ===============================
def combine_predictions(rf: int, lstm: int) -> int:
    return 1 if (rf + lstm) >= 1 else 0