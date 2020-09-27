from multiprocessing import Process
from pymongo import MongoClient

from seeds.movement import MovementSeeder
from seeds.predicted_movement import PredictedMovementSeeder
from seeds.sensor import SensorSeeder


class MongoDatabase:
    """
    MongoDB database seeding
    """

    def __init__(self):
        self.initialise_connection()
        self.initialise_seeders()

    def initialise_connection(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self._db = self.client['cg4002-demo-test']

    def initialise_seeders(self):
        self.movement_seeder = MovementSeeder(self._db)
        self.predicted_movement_seeder = PredictedMovementSeeder(self._db)
        self.sensor_seeder = SensorSeeder(self._db)

    def seed_all(self):
        """Seeding into collections"""
        # TODO: generate a dance session (???)
        # Execute seedings in parallel
        p1 = Process(target=self.movement_seeder.seed)
        p1.start()
        p2 = Process(target=self.predicted_movement_seeder.seed)
        p2.start()
        p3 = Process(target=self.sensor_seeder.seed)
        p3.start()


mongodb = MongoDatabase()
mongodb.seed_all()
