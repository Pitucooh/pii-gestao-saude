const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcIMC(imc){
    if(imc<18.5){
        return "Você está um pouco abaixo do peso ideal, seria interessante mudar seus habitos, que tal procurar um nutricionista para ganhar peso com saúde?";
    } else if(18.5 <= imc <= 14.9){
        return "Uou, que incrível, você está no se peso ideal, parabéns!!, mas não se esquece, sempre mantenha uma alimentação saldável e busque fazer exercícios físicos";
    }else if(25 <= imc <= 29.9){
        return "Eita, acho que está na hora de prestar atenção no seu peso, tome cuidado com sua alimentação, pratique exercícios físicos, sua saúde pode melhorar muito com isso";
    }else if(30 <= imc <= 34.9){
        return "Obesidade I. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde";
    }else if(35 <= imc <= 39.9){
        return "Obesidade II. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde";
    }else{
        return "Obesidade grave, Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde";
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