from config import *

class Moto(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    modelo = db.Column(db.String(254))
    velocidade = db.Column(db.String(254))
    peso = db.Column(db.String(254))
    cilindradas = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+", " + self.marca + ", " +\
            self.modelo + ", " + self.velocidade + ", " +\
            self.peso + ", " + self.cilindradas

    def json(self):
        return ({
            "id": self.id,
            "marca": self.marca,
            "modelo": self.modelo,
            "velocidade": self.velocidade,
            "peso": self.peso,
            "cilindradas": self.cilindradas
        })