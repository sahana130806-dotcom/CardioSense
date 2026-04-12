from pathlib import Path
from typing import Any

import joblib
import numpy as np
from tensorflow.keras.models import load_model


# ===============================
# PATHS
# ===============================
BASE_DIR = Path(__file__).resolve().parents[2]

RF_MODEL_PATH = BASE_DIR / "model.pkl"
LSTM_MODEL_PATH = BASE_DIR / "best_lstm_model.h5"
SCALER_PATH = BASE_DIR / "scaler.pkl"   # 🔥 IMPORTANT

_rf_model = None
_lstm_model = None
_scaler = None


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


def get_scaler():
    global _scaler
    if _scaler is None:
        _scaler = joblib.load(SCALER_PATH)
    return _scaler


# ===============================
# PREPROCESS INPUT
# ===============================
def preprocess_input(data: dict) -> np.ndarray:
    features = np.array([[
        data["age"],
        data["trestbps"],
        data["chol"],
        data["thalach"],
        data["fbs"],
        data["cp"]
    ]])

    scaler = get_scaler()
    features_scaled = scaler.transform(features)

    return features_scaled


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