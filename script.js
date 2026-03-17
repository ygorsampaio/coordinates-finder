document.getElementById('btnBuscar').onclick = function() {
    var termo = document.getElementById('inputLocal').value;
    var painel = document.getElementById('resultado');

    if (termo === "") {
        alert("Digite um nome!");
        return;
    }

    painel.innerHTML = "Buscando...";

    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(termo);

    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(dados) {
            if (dados.length > 0) {
                var local = dados[0];
                var googleLink = "https://www.google.com/maps?q=" + local.lat + "," + local.lon;
                
                painel.innerHTML = 
                    '<div class="card">' +
                        '<p><strong>Local:</strong> ' + local.display_name + '</p>' +
                        '<p><strong>Lat:</strong> ' + local.lat + '</p>' +
                        '<p><strong>Lon:</strong> ' + local.lon + '</p>' +
                        '<a href="' + googleLink + '" target="_blank" style="color:blue;">Ver no Mapa</a>' +
                    '</div>';
            } else {
                painel.innerHTML = "Lugar não encontrado.";
            }
        })
        .catch(function(erro) {
            painel.innerHTML = "Erro ao conectar.";
            console.log(erro);
        });
};
