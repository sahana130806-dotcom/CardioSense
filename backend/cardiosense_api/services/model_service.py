from pathlib import Path
from typing import Any

import joblib
import numpy as np
from tensorflow.keras.models import load_model


BASE_DIR = Path(__file__).resolve().parents[2]
RF_MODEL_PATH = BASE_DIR / "model.pkl"
LSTM_MODEL_PATH = BASE_DIR / "lstm_model.h5"

_rf_model = None
_lstm_model = None


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


def predict_rf(features: np.ndarray) -> tuple[str, float]:
    model = get_rf_model()
    prediction = model.predict(features)[0]
    risk = "High Risk" if int(prediction) == 1 else "Low Risk"

    confidence = 1.0
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(features)[0]
        high_risk_confidence = float(probabilities[1])
        confidence = high_risk_confidence if risk == "High Risk" else 1.0 - high_risk_confidence

    return risk, float(confidence)


def predict_lstm(sequence: np.ndarray) -> tuple[str, float]:
    model = get_lstm_model()
    prediction = model.predict(sequence, verbose=0)
    high_risk_confidence = float(prediction.squeeze())

    risk = "High Risk" if high_risk_confidence >= 0.5 else "Low Risk"
    confidence = high_risk_confidence if risk == "High Risk" else 1.0 - high_risk_confidence
    return risk, float(confidence)


def combine_predictions(rf_risk: str, lstm_risk: str) -> str:
    if rf_risk == "High Risk" and lstm_risk == "High Risk":
        return "High Risk"
    return "Low Risk"
