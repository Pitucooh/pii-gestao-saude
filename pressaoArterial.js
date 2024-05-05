const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pressaoArterial (sistolica, diastolica){
    if(sistolica < 90 && diastolica < 60){
        return "Pressão baixa";
    } else if(90<= sistolica < 120 && 60<=diastolica < 80){
        return "Pressão ótima";
    } else if (120 <= sistolica <= 129 && 80 <= diastolica <= 84){
        return "Pressão normal";
    } else if(130<= sistolica <= 139 && 85 <= diastolica <= 89){
        return "Atenção";
    } else{
        return "Pressão alta";
    }
}

function infos(){
    rl.question("Informe sua pressão sistólica: ", function(sistolica){
        rl.question("Informe sua pressão diastlica: ", function(diastolica){
            sistolica = parseInt(sistolica);
            diastolica = parseInt(diastolica);
            var result = pressaoArterial (sistolica);
            console.log(result);
            rl.close();
        });
    });
}
infos();
