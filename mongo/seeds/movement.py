import random
import time
from datetime import datetime

# refer to src/common/moves for the enums
POSSIBLE_MOVES = [1, 2, 3, 4, 5, 6, 7, 8]
POSSIBLE_POSITIONS = ['1 2 3', '2 1 3', '2 3 1',
                      '1 3 2', '3 2 1', '3 1 2']
TIME_TO_SLEEP = 10  # in seconds


class MovementSeeder:
    def __init__(self, db):
        self._db = db

    def seed(self):
        print('Begin seeding for movement...')
        for _ in range(1):
            movement = self.generate_movement()
            self._db['movements'].insert_one(movement)
            time.sleep(TIME_TO_SLEEP)
            print('Movement seeded.')

        # insert logout
        # self._db['movements'].insert_one({
        #     'move': 9,  # 9 for logout
        #     'moves': [random.choice(POSSIBLE_MOVES), random.choice(POSSIBLE_MOVES), random.choice(POSSIBLE_MOVES)],
        #     'position': random.choice(POSSIBLE_POSITIONS),
        #     # ommiting correctPosition cuz of the last position
        #     'syncDelay': round(random.random(), 2),
        #     'date': datetime.utcnow().isoformat()
        # })
        # print('Completed seeding for movement...')

    def generate_movement(self):
        return {
            # predicted
            'move': random.choice(POSSIBLE_MOVES),
            'moves': [random.choice(POSSIBLE_MOVES), random.choice(POSSIBLE_MOVES), random.choice(POSSIBLE_MOVES)],
            'position': random.choice(POSSIBLE_POSITIONS),  # predicted
            'correctPosition': random.choice(POSSIBLE_POSITIONS),
            'syncDelay': round(random.random(), 2),
            'date': datetime.utcnow().isoformat()
        }
