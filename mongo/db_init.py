from multiprocessing import Process
from pymongo import MongoClient

from seeds.movement import MovementSeeder


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

    def seed_all(self):
        """Seeding into collections"""
        # TODO: generate a dance session (???)
        # Execute seeding in parallel
        p1 = Process(target=self.movement_seeder.seed)
        p1.start()


mongodb = MongoDatabase()
mongodb.seed_all()
