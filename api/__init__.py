from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = '6fcee147cf25910cdc7c12feacf1192f'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY'] = '6fcee147cf25910cdc7c12feacf1192f'
db = SQLAlchemy(app)

cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})

from api import routes
