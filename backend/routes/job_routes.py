from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models.job import Job
from models.user import User
from models.category import Category

class JobService:

    def __init__(self, app, db):
        self.app = app
        self.db = db
        self.register_routes()
    
    def register_routes(self):
        # Use a Blueprint with url_prefix='/api/jobs'
        jobs_bp = Blueprint('jobs_bp', __name__, url_prefix='/api/jobs')

        @jobs_bp.route("", methods=["POST"])
        @jwt_required()
        def create_job():
            data = request.get_json()
            user_id = get_jwt_identity() 
            claims = get_jwt()            
            if claims.get("role") != "employer":
                return jsonify({"message": "Only employers can post jobs"}), 403
            
            job = Job(
                title=data["title"],
                description=data["description"],
                salary=data.get("salary"),
                location=data["location"],
                employer_id=int(user_id), 
                category_id=data.get("category_id")
            )
            self.db.session.add(job)
            self.db.session.commit()

            return jsonify({"message": "Job created", "job_id": job.id}), 201

        @jobs_bp.route("", methods=["GET", "OPTIONS"])
        def list_jobs():
            location = request.args.get("location")
            category = request.args.get("category")
            query = Job.query

            if location:
                query = query.filter(Job.location.ilike(f"%{location}%"))
            if category:
                query = query.join(Category).filter(Category.name.ilike(f"%{category}%"))

            jobs = query.all()
            results = [{
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "salary": job.salary,
                "location": job.location,
                "employer_id": job.employer_id,
                "category": job.category.name if job.category else None
            } for job in jobs]

            return jsonify(results), 200

        @jobs_bp.route("/<int:job_id>", methods=["DELETE"], endpoint="job_delete_job")
        @jwt_required()
        def delete_job(job_id):
            user_id = get_jwt_identity()  
            claims = get_jwt()
            job = Job.query.get_or_404(job_id)

            if claims.get("role") != "employer" or job.employer_id != int(user_id):
                return jsonify({"message": "Unauthorized"}), 403

            self.db.session.delete(job)
            self.db.session.commit()
            return jsonify({"message": "Job deleted"}), 200

        @jobs_bp.route("/my", methods=["GET"])
        @jwt_required()
        def my_jobs():
            user_id = get_jwt_identity() 
            claims = get_jwt()

            if claims.get("role") != "employer":
                return jsonify({"message": "Unauthorized"}), 403

            jobs = Job.query.filter_by(employer_id=int(user_id)).all()
            return jsonify([{
                "id": job.id,
                "title": job.title,
                "location": job.location,
                "created_at": job.created_at.strftime("%Y-%m-%d")
            } for job in jobs]), 200

        @jobs_bp.route("/<int:job_id>", methods=["GET"])
        def get_job_by_id(job_id):
            job = Job.query.get_or_404(job_id)
            result = {
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "salary": job.salary,
                "location": job.location,
                "employer_id": job.employer_id,
                "category": job.category.name if job.category else None,
                "created_at": job.created_at.strftime("%Y-%m-%d") if hasattr(job, "created_at") else None
            }
            return jsonify(result), 200

        self.app.register_blueprint(jobs_bp)