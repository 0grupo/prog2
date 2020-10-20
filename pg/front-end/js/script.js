$(function() {
    
    function exibir_motos() {
        $.ajax({
            url: 'http://localhost:5000/listar_motos',
            method: 'GET',
            dataType: 'json',
            success: listar_motos,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        //parte modificada
        function listar_motos (resposta) {
            $('#corpoTabelaMotos').empty();
            mostrar_conteudo('TabelaMotos');
            for (var i in resposta) {
                lin = '<tr id="linha_'+resposta[i].id+'">' + 
                '<td>' + resposta[i].marca + '</td>' + 
                '<td>' + resposta[i].modelo + '</td>' + 
                '<td>' + resposta[i].velocidade + 'km/h' + '</td>' + 
                '<td>' + resposta[i].peso + 'kg' + '</td>' + 
                '<td>' + resposta[i].cilindradas + '</td>' + 
                '<td><a href=# id="excluir_' + resposta[i].id + '" ' + 
                  'class="excluir_moto"><img src="imagens/excluir.png" '+
                  'alt="Excluir moto" title="Excluir moto" width=40px></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaMotos').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#TabelaMotos").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarMotos", function() {
        exibir_motos();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
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
            var dados = JSON.stringify({ marca: marca, modelo: modelo, velocidade: velocidade, peso: peso, cilindradas: cilindradas});
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
        function motoIncluida (retorno) {
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
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirMotos').on('hide.bs.modal', function (e) {
        if (! $("#TabelaMotos").hasClass('invisible')) {
            exibir_motos();
        }
    });

    mostrar_conteudo("conteudoInicial");

// add essa parte
    $(document).on("click", ".excluir_moto", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_moto = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_moto/'+id_moto,
            type: 'DELETE', 
            dataType: 'json', 
            success: motoExcluida, 
            error: erroAoExcluir
        });
        function motoExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_moto).fadeOut(1000, function(){
                    alert("Moto removida");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
//

});