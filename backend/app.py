from flask import Flask
from flask_cors import CORS
from config import Config, GlobalConfig


app = Flask(__name__)
app.config.from_object(Config)

GlobalConfig(app)


if __name__ == "__main__":
    app.run(debug=True, port=5001)