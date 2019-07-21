"""
All CRUD routines on notes is in this file.
"""

import json
import jwt
import base64
import postgres_management as dbms
from flask_restful import Resource
from flask import request,abort,jsonify
from datetime import datetime,timedelta
from Crypto.Cipher import AES


SECRET_KEY="b4dyko_U8nhqDeHmz2qroc02NShi3bUKqQVocvpImRzAYgIEvIN4XFEozRR66NNvg0o0hFFqfdDtgAe0Ih6XLbTTTQeoiPEzhW82g_gVa5mSCLNOch-lx-swf89BUEYuVyeZpP2b0OaiRUlRtPer_1lrz_I4qpRJT9bqdV4iv48"
PRIVATE_KEY="6ZGyA_XEg9IDVpN4nmof_gmUNlGAbmor"

def DEBUG(x):
    print("-----------------------------\n")
    print(x)
    print("\n-----------------------------")

class Notes(Resource):
    def post(self):
        keys=["id","title","note","uid"]
        token=request.headers.get('Authorization')
        try:
            token=jwt.decode(token,SECRET_KEY,algorithm="HS256")
        except:
            abort(401,"Token Verification Failed")
        
        encryptor=AES.new(PRIVATE_KEY,AES.MODE_CFB,token["pub"])
        uid=int(encryptor.decrypt(base64.b64decode(token["uid"].encode('utf-8'))))

        noteslist=dbms.getnotes(uid)
        if noteslist!="error":
            noteslist.sort(key=lambda x: x[0])
            notesdict=[{keys[i]:note[i] for i in range(len(note))} for note in noteslist]
            return jsonify(notesdict)
        else:
            abort(500,"Internal Server Error Occured")
    
class AddNote(Resource):
    def post(self):
        data=request.get_json()
        token=request.headers.get('Authorization')
        try:
            token=jwt.decode(token,SECRET_KEY,algorithm="HS256")
        except:
            abort(401,"Token Verification Failed")

        encryptor=AES.new(PRIVATE_KEY,AES.MODE_CFB,token["pub"])
        uid=int(encryptor.decrypt(base64.b64decode(token["uid"].encode('utf-8'))))

        response=dbms.addnote(userid=uid,note=data["currentnote"], title=data["currenttitle"])
        if response=="error":
            abort(500)

class UpdateNote(Resource):
    def post(self):
        data=request.get_json()
        token=request.headers.get('Authorization')
        try:
            token=jwt.decode(token,SECRET_KEY,algorithm="HS256")
        except:
            abort(401,"Token Verification Failed")

        encryptor=AES.new(PRIVATE_KEY,AES.MODE_CFB,token["pub"])
        uid=int(encryptor.decrypt(base64.b64decode(token["uid"].encode('utf-8'))))

        response=dbms.updatenote(userid=uid,noteid=data["id"], title=data["title"], note=data["note"])
        if response=="error":
            abort(500)

class DeleteNote(Resource):
    def post(self):
        data=request.get_json()
        token=request.headers.get('Authorization')
        try:
            token=jwt.decode(token,SECRET_KEY,algorithm="HS256")
        except:
            abort(401,"Token Verification Failed")

        encryptor=AES.new(PRIVATE_KEY,AES.MODE_CFB,token["pub"])
        uid=int(encryptor.decrypt(base64.b64decode(token["uid"].encode('utf-8'))))
        
        response=dbms.deletenote(userid=uid,noteid=data["id"])
        if response=="error":
            abort(500)
