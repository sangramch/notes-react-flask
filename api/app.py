from flask import Blueprint,session
from flask_restful import Api
from crud_ops import *
from authentication import *

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(Notes, '/getnotes')
api.add_resource(AddNote,'/addnote')
api.add_resource(UpdateNote,'/updatenote')
api.add_resource(DeleteNote,'/deletenote')
api.add_resource(User_Login,'/login')
api.add_resource(User_Register,'/register')