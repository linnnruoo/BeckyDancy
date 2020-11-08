import time
from datetime import datetime
from faker import Faker

faker = Faker('en')

TIME_TO_SLEEP = 5  # in seconds


class ResetSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for reset flag...')
        for _ in range(30):
            reset_flag = self.generate_sensor()
            self._db['resets'].insert_one(reset_flag)
            time.sleep(TIME_TO_SLEEP)
            print('Reset flag seeded.')

        print('Completed seeding for reset flags...')

    def generate_sensor(self):
        return {
            'packetType': 1,
            'date': datetime.utcnow().isoformat()
        }
