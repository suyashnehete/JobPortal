import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "supersecretkey")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "postgresql://admin:admin@localhost/job_portal")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-secret")

class GlobalConfig:
    db = SQLAlchemy()
    migrate = Migrate()
    jwt = JWTManager()

    def __init__(self, app):
        GlobalConfig.db.init_app(app)
        GlobalConfig.jwt.init_app(app)
        GlobalConfig.migrate.init_app(app, GlobalConfig.db)

        # Register blueprints with correct prefixes
        from routes.auth_routes import AuthService
        from routes.job_routes import JobService
        from routes.application_routes import ApplicationService
        from routes.admin_routes import AdminService

        AuthService(app, GlobalConfig.db)           # /api/auth
        JobService(app, GlobalConfig.db)            # /api/jobs
        ApplicationService(app, GlobalConfig.db)    # /api/applications
        AdminService(app, GlobalConfig.db)

        CORS(app,
            resources={r"/api/*": {"origins": "http://localhost:4200"}},
            supports_credentials=True)