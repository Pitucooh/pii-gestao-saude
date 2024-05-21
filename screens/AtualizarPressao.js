import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Pilha from '../Pilha'; 

const AtualizarPressao = () => {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pressaoResult, setPressaoResult] = useState('');
    const [historicoPressoes, setHistoricoPressoes] = useState(new Pilha());

    function pressaoArterial(sistolica, diastolica) {
        if (sistolica < 90 && diastolica < 60) {
            return "Pressão baixa. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        } else if (90 <= sistolica && sistolica < 120 && 60 <= diastolica && diastolica < 80) {
            return "Pressão ótima. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece";
        } else if (120 <= sistolica && sistolica <= 129 && 80 <= diastolica && diastolica <= 84) {
            return "Pressão normal. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece";
        } else if (130 <= sistolica && sistolica <= 139 && 85 <= diastolica && diastolica <= 89) {
            return "Atenção. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        } else if (sistolica>=140 && diastolica >=90) {
            return "Pressão alta. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        }
    }
    

    const handleCalcPressao = () => {
        const sistolicaInt = parseInt(sistolica);
        const diastolicaInt = parseInt(diastolica);
        if (!isNaN(sistolicaInt) && !isNaN(diastolicaInt)) {
            const result = pressaoArterial(sistolicaInt, diastolicaInt);
            setPressaoResult(result);
            // Criando uma cópia da pilha de histórico
            const newHistoricoPressoes = new Pilha([...historicoPressoes.toArray()]);
            // Adicionando o novo registro à cópia da pilha de histórico
            const dataHora = new Date();
            const novoRegistro = { sistolica: sistolicaInt, diastolica: diastolicaInt, dataHora };
            newHistoricoPressoes.push(novoRegistro);
            // Atualizando o estado com a cópia modificada
            setHistoricoPressoes(newHistoricoPressoes);
        } else {
            setPressaoResult('Por favor, insira números válidos para pressão arterial.');
        }
    };

    const exibirHistorico = () => {
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
    };

    const handleSave = () => {
        // Implemente a lógica para salvar o registro no banco de dados ou local storage
        // Por exemplo, você pode chamar uma API para salvar os dados no servidor

        // Exibir mensagem de confirmação
        Alert.alert(
            'Registro Salvo',
            'O registro da sua pressão arterial foi salvo com sucesso.',
            [
                { text: 'OK', onPress: () => console.log('Registro salvo') }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text>Atualizar Pressão Arterial</Text>
            <TextInput
                placeholder="Sistólica (mmHg)"
                keyboardType="numeric"
                value={sistolica}
                onChangeText={setSistolica}
                style={styles.input}
            />
            <TextInput
                placeholder="Diastólica (mmHg)"
                keyboardType="numeric"
                value={diastolica}
                onChangeText={setDiastolica}
                style={styles.input}
            />
            <Button title="Calcular" onPress={handleCalcPressao} />
            <Text style={styles.pressaoResult}>{pressaoResult}</Text>
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Exibir Histórico" onPress={exibirHistorico} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    pressaoResult: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default AtualizarPressao;

