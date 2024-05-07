const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcGlicemia(glicemia) {
    if (glicemia < 70) {
        return "Glicemia baixa";
    } else if (glicemia < 100) {
        return "Glicemia normal";
    } else if (glicemia >= 100 && glicemia <= 126) {
        return "Atenção!";
    } else if (glicemia > 126) {
        return "Glicemia alta";
    }
}

function infos() {
    rl.question("Informe o valor de sua glicemia: ", function(glicemia) {
        glicemia = parseFloat(glicemia);
        
        var result = calcGlicemia(glicemia);
        console.log(result);
        rl.close();
    });
}

infos();
