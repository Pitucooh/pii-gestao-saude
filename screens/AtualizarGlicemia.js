import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AtualizarGlicemia = () => {
    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState('');
    const [lastRecord, setLastRecord] = useState(null);

    const calcGlicemia = (glicemia) => {
        if (glicemia < 70) {
            return "Glicemia baixa. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else if (glicemia < 100) {
            return "Glicemia normal.";
        } else if (glicemia >= 100 && glicemia <= 126) {
            return "Atenção! Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else if (glicemia > 126) {
            return "Glicemia alta. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        }
    }

    const handleCalcGlicemia = () => {
        const glicemiaFloat = parseFloat(glicemia);
        if (!isNaN(glicemiaFloat)) {
            const result = calcGlicemia(glicemiaFloat);
            setGlicemiaResult(result);
        } else {
            setGlicemiaResult('Por favor, insira um número válido para glicemia.');
        }
    };

    const handleSave = () => {
        const newRecord = { glicemia: glicemia, result: glicemiaResult, date: new Date() };
        setLastRecord(newRecord);

        // Implemente a lógica para salvar o registro no banco de dados ou local storage
        // Por exemplo, você pode chamar uma API para salvar os dados no servidor

        // Exibir mensagem de confirmação
        Alert.alert(
            'Registro Salvo',
            'O registro da sua glicemia foi salvo com sucesso.',
            [
                { text: 'OK', onPress: () => console.log('Registro salvo') }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text>Atualizar Glicemia</Text>
            {lastRecord && (
                <View style={styles.lastRecord}>
                    <Text>Último Registro:</Text>
                    <Text>Glicemia: {lastRecord.glicemia}</Text>
                    <Text>Resultado: {lastRecord.result}</Text>
                    <Text>Data: {lastRecord.date.toLocaleString()}</Text>
                </View>
            )}
            <TextInput
                placeholder="Informe sua glicemia"
                keyboardType="numeric"
                value={glicemia}
                onChangeText={setGlicemia}
                style={styles.input}
            />
            <Button title="Calcular" onPress={handleCalcGlicemia} />
            <Button title="Salvar" onPress={handleSave} />
            <Text style={styles.glicemiaResult}>{glicemiaResult}</Text>
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
    lastRecord: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    glicemiaResult: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default AtualizarGlicemia;
