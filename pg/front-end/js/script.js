$(function () {

    function exibir_motos() {
        $.ajax({
            url: 'http://localhost:5000/listar_motos',
            method: 'GET',
            dataType: 'json',
            success: listar_motos,
            error: function () {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        //parte modificada
        function listar_motos(resposta) {
            $('#corpoTabelaMotos').empty();;
            for (var i in resposta) {
                lin = '<tr id="linha_' + resposta[i].id + '">' +
                    '<td>' + resposta[i].marca + '</td>' +
                    '<td>' + resposta[i].modelo + '</td>' +
                    '<td>' + resposta[i].velocidade + 'km/h' + '</td>' +
                    '<td>' + resposta[i].peso + 'kg' + '</td>' +
                    '<td>' + resposta[i].cilindradas + '</td>' +
                    '<td><a href=# id="excluir_' + resposta[i].id + '" ' +
                    'class="excluir_moto"><img src="imagens/excluir.png" ' +
                    'alt="Excluir moto" title="Excluir moto" width=40px></a>' +
                    '</td>' +
                    '</tr>';
                $('#corpoTabelaMotos').append(lin);
                $("#TabelaMotos").remove('invisible');
                $("#conteudoInicial").removeClass('invisible');
                $("#corpoTabelaMotos").removeClass('invisible');
            }
        }
    };

    $(document).on("click", "#linkListarMotos", function () {
        exibir_motos();
    });
    $(document).on("click", "#btnIncluirMotos", function validarform() {
        if ((document.getElementById("campoMarca").value.length < 2) || (document.getElementById("campoModelo").value.length < 2) ||
            (document.getElementById("campoVelocidade").value.length < 2) || (document.getElementById("campoPeso").value.length < 2) ||
            (document.getElementById("campoCilindradas").value.length < 1)) {
            alert('Por favor, preencha todos os campos');
        }
        else {
            marca = $("#campoMarca").val();
            modelo = $("#campoModelo").val();
            velocidade = $("#campoVelocidade").val();
            peso = $("#campoPeso").val();
            cilindradas = $("#campoCilindradas").val();
            var dados = JSON.stringify({ marca: marca, modelo: modelo, velocidade: velocidade, peso: peso, cilindradas: cilindradas });
            $.ajax({
                url: 'http://localhost:5000/incluir_moto',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: motoIncluida,
                error: erroAoIncluir
            });
        }
        function motoIncluida(retorno) {
            if (retorno.resultado == "ok") {
                alert("Moto incluída com sucesso!");
                $("#campoMarca").val("");
                $("#campoModelo").val("");
                $("#campoVelocidade").val("");
                $("#campoPeso").val("");
                $("#campoCilindradas").val("");
            }
            else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoIncluir(retorno) {
            alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirMotos').on('hide.bs.modal', function (e) {
        if (!$("#TabelaMotos").hasClass('invisible')) {
            exibir_motos();
        }
    });


    //
    $(document).on("click", ".excluir_moto", function () {
        var componente_clicado = $(this).attr('id');
        var nome_icone = "excluir_";
        var id_moto = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_moto/' + id_moto,
            type: 'DELETE',
            dataType: 'json',
            success: motoExcluida,
            error: erroAoExcluir
        });
        function motoExcluida(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_moto).fadeOut(1000, function () {
                    alert("Moto removida");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
    //

});

function exibir_revendedora() {
    $.ajax({
        url: 'http://localhost:5000/listar_revendedora',
        method: 'GET',
        dataType: 'json',
        success: listar,
        error: function (problema) {
            alert("erro ao ler dados, verifique o backend: ");
        }
    });

    function listar(revendedora) {
        $('#corpoTabelarevendedora').empty();
        for (var i in revendedora) {
            lin = '<tr id="linha_revendedora_' + revendedora[i].id + '">' +
                '<td>' + revendedora[i].localizacao + '</td>' +
                '<td>' + revendedora[i].telefone + '</td>' +
                '<td>' + revendedora[i].montadora + '</td>' +
                // dados da moto
                '<td>' + revendedora[i].moto.marca + '</td>' +
                '<td>' + revendedora[i].moto.modelo + '</td>' +
                '<td>' + revendedora[i].moto.velocidade + '</td>' +
                '<td>' + revendedora[i].moto.peso + '</td>' +
                '<td>' + revendedora[i].moto.cilindradas + '</td>' +
                '<td><a href=# id="excluir_revendedora_' + revendedora[i].id + '" ' +
                'class="excluir_revendedora"><img src="imagens/excluir.png" ' +
                'alt="Excluir revendedora" title="Excluir revendedora"  width=40px></a>' +
                '</td>' +
                '</tr>';
            $('#corpoTabelarevendedora').append(lin);
        }
    }
}

$(document).on("click", "#linkListarrevendedora", function () {
    exibir_revendedora();
});

function exibir_comprador() {
    $.ajax({
        url: 'http://localhost:5000/listar_comprador',
        method: 'GET',
        dataType: 'json',
        success: listar,
        error: function (problema) {
            alert("erro ao ler dados, verifique o backend: ");
        }
    });
    function listar(comprador) {
        $('#corpoTabelacomprador').empty();
        for (var i in comprador) {
            lin = '<tr id="linha_comprador_' + comprador[i].id + '">' +
                '<td>' + comprador[i].nome + '</td>' +
                '<td>' + comprador[i].telefone + '</td>' +
                '<td>' + comprador[i].cpf + '</td>' +
                // dados da moto
                '<td>' + comprador[i].moto.marca + '</td>' +
                '<td>' + comprador[i].moto.modelo + '</td>' +
                '<td>' + comprador[i].moto.velocidade + '</td>' +
                '<td>' + comprador[i].moto.peso + '</td>' +
                '<td>' + comprador[i].moto.cilindradas + '</td>' +
                '<td><a href=# id="excluir_comprador_' + comprador[i].id + '" ' +
                'class="excluir_comprador"><img src="imagens/excluir.png" ' +
                'alt="Excluir comprador" title="Excluir comprador"  width=40px></a>' +
                '</td>' +
                '</tr>';
            $('#corpoTabelacomprador').append(lin);
        }
    }
}

$(document).on("click", "#linkListarcomprador", function () {
    exibir_comprador();
});