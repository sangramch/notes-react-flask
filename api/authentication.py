"""
This file contains all the user management routines.
User_Login class exposes an endpoint for login of users. It either returns a 401/500 error or a jwt token with the AES encrypted user id.
User_Register class exposes the endpoint for user registration. Returns either 401/500 or OK status.
"""

import json
import jwt
import secrets
import base64
import bcrypt
import postgres_management as dbms
from flask_restful import Resource
from flask import request,abort,jsonify
from datetime import datetime,timedelta
from Crypto.Cipher import AES


def DEBUG(x):
    print("-----------------------------\n")
    print(x)
    print("\n-----------------------------")

SECRET_KEY="b4dyko_U8nhqDeHmz2qroc02NShi3bUKqQVocvpImRzAYgIEvIN4XFEozRR66NNvg0o0hFFqfdDtgAe0Ih6XLbTTTQeoiPEzhW82g_gVa5mSCLNOch-lx-swf89BUEYuVyeZpP2b0OaiRUlRtPer_1lrz_I4qpRJT9bqdV4iv48"
PRIVATE_KEY="6ZGyA_XEg9IDVpN4nmof_gmUNlGAbmor"

class User_Login(Resource):
    def post(self):
        data=request.get_json()
        user=dbms.get_user(data["username"])

        if(user!="autherror" and user!="error"):
            if(user[1].encode()==bcrypt.hashpw(data["password"].encode(),user[1].encode())):
                PUBLIC_KEY=secrets.token_urlsafe(12)
                encryptor=AES.new(PRIVATE_KEY,AES.MODE_CFB,PUBLIC_KEY)
                enc_user=encryptor.encrypt(str(user[0]))
                enc_user=base64.b64encode(enc_user).decode('utf-8')
                token=jwt.encode({
                    'uid': enc_user,
                    'pub':PUBLIC_KEY,
                    'iat':datetime.utcnow(),
                    'exp': datetime.utcnow() + timedelta(minutes=30)},SECRET_KEY,algorithm="HS256")

                token=token.decode('UTF-8')
                token=jsonify({
                    "authstatus":"success",
                    "token":token
                })
                return token
            else:
                abort(401)
        elif(user=="autherror"):
            abort(401)
        else:
            abort(500)

class User_Register(Resource):
    def post(self):
        data=request.get_json()
        password=data["password"]
        salt=bcrypt.gensalt()
        hashedpass=bcrypt.hashpw(password.encode(),salt)
        hashedpass=hashedpass.decode()
        user=dbms.register_user(data['firstname'],data['lastname'],data['username'],hashedpass)
        if user=="emailerror":
            abort(401,"Email Error")
        elif user=="nullviolation":
            abort(401,"Null Error")