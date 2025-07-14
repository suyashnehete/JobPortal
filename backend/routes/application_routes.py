from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models.application import Application
from models.job import Job
from models.user import User

class ApplicationService:

    def __init__(self, app, db):
        self.app = app
        self.db = db
        self.register_routes()

    def register_routes(self):
        applications_bp = Blueprint('applications_bp', __name__, url_prefix='/api/applications')

        # ✅ Apply to a Job
        @applications_bp.route("/<int:job_id>", methods=["POST"])
        @jwt_required()
        def apply_to_job(job_id):
            claims = get_jwt()
            user_id = get_jwt_identity()  # string

            if claims.get("role") != "seeker":
                return jsonify({"message": "Only job seekers can apply"}), 403

            existing_app = Application.query.filter_by(user_id=int(user_id), job_id=job_id).first()
            if existing_app:
                return jsonify({"message": "Already applied"}), 409

            job = Job.query.get(job_id)
            if not job:
                return jsonify({"message": "Job not found"}), 404

            data = request.get_json()
            application = Application(
                user_id=int(user_id),
                job_id=job_id,
                resume_url=data.get("resume_url")
            )
            self.db.session.add(application)
            self.db.session.commit()

            return jsonify({"message": "Applied successfully"}), 201

        # ✅ Job Seeker: View My Applications
        @applications_bp.route("/my", methods=["GET"])
        @jwt_required()
        def my_applications():
            claims = get_jwt()
            user_id = get_jwt_identity()  # string

            if claims.get("role") != "seeker":
                return jsonify({"message": "Unauthorized"}), 403

            applications = Application.query.filter_by(user_id=int(user_id)).all()

            result = []
            for app in applications:
                result.append({
                    "application_id": app.id,
                    "job_title": app.job.title if app.job else None,
                    "employer": app.job.employer.name if app.job and app.job.employer else None,
                    "resume_url": app.resume_url,
                    "applied_on": app.applied_on.strftime("%Y-%m-%d"),
                })

            return jsonify(result), 200

        # ✅ Employer: View Applicants for a Job
        @applications_bp.route("/job/<int:job_id>", methods=["GET"])
        @jwt_required()
        def view_applicants(job_id):
            claims = get_jwt()
            user_id = get_jwt_identity()  # string

            job = Job.query.get_or_404(job_id)
            if claims.get("role") != "employer" or job.employer_id != int(user_id):
                return jsonify({"message": "Unauthorized"}), 403

            applications = Application.query.filter_by(job_id=job_id).all()

            result = []
            for app in applications:
                result.append({
                    "application_id": app.id,
                    "seeker_name": app.user.name if app.user else None,
                    "seeker_email": app.user.email if app.user else None,
                    "resume_url": app.resume_url,
                    "applied_on": app.applied_on.strftime("%Y-%m-%d"),
                })

            return jsonify(result), 200

        self.app.register_blueprint(applications_bp)