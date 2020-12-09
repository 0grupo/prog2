from config import *
from classe import Moto, Revendedora, Comprador


@app.route("/")
def inicio():
    return 'Sistema para cadastrar motos. ' +\
        '<a href="/listar_motos">Listar Motos</a>'


@app.route("/listar_motos")
def listar_motos():
    motos = db.session.query(Moto).all()
    retorno = []
    for i in motos:
        retorno.append(i.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_moto", methods=['post'])
def incluir_moto():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Moto(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

# add essa parte


@app.route("/excluir_moto/<int:moto_id>", methods=['DELETE'])
def excluir_moto(moto_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Moto.query.filter(Moto.id == moto_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta
#


@app.route("/listar_revendedora")
def listar_revendedora():
    revendedora = db.session.query(Revendedora).all()
    lista_jsons = [x.json() for x in revendedora]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/listar_comprador")
def listar_comprador():
    comprador = db.session.query(Comprador).all()
    lista_jsons = [x.json() for x in comprador]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/listar/<string:classe>")
def listar(classe):
    dados = None
    if classe == "revendedora":
        dados = db.session.query(Revendedora).all()
    if classe == "moto":
        dados = db.session.query(Moto).all()
    if classe == "comprador":
        dados = db.session.query(Comprador).all()
    lista_jsons = [x.json() for x in dados]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_revendedora", methods=['post'])
def incluir_revendedora():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Revendedora(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_comprador", methods=['post'])
def incluir_comprador():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try:
        nova = Comprador(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


app.run(debug=True)
app.run(debug=True)
