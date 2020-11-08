from multiprocessing import Process
from pymongo import MongoClient

from seeds.user import UserSeeder
from seeds.dance import DanceSeeder
from seeds.movement import MovementSeeder
from seeds.sensor import SensorSeeder
from seeds.reset import ResetSeeder


class MongoDatabase:
    """
    MongoDB database seeding
    """

    def __init__(self):
        self.initialise_connection()
        self.initialise_seeders()

    def initialise_connection(self):
        self.client = MongoClient('mongodb://0.0.0.0:27011')
        self._db = self.client['cg4002-demo-test']

    def initialise_seeders(self):
        self.user_seeder = UserSeeder(self._db)
        self.dance_seeder = DanceSeeder(self._db)
        self.movement_seeder = MovementSeeder(self._db)
        self.sensor_seeder = SensorSeeder(self._db)
        self.reset_seeder = ResetSeeder(self._db)

    def seed_all(self):
        """Seeding into collections"""
        # self.user_seeder.seed()
        # self.dance_seeder.seed()

        # Execute seedings in parallel
        p1 = Process(target=self.movement_seeder.seed)
        p1.start()
        p2 = Process(target=self.reset_seeder.seed)
        p2.start()
        p3 = Process(target=self.sensor_seeder.seed)
        p3.start()


mongodb = MongoDatabase()
mongodb.seed_all()
