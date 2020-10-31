from flaskr import create_app


def test_config():
    """Test create_app without passing test config."""
    assert not create_app().testing
    assert create_app("testing").testing


def test_hello():
    """Test Setup"""
    app = create_app("testing")
    client = app.test_client
    response = client().get("/")
    assert response.data == b"Alive!"
