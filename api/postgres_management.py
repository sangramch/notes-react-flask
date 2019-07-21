import psycopg2 as ps

#CRUD OPERATIONS ON NOTES TABLE
def getnotes(userid):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="SELECT * FROM notesdata WHERE uid = {};".format(userid)
        cursor.execute(query)
        noteslist=cursor.fetchall()

        cursor.close()
        connection.close()

        return noteslist
    except Exception as e:
        cursor.close()
        connection.close()
        print(e)
        return "error"

def addnote(userid,title,note):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""INSERT INTO notesdata(title,note,uid)
        VALUES('{}','{}',{});""".format(title,note,userid)

        cursor.execute(query)
        connection.commit()
    except Exception as e:
        cursor.close()
        connection.close()
        print(e)
        return "error"
    finally:
        cursor.close()
        connection.close()

def updatenote(userid,noteid,title,note):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""UPDATE notesdata
        SET title='{}',note='{}'
        WHERE id={} and uid={};""".format(title,note,noteid,userid)

        cursor.execute(query)
        connection.commit()
    
    except Exception as e:
        cursor.close()
        connection.close()
        print(e)
        return "error"

    finally:
        cursor.close()
        connection.close()

def deletenote(userid,noteid):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""DELETE FROM notesdata
        WHERE id={} and uid={};""".format(noteid,userid)

        cursor.execute(query)
        connection.commit()
    except Exception as e:
        cursor.close()
        connection.close()
        print(e)
        return "error"

    finally:
        cursor.close()
        connection.close()



#USER MANAGEMENT SECTION
def get_user(username):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""SELECT id,firstname,pass from users
        WHERE email='{}';""".format(username)

        cursor.execute(query)
        user=cursor.fetchone()

        cursor.close()
        connection.close()

        if user is not None:
            return user
        return "autherror"

    except Exception as e:
        print(e)
        cursor.close()
        connection.close()

        return "error"

def register_user(firstname,lastname,username,password):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""INSERT INTO users(firstname,lastname,email,pass)
        VALUES('{}','{}','{}','{}');""".format(firstname,lastname,username,password)

        cursor.execute(query)
        connection.commit()

        cursor.close()
        connection.close()
    
    except Exception as e:
        cursor.close()
        connection.close()
        if e.pgcode=='23505':
            return("emailerror")
        elif e.pgcode=='23502':
            return("nullviolation")
        print(e)
        return ("error")