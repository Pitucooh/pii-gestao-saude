const readline = require('readline');
const Pilha = require('./../Pilha');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const historicoPressoes = new Pilha();


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
            // Adicionando o novo registro à pilha
            historicoPressoes.push({sistolica, diastolica, dataHora: new Date()});
            console.log(result);
            rl.close();
            // Chamando a função exibirHistorico após inserir as informações de pressão
            exibirHistorico();
        });
    });
}

function exibirHistorico() {
    console.log("Histórico de Pressões Arteriais:");
    let temp = new Pilha();
    while (!historicoPressoes.isEmpty()) {
        const registro = historicoPressoes.pop();
        console.log(`Sistólica: ${registro.sistolica}, Diastólica: ${registro.diastolica}, Data/Hora: ${registro.dataHora}`);
        temp.push(registro);
    }

    // Restaurando a pilha original
    while (!temp.isEmpty()) {
        historicoPressoes.push(temp.pop());
    }
}


infos();
