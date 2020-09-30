import random
import time
from datetime import datetime
from faker import Faker

faker = Faker('en')

POSSIBLE_DANCER_NO = [1, 2, 3]
TIME_TO_SLEEP = 0.5  # in seconds


class SensorSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for sensor data...')
        for _ in range(300):
            sensor = self.generate_movement()
            self._db['sensors'].insert_one(sensor)
            time.sleep(TIME_TO_SLEEP)
            print('Sensor data seeded.')

        print('Completed seeding for sensor data...')

    def generate_movement(self):
        return {
            # 'dancerNo': random.choice(POSSIBLE_DANCER_NO),
            'dancerNo': 1,
            'accelerometer': {
                "x": round(random.random(), 2),
                "y": round(random.random(), 2),
                "z": round(random.random(), 2),
            },
            'gyroscope': {
                "x": round(random.random(), 2),
                "y": round(random.random(), 2),
                "z": round(random.random(), 2),
            },
            'date': datetime.utcnow().isoformat()
        }
