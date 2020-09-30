import random
import time
from datetime import datetime
from faker import Faker

faker = Faker('en')

# refer to src/common/moves for the enums
POSSIBLE_MOVES = [0, 1, 2, 3, 4, 5, 6, 7]
POSSIBLE_POSITIONS = [[1, 2, 3], [2, 1, 3], [2, 3, 1],
                      [1, 3, 2], [3, 2, 1], [3, 1, 2]]
TIME_TO_SLEEP = 5  # in seconds


class PredictedMovementSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for predicted movement...')
        for _ in range(30):
            movement = self.generate_movement()
            self._db['predictedmovements'].insert_one(movement)
            time.sleep(TIME_TO_SLEEP)
            print('Predicted movement seeded.')

        print('Completed seeding for predicted movement...')

    def generate_movement(self):
        return {
            'move': random.choice(POSSIBLE_MOVES),
            'position': random.choice(POSSIBLE_POSITIONS),
            'syncDelay': round(random.random(), 2),
            'date': datetime.utcnow().isoformat()
        }
