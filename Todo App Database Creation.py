import psycopg2
conn = psycopg2.connect(database = "postgres", user = "postgres", password = "testpwd", host = "127.0.0.1", port = "5432")
print("Opened database successfully")

cur = conn.cursor()
cur.execute('''create table todo1
                (ID serial primary key,
                Task text not null,
                DateTime timestamp not null);''')

print("Table created successfully")



