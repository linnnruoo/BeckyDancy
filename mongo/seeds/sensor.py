import random
import time
from datetime import datetime
from faker import Faker

faker = Faker('en')

TIME_TO_SLEEP = 0.2  # in seconds


class SensorSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for sensor data...')
        for i in range(300):
            sensor = self.generate_sensor(i)
            self._db['sensors'].insert_one(sensor)
            time.sleep(TIME_TO_SLEEP)
            print('Sensor data seeded.')

        print('Completed seeding for sensor data...')

    def generate_sensor(self, i):
        return {
            'dancerNo': i % 3 + 1,
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
