$( document ).ready(function() {
    
    $("#conteudoInicial").removeClass("invisible");

    $("#link_motos").click(function(){
       
        $.ajax({
            url: "http://localhost:5000/listar_motos",
            method: "GET",
            dataType: "json",
            success: listar_motos,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
    });

        function listar_motos (resultado) {
            linhas = ""
            for (var i in resultado) { 
                lin = "<tr>" + 
                "<td>" + resultado[i].marca + "</td>" + 
                "<td>" + resultado[i].modelo + "</td>" + 
                "<td>" + resultado[i].velocidade + "</td>" +
                "<td>" + resultado[i].peso + "</td>" +
                "<td>" + resultado[i].cilindradas + "</td>" + 
                "</tr>";
                linhas = linhas + lin;
            }

            $("#corpoTabelaMotos").html(linhas);

            $("#conteudoInicial").addClass("invisible");
            $("#TabelaMotos").addClass("invisible");
            
            $("#TabelaMotos").removeClass("invisible");
        }
    });
  });