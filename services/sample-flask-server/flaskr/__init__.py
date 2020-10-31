import os

from flask import Flask
from flaskr.config import app_config


def create_app(env_name='development'):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)
    app.config.from_object(app_config[env_name])

    # initializing bcrypt and db
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    from flaskr.db import db, bcrypt
    bcrypt.init_app(app)
    db.init_app(app)

    from flask_cors import CORS  # The typical way to import flask-cors
    CORS(app)
    # apply the blueprints to the app
    from flaskr.controllers.UserController import user_api as user_blueprint
    app.register_blueprint(user_blueprint, url_prefix='/api/v1/users')

    # TODO: Make error handelr more specific, and mode to controller
    from werkzeug.exceptions import HTTPException
    from flask import jsonify
    from marshmallow.exceptions import ValidationError

    @app.errorhandler(Exception)
    def handle_error(e):
        code = 500
        if isinstance(e, ValidationError):
            code = 400
        if isinstance(e, HTTPException):
            code = e.code
        return jsonify(error=str(e)), code

    # make url_for('index') == url_for('blog.index')
    # in another app, you might define a separate main index here with
    # app.route, while giving the blog blueprint a url_prefix, but for
    # the tutorial the blog will be the main index
    @app.route('/', methods=['GET'])
    def index():
        """
        example endpoint
        """
        return 'Alive!'

    return app
