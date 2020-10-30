from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# initialize our db
db = SQLAlchemy()
bcrypt = Bcrypt()

from flaskr.models.BlogpostModel import BlogpostModel, BlogpostSchema
from flaskr.models.UserModel import UserModel, UserSchema