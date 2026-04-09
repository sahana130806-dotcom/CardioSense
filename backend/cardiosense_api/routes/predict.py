from flask import Blueprint, jsonify, request

from cardiosense_api.services.model_service import predict_lstm, predict_rf
from cardiosense_api.validators.request_validator import validate_lstm_payload, validate_rf_payload


predict_bp = Blueprint("predict", __name__)


@predict_bp.post("/rf")
def predict_random_forest():
    try:
        payload = request.get_json(silent=True)
        features = validate_rf_payload(payload)
        risk, confidence = predict_rf(features)
        return jsonify({"risk": risk, "confidence": confidence}), 200
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except FileNotFoundError:
        return jsonify({"error": "Random Forest model file not found."}), 500
    except Exception:
        return jsonify({"error": "Failed to run Random Forest prediction."}), 500


@predict_bp.post("/lstm")
def predict_lstm_route():
    try:
        payload = request.get_json(silent=True)
        sequence = validate_lstm_payload(payload)
        risk, confidence = predict_lstm(sequence)
        return jsonify({"risk": risk, "confidence": confidence}), 200
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except FileNotFoundError:
        return jsonify({"error": "LSTM model file not found."}), 500
    except Exception:
        return jsonify({"error": "Failed to run LSTM prediction."}), 500
