import os

from flask import Flask


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        # TODO: a default secret that should be overridden by instance config
        SECRET_KEY="dev",
        # store the database in the instance folder
        SQLALCHEMY_DATABASE_URI="postgresql://flask:flask@127.0.0.1/flaskdb"
    )
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.update(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # register the database commands
    from flaskr.db import db
    db.init_app(app)

    # make url_for('index') == url_for('blog.index')
    # in another app, you might define a separate main index here with
    # app.route, while giving the blog blueprint a url_prefix, but for
    # the tutorial the blog will be the main index
    @app.route('/', methods=['GET'])
    def index():
        """
        example endpoint
        """
        return 'Application is Running!!'

    return app
