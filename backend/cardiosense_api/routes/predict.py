from flask import Blueprint, jsonify, request
from cardiosense_api.services.model_service import (
    combine_predictions,
    predict_lstm,
    predict_rf,
)

predict_bp = Blueprint("predict", __name__)


# ✅ IMPORTANT: empty route (because prefix = /predict)
@predict_bp.route("", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No input data"}), 400

        # 🔥 Run both models
        rf_prediction = predict_rf(data)
        lstm_prediction = predict_lstm(data)

        # 🔥 Combine results
        final_prediction = combine_predictions(rf_prediction, lstm_prediction)
        print("Incoming:",data)
        return jsonify({
            "final_prediction": final_prediction,
            "rf_prediction": rf_prediction,
            "lstm_prediction": lstm_prediction
            
        }), 200
    
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except FileNotFoundError:
        return jsonify({"error": "Model file not found"}), 500

    except Exception as e:
        print("Error:",e)
        return jsonify({"error": str(e)}), 500