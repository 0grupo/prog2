from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    m1 = Moto(marca = "Yamaha", modelo = "XT 600", 
    velocidade = "170", peso = "181", cilindradas = "659,7")
    m2 = Moto(marca = "Harley-Davidson", modelo = "CG 160 Titan", 
    velocidade = "130", peso = "121", cilindradas = "162,7")
    m3 = Moto(marca = "Honda", modelo = "Iron 883", 
    velocidade = "160", peso = "256", cilindradas = "883")

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.commit()
    
    print(m1.json())
    print(m2.json())
    print(m3.json())
