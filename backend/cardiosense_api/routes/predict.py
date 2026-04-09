from flask import Blueprint, jsonify, request

from cardiosense_api.services.model_service import combine_predictions, predict_lstm, predict_rf
from cardiosense_api.validators.request_validator import validate_combined_payload


predict_bp = Blueprint("predict", __name__)


@predict_bp.post("")
def predict():
    try:
        payload = request.get_json(silent=True)
        features_rf, features_lstm = validate_combined_payload(payload)

        rf_prediction, _ = predict_rf(features_rf)
        lstm_prediction, _ = predict_lstm(features_lstm)
        final_prediction = combine_predictions(rf_prediction, lstm_prediction)

        return (
            jsonify(
                {
                    "final_prediction": final_prediction,
                    "rf_prediction": rf_prediction,
                    "lstm_prediction": lstm_prediction,
                    "random_forest": rf_prediction,
                    "lstm": lstm_prediction,
                }
            ),
            200,
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except FileNotFoundError:
        return jsonify({"error": "One or more model files were not found."}), 500
    except Exception:
        return jsonify({"error": "Failed to run prediction."}), 500
