import random
import time
from datetime import datetime
from bson import ObjectId

# refer to src/common/moves for the enums
POSSIBLE_MOVES = [0, 1, 2, 3, 4, 5, 6, 7]
POSSIBLE_POSITIONS = [[1, 2, 3], [2, 1, 3], [2, 3, 1],
                      [1, 3, 2], [3, 2, 1], [3, 1, 2]]
TIME_TO_SLEEP = 5  # in seconds


class MovementSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for movement...')
        # TODO: seed at a rate of every 5 seconds
        for _ in range(30):
            movement = self.generate_movement()
            self._db['movements'].insert_one(movement)
            time.sleep(5)
            print('Movement seeded.')

        print('Completed seeding for movement...')

    def generate_movement(self):
        return {
            '_id': ObjectId(),
            'danceId': ObjectId(),
            'move': random.choice(POSSIBLE_MOVES),
            'position': random.choice(POSSIBLE_POSITIONS),
            'date': datetime.utcnow().isoformat()
        }
