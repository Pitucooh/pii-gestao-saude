const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pressaoArterial(sistolica, diastolica) {
    if (sistolica < 90 && diastolica < 60) {
        return "Pressão baixa";
    } else if (90 <= sistolica && sistolica < 120 && 60 <= diastolica && diastolica < 80) {
        return "Pressão ótima";
    } else if (120 <= sistolica && sistolica <= 129 && 80 <= diastolica && diastolica <= 84) {
        return "Pressão normal";
    } else if (130 <= sistolica && sistolica <= 139 && 85 <= diastolica && diastolica <= 89) {
        return "Atenção";
    } else if (sistolica>=140 && diastolica >=90) {
        return "Pressão alta";
    }
}

function infos() {
    rl.question("Informe sua pressão sistólica: ", function (sistolica) {
        rl.question("Informe sua pressão diastólica: ", function (diastolica) {
            sistolica = parseInt(sistolica);
            diastolica = parseInt(diastolica);
            var result = pressaoArterial(sistolica, diastolica); // Corrigido para passar ambos os argumentos
            console.log(result);
            rl.close();
        });
    });
}

infos();
