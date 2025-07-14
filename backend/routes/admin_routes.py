from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from models.user import User
from models.job import Job


class AdminService:
    def __init__(self, app, db):
        self.app = app
        self.db = db
        self.register_routes()

    def register_routes(self):
        admin_bp = Blueprint('admin_bp', __name__, url_prefix='/api/admin')

        # Middleware: Admin-only check
        def admin_required(func):
            def wrapper(*args, **kwargs):
                claims = get_jwt()
                if claims.get("role") != "admin":
                    return jsonify({"message": "Admins only"}), 403
                return func(*args, **kwargs)
            wrapper.__name__ = func.__name__
            return jwt_required()(wrapper)

        # ✅ Get all users
        @admin_bp.route("/users", methods=["GET"])
        @admin_required
        def get_all_users():
            users = User.query.all()
            result = [{
                "id": u.id,
                "name": u.name,
                "email": u.email,
                "role": u.role
            } for u in users]
            return jsonify(result), 200

        # ✅ Delete a user
        @admin_bp.route("/users/<int:user_id>", methods=["DELETE"])
        @admin_required
        def delete_user(user_id):
            user = User.query.get_or_404(user_id)
            self.db.session.delete(user)
            self.db.session.commit()
            return jsonify({"message": "User deleted"}), 200

        # ✅ Get all jobs
        @admin_bp.route("/jobs", methods=["GET"])
        @admin_required
        def get_all_jobs():
            jobs = Job.query.all()
            result = [{
                "id": job.id,
                "title": job.title,
                "employer": job.employer.name if job.employer else None,
                "location": job.location,
                "created_at": job.created_at.strftime("%Y-%m-%d") if hasattr(job, "created_at") else None
            } for job in jobs]
            return jsonify(result), 200

        # ✅ Delete a job
        @admin_bp.route("/jobs/<int:job_id>", methods=["DELETE"])
        @admin_required
        def delete_job(job_id):
            job = Job.query.get_or_404(job_id)
            self.db.session.delete(job)
            self.db.session.commit()
            return jsonify({"message": "Job deleted"}), 200

        self.app.register_blueprint(admin_bp)