from faker import Faker

faker = Faker('en')

POSSIBLE_USERS = ['Lynn', 'Dinesh', 'Tan', 'Tze Guang', 'Qi Kai', 'Ming Hong']
POSSIBLE_URLS = ['https://i.imgur.com/WAm1CpL.jpg', 'https://i.imgur.com/jeqe4Al.png', 'https://i.imgur.com/rmCxK6Z.jpg',
                 'https://i.imgur.com/dikGGpr.jpg', 'https://i.imgur.com/9wAAxYH.jpg', 'https://i.imgur.com/QBAkMuU.jpg']


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
            'beetleId': str(i),
            'MAC': faker.color(),
            'url': POSSIBLE_URLS[i]
        }
