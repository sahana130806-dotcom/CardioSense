from flask import Flask
from flask_cors import CORS

from cardiosense_api.routes.predict import predict_bp


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    # ✅ Register blueprint correctly
    app.register_blueprint(predict_bp, url_prefix="/predict")

    # ✅ Health check (for testing)
    @app.route("/health", methods=["GET"])
    def health_check():
        return {"status": "ok"}, 200

    # ✅ Optional root route (to avoid 404 confusion)
    @app.route("/", methods=["GET"])
    def home():
        return "Backend running 🚀", 200

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)