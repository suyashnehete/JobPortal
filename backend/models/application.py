from datetime import datetime
from config import GlobalConfig

class Application(GlobalConfig.db.Model):
    id = GlobalConfig.db.Column(GlobalConfig.db.Integer, primary_key=True)
    applied_on = GlobalConfig.db.Column(GlobalConfig.db.DateTime, default=datetime.utcnow)
    resume_url = GlobalConfig.db.Column(GlobalConfig.db.String(255))

    user_id = GlobalConfig.db.Column(GlobalConfig.db.Integer, GlobalConfig.db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    job_id = GlobalConfig.db.Column(GlobalConfig.db.Integer, GlobalConfig.db.ForeignKey("job.id"), nullable=False)

    user = GlobalConfig.db.relationship("User", backref=GlobalConfig.db.backref("applications", passive_deletes=True))
    job = GlobalConfig.db.relationship("Job", backref="applications")