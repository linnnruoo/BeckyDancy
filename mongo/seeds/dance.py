from faker import Faker
from datetime import datetime

faker = Faker('en')


class DanceSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Creating 1 active dance session')

        dance = self.generate_dance()
        self._db['dances'].insert_one(dance)

        print('Completed seeding for the dance session...')

    def generate_dance(self):
        # select 3 users, make them into dancers
        users = [x for x in self._db['users'].find().limit(3)]
        dancers = [
            {'dancerNo': i+1, 'userId': str(user['_id']), 'beetleId': str(user['beetleId'])} for i, user in enumerate(users)]

        return {
            'dancers': dancers,
            'status': 1,  # 1 means active
            'date': datetime.utcnow().isoformat()
        }
