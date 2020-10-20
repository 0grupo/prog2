from config import *
from classe import Moto

@app.route("/")
def inicio():
    return 'Sistema para cadastrar motos. '+\
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
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

#add essa parte
@app.route("/excluir_moto/<int:moto_id>", methods=['DELETE'])
def excluir_moto(moto_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Moto.query.filter(Moto.id == moto_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 
#

app.run(debug=True)