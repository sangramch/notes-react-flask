import psycopg2 as ps


def getnotes(userid):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="SELECT * FROM notesdata WHERE uid = {};".format(userid)
        cursor.execute(query)
        noteslist=cursor.fetchall()

        return noteslist
    except:
        return "error"
    finally:
        cursor.close()
        connection.close()

def addnote(userid,title,note):
    try:
        connection=ps.connect(user="sangram", host="localhost", port=5432, database="notesapp")
        cursor=connection.cursor()

        query="""INSERT INTO notesdata(title,note,uid)
        VALUES('{}','{}',{});""".format(title,note,userid)

        cursor.execute(query)
        connection.commit()
    except:
        return error
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
    
    except:
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
    except:
        return "error"

    finally:
        cursor.close()
        connection.close()