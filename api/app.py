from flask import Blueprint
from flask_restful import Api
from Hello import *

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Notes, '/getnotes')
api.add_resource(AddNote,'/addnote')
api.add_resource(UpdateNote,'/updatenote')
api.add_resource(DeleteNote,'/deletenote')
