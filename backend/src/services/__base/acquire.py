from config.settings import settings


class Acquire:
    def __init__(self):
        self.settings = settings
        self.schemas = {}
        self.services = {}
