### Seeding Files

To inject dummy data for the demonstration of the app

Set up replica database locally

Go to `replica` folder

```
sh setup.sh
```

then in the mongo shell

```
rs.initiate({_id:"rs0", members: [{_id:0, host:"127.0.0.1:27017", priority:100}, {_id:1, host:"127.0.0.1:27018", priority:50}, {_id:2, host:"127.0.0.1:27019", arbiterOnly:true}]})
```

In this folder, install the package

```
python3 -m pip install -r requirements.tx
```

To seed the data

```
$ python3 db_init.py
```

If you would like to clean up / drop the database, run:

```
$ python3 db_drop.py
```
