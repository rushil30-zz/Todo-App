import psycopg2
from flask import Flask, make_response, request,jsonify
import datetime
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import asc, desc
from flask_cors import CORS
# from functools import wraps
c_date = datetime.datetime.now()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'
cors = CORS(app)
conn = psycopg2.connect(database = "postgres", user = "postgres", password = "testpwd", host = "127.0.0.1", port = "5432")
cur = conn.cursor()

def datadict(data):
    data_list=[]
    for i in data:
        dic = {}
        dic['id']=i[0]
        dic['content']=i[1]
        dic['date'] = i[2]
        data_list.append(dic)
    #print(data_list)
    return data_list

@app.route('/getdata')   
def getdata():
    cur.execute("select id, task, datetime from todo1")
    rows = cur.fetchall()  
    data = datadict(rows)
    res = make_response(jsonify(data), 200)
    return res        

@app.route('/addtodo', methods=['POST'])
def addtodo():
    req = request.get_json()
    date = c_date
    content = req['content']
    id = req['id']
    # update
    if (id !=''):
        date = date
        content = content
        cur.execute("update todo1 set task=%s, datetime = %s where id=%s",(content,date,id))
        conn.commit()
        cur.execute("select id, task, datetime from todo1")
        rows = cur.fetchall()
    # add new    
    else:
        cur.execute("insert into todo1 (task, datetime) values (%s,%s)",(content, date)) 
        conn.commit()
        cur.execute("select id, task, datetime from todo1")
        rows = cur.fetchall()   
    # tasks = rows     
    tasks = datadict(rows)
    # print(type(tasks))
    res = make_response(jsonify(tasks), 200)
    return (res)


@app.route('/updatedata/<int:id>', methods=['GET','POST'])
def updatedata(id):
    print(id)
    #print("Updated list...............")
    query = f"select id, task ,datetime from todo1 where id = '{id}';"
    cur.execute(query)
    task = cur.fetchone()
    data = {}
    data['id'] = task[0]
    data['task'] = task[1]
    data['datetime'] = task[2]
    res = make_response(jsonify(data), 200)
    # print(data)
    return res  

@app.route('/deletedata/<int:id>', methods = ['GET', 'POST'])
def deletedata(id):
    # print("Working")
    cur.execute("delete from todo1 where id ={0}".format(id))
    conn.commit()
    cur.execute("select id, task, datetime from todo1")
    rows = cur.fetchall()
    tasks = rows
    data = datadict(tasks)
    res = make_response(jsonify(data), 200)
    return res                  

@app.route('/ascending', methods=['GET', 'POST'])
def ascending():
    cur.execute("select * from todo1 order by datetime asc")
    rows = cur.fetchall()
    data = datadict(rows)
    res = make_response(jsonify(data), 200)
    return res

@app.route('/descending', methods=['GET', 'POST'])
def descending():
    cur.execute("select * from todo1 order by datetime desc")
    rows = cur.fetchall()
    data = datadict(rows)
    res = make_response(jsonify(data), 200)
    return res    
    
@app.route('/todaydata', methods = ['GET'])
def todaydata():
    cur.execute(f"select * from todo1 where datetime < '{c_date}'" )
    rows = cur.fetchall()
    data = datadict(rows)
    res = make_response(jsonify(data), 200)
    return res


if __name__ == '__main__':   
    app.run(debug = True)

