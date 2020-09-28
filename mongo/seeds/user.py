from faker import Faker

faker = Faker('en')

POSSIBLE_USERS = ['Lynn', 'Dinesh', 'Tan', 'Tze Guang', 'Qikai', 'Ming Hong']


class UserSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for user data...')

        users = [self.generate_user(i) for i in range(6)]
        self._db['users'].insert_many(users)

        print('Completed seeding for users...')

    def generate_user(self, i):
        return {
            'name': POSSIBLE_USERS[i],
            'beetleId': i,
            'MAC': faker.color(),
            'url': 'https://tinyurl.com/y2oaju7c'
        }
