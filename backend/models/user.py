from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from config import GlobalConfig

class User(GlobalConfig.db.Model):
    id = GlobalConfig.db.Column(GlobalConfig.db.Integer, primary_key=True)
    name = GlobalConfig.db.Column(GlobalConfig.db.String(120), nullable=False)
    email = GlobalConfig.db.Column(GlobalConfig.db.String(120), unique=True, nullable=False)
    password_hash = GlobalConfig.db.Column(GlobalConfig.db.String(255), nullable=False)
    role = GlobalConfig.db.Column(GlobalConfig.db.String(20), nullable=False)  # 'seeker', 'employer'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)