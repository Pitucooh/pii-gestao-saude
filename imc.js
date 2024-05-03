const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcIMC(imc){
    if(imc<18.5){
        return "Abaixo do peso";
    } else if(18.5 <= imc <= 14.9){
        return "Normal";
    }else if(25 <= imc <= 29.9){
        return "Sobrepeso";
    }else if(30 <= imc <= 34.9){
        return "Obesidade I";
    }else if(35 <= imc <= 39.9){
        return "Obesidade II";
    }else{
        return "Obesidade grave";
    }
}

function infos(){
    rl.question("Informe seu IMC: ", function(imc){
        imc = parseFloat(imc);

        var result = calcIMC(imc);
        console.log(result);
        rl.close();
    });
}

infos();