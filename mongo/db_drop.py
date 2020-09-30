from pymongo import MongoClient


class MongoDatabase:

    def __init__(self):
        self.client = MongoClient('mongodb://0.0.0.0:27011')
        self._db = self.client['cg4002-demo-test']

    def drop_all(self):
        print('Deleting all collections...')
        for collection in self._db.list_collection_names():
            print(collection)
            self._db.drop_collection(collection)
        print('Done.')


mongodb = MongoDatabase()
mongodb.drop_all()
