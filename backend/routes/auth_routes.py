from flask import Blueprint, request, jsonify
from models.user import User
from flask_jwt_extended import create_access_token

class AuthService:

    def __init__(self, app, db):
        self.app = app
        self.db = db
        self.register_routes()

    def register_routes(self):
        auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/auth')

        @auth_bp.route("/register", methods=["POST"])
        def register():
            data = request.get_json()
            if User.query.filter_by(email=data["email"]).first():
                return jsonify({"message": "Email already exists"}), 409

            user = User(name=data["name"], email=data["email"], role=data["role"])
            user.set_password(data["password"])
            self.db.session.add(user)
            self.db.session.commit()

            access_token = create_access_token(
                identity=str(user.id), 
                additional_claims={
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
            )

            return jsonify(access_token=access_token), 201

        @auth_bp.route("/login", methods=["POST"])
        def login():
            data = request.get_json()
            user = User.query.filter_by(email=data["email"]).first()

            if not user or not user.check_password(data["password"]):
                return jsonify({"message": "Invalid credentials"}), 401

            access_token = create_access_token(
                identity=str(user.id),  
                additional_claims={
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
            )

            return jsonify(access_token=access_token), 200

        self.app.register_blueprint(auth_bp)