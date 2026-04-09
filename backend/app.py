from flask import Flask
from flask_cors import CORS

from cardiosense_api.routes.predict import predict_bp


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(predict_bp, url_prefix="/predict")

    @app.get("/health")
    def health_check():
        return {"status": "ok"}, 200

    return app


if __name__ == "__main__":
    application = create_app()
    application.run(host="0.0.0.0", port=5000, debug=True)
