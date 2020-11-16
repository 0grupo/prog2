from config import *

class Moto(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    modelo = db.Column(db.String(254))
    velocidade = db.Column(db.String(254))
    peso = db.Column(db.String(254))
    cilindradas = db.Column(db.String(254))

    def _str_(self):
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

class Revendedora(db.Model):

    id = db.Column(db.Integer, primary_key=True) 
    localizacao = db.Column(db.String(254)) 
    montadora = db.Column(db.String(254))
    telefone = db.Column(db.Integer)
    moto_id = db.Column(db.Integer, db.ForeignKey(Moto.id))
    moto = db.relationship("Moto")

    def _str_(self): 
        return self.localizacao + ", " + self.montadora +\
            str(self.telefone) + str(self.moto)

    def json(self):
        return ({
            "id": self.id,
            "localizacao": self.localizacao,
            "montadora": self.montadora,
            "telefone": self.telefone,
            "moto_id": self.moto_id,
            "moto": self.moto.json()
        }) 

class Comprador(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    telefone = db.Column(db.Integer)
    nome = db.Column(db.String(254))
    cpf = db.Column(db.Integer)
    moto_id = db.Column(db.Integer, db.ForeignKey(Moto.id))
    moto = db.relationship("Moto")

    def _str_(self):
        return str(self.telefone) + ", " + self.nome +\
            str(self.cpf)+ str(self.moto)

    def json(self):
        return ({
            "id":self.id,
            "telefone":self.telefone,
            "nome": self.nome,
            "cpf": self.cpf,
            "moto_id": self.moto_id,
            "moto": self.moto.json()
        })