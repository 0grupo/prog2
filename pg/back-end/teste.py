from classe import *
import os

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    m1 = Moto(marca = "Yamaha", modelo = "XT 600", 
    velocidade = "170 km/h", peso = "181 kg", cilindradas = "659,7")
    m2 = Moto(marca = "Harley-Davidson", modelo = "CG 160 Titan", 
    velocidade = "130 km/h", peso = "121 kg", cilindradas = "162,7")
    m3 = Moto(marca = "Honda", modelo = "Iron 883", 
    velocidade = "160 km/h", peso = "256 kg", cilindradas = "883")

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.commit()
    
    print(m1.json())
    print(m2.json())
    print(m3.json())
