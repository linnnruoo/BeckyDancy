from faker import Faker

faker = Faker('en')

POSSIBLE_USERS = ['Lynn', 'Qi Kai', 'Ming Hong', 'Dinesh', 'Tan', 'Tze Guang']
BEETLE_IDS = ['c8:df:84:fe:43:54', '2c:ab:33:cc:6c:ad', '2c:ab:33:cc:5c:22',
              'c8:df:84:fe:3f:df', '2c:ab:33:cc:6c:84', '2c:ab:33:cc:6a:92']
POSSIBLE_URLS = ['https://i.imgur.com/WAm1CpL.jpg', 'https://i.imgur.com/9wAAxYH.jpg', 'https://i.imgur.com/QBAkMuU.jpg',
                 'https://i.imgur.com/jeqe4Al.png', 'https://i.imgur.com/rmCxK6Z.jpg', 'https://i.imgur.com/dikGGpr.jpg']


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
            'beetleId': BEETLE_IDS[i],
            'MAC': faker.color(),
            'url': POSSIBLE_URLS[i]
        }
