# kdb2db_mysql.py
# このファイルは安易に実行しないでください。
## 実行方法
```
rm -r board/migrations
python3 manage.py makemigrations
python3 manage.py migrate
python3 init/kdb2db_mysql.py
```
## 機能
`kdb2db.py`のMySQL版です。
```
pip install mysqlclient
```
が必要です。

また、
```python
HOST = ""
PORT = 3306
DB = "***"
USER = "**"
PASSWORD="****"

conn = MySQLdb.connect(host=HOST, port=PORT, db=DB, user=USER, password=PASSWORD)
```
を編集しないと動きません。

