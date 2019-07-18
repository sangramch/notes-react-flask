from flask_restful import Resource
from flask import request
import postgres_management as dbms
import json

class Notes(Resource):
    def post(self):
        keys=["id","title","note","uid"]
        noteslist=dbms.getnotes(1)
        noteslist.sort(key=lambda x: x[0])
        notesdict=[{keys[i]:note[i] for i in range(len(note))} for note in noteslist]
        return notesdict
    
class AddNote(Resource):
    def post(self):
        data=request.get_json()
        dbms.addnote(userid=1,note=data["currentnote"], title=data["currenttitle"])

class UpdateNote(Resource):
    def post(self):
        data=request.get_json()
        print(data)
        dbms.updatenote(userid=1,noteid=data["id"], title=data["title"], note=data["note"])

class DeleteNote(Resource):
    def post(self):
        data=request.get_json()
        dbms.deletenote(userid=1,noteid=data["id"])
