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

    r1 = Revendedora(localizacao = "Blumenau", telefone ="3333-3333", montadora = "Yamaha", moto = m1)

    c1 = Comprador(telefone = "99999-9999", nome = "Arnaldo", cpf = "012.012.012-12", moto = m1)

    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)

    db.session.add(r1)

    db.session.add(c1)
    
    db.session.commit()
    
    print(m1.json())
    print(m2.json())
    print(m3.json())

    print(r1.json())
    
    print(c1.json())
