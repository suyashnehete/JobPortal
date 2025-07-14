from config import GlobalConfig

class Category(GlobalConfig.db.Model):
    id = GlobalConfig.db.Column(GlobalConfig.db.Integer, primary_key=True)
    name = GlobalConfig.db.Column(GlobalConfig.db.String(100), unique=True, nullable=False)