from datetime import datetime
from config import GlobalConfig

class Job(GlobalConfig.db.Model):
    id = GlobalConfig.db.Column(GlobalConfig.db.Integer, primary_key=True)
    title = GlobalConfig.db.Column(GlobalConfig.db.String(255), nullable=False)
    description = GlobalConfig.db.Column(GlobalConfig.db.Text, nullable=False)
    salary = GlobalConfig.db.Column(GlobalConfig.db.String(100))
    location = GlobalConfig.db.Column(GlobalConfig.db.String(100))
    created_at = GlobalConfig.db.Column(GlobalConfig.db.DateTime, default=datetime.utcnow)

    employer_id = GlobalConfig.db.Column(GlobalConfig.db.Integer, GlobalConfig.db.ForeignKey("user.id"), nullable=False)
    category_id = GlobalConfig.db.Column(GlobalConfig.db.Integer, GlobalConfig.db.ForeignKey("category.id"))

    employer = GlobalConfig.db.relationship("User", backref="posted_jobs")
    category = GlobalConfig.db.relationship("Category", backref="jobs")