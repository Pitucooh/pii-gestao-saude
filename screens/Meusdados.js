import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

import {
    InnerContainer,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar
} from './../components/styles';

import KeyboardWrapper from './../components/KeyboardWrapper';
import Pilha from './../Pilha';

const Meusdados = ({ navigation }) => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imcResult, setImcResult] = useState('');

    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pressaoResult, setPressaoResult] = useState('');
    const [historicoPressoes, setHistoricoPressoes] = useState(new Pilha());

    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState('');

    const calcIMC = (peso, altura) => {
        const alturaMetros = altura / 100;
        const imc = peso / (alturaMetros * alturaMetros);

        if (imc < 18.5) {
            return "Abaixo do peso";
        } else if (imc >= 18.5 && imc < 25) {
            return "Normal";
        } else if (imc >= 25 && imc < 30) {
            return "Sobrepeso";
        } else if (imc >= 30 && imc < 35) {
            return "Obesidade I";
        } else if (imc >= 35 && imc < 40) {
            return "Obesidade II";
        } else {
            return "Obesidade grave";
        }
    }

    const calcPressaoArterial = (sistolica, diastolica) => {
        if (sistolica < 90 && diastolica < 60) {
            return "Pressão baixa";
        } else if (90 <= sistolica && sistolica < 120 && 60 <= diastolica && diastolica < 80) {
            return "Pressão ótima";
        } else if (120 <= sistolica && sistolica <= 129 && 80 <= diastolica && diastolica <= 84) {
            return "Pressão normal";
        } else if (130 <= sistolica && sistolica <= 139 && 85 <= diastolica && diastolica <= 89) {
            return "Atenção";
        } else if (sistolica >= 140 && diastolica >= 90) {
            return "Pressão alta";
        }
    }

    const calcGlicemia = (glicemia) => {
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

    const handleCalculateIMC = () => {
        const pesoFloat = parseFloat(peso);
        const alturaFloat = parseFloat(altura);
        if (!isNaN(pesoFloat) && !isNaN(alturaFloat)) {
            const result = calcIMC(pesoFloat, alturaFloat);
            setImcResult(result);
        } else {
            setImcResult('Por favor, insira números válidos para peso e altura.');
        }
    }

    const handleCalculatePressao = () => {
        const sistolicaInt = parseInt(sistolica);
        const diastolicaInt = parseInt(diastolica);
        if (!isNaN(sistolicaInt) && !isNaN(diastolicaInt)) {
            const result = calcPressaoArterial(sistolicaInt, diastolicaInt);
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
    }

    const handleCalculateGlicemia = () => {
        const glicemiaFloat = parseFloat(glicemia);
        if (!isNaN(glicemiaFloat)) {
            const result = calcGlicemia(glicemiaFloat);
            setGlicemiaResult(result);
        } else {
            setGlicemiaResult('Por favor, insira um número válido para glicemia.');
        }
    }

    return (
        <>
            <StatusBar style="light" />
            <KeyboardWrapper>
                <InnerContainer>
                    <WelcomeContainer>
                        <Avatar resizeMode="cover" source={require('./../assets/logo.png')} />
                        <SubTitle welcome={true}>Fulano</SubTitle>

                        <View style={styles.card}>
                            <Text>IMC</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Peso (kg)"
                                    keyboardType="numeric"
                                    value={peso}
                                    onChangeText={setPeso}
                                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Altura (cm)"
                                    keyboardType="numeric"
                                    value={altura}
                                    onChangeText={setAltura}
                                    style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                                />
                                <Button
                                    title="Calcular"
                                    onPress={handleCalculateIMC}
                                />
                            </View>
                            <Text style={{ marginTop: 10 }}>{imcResult}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text>Pressão Arterial</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Sistólica"
                                    keyboardType="numeric"
                                    value={sistolica}
                                    onChangeText={setSistolica}
                                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, marginRight: 10 }}
                                />
                                <TextInput
                                    placeholder="Diastólica"
                                    keyboardType="numeric"
                                    value={diastolica}
                                    onChangeText={setDiastolica}
                                    style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                                />
                                <Button
                                    title="Calcular"
                                    onPress={handleCalculatePressao}
                                />
                            </View>
                            <Text style={{ marginTop: 10 }}>{pressaoResult}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text>Glicemia</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    placeholder="Informe sua glicemia"
                                    keyboardType="numeric"
                                    value={glicemia}
                                    onChangeText={setGlicemia}
                                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, marginRight: 10 }}
                                />
                                <Button
                                    title="Calcular"
                                    onPress={handleCalculateGlicemia}
                                />
                            </View>
                            <Text style={{ marginTop: 10 }}>{glicemiaResult}</Text>
                        </View>

                        <StyledFormArea>
                            <Line />
                            <StyledButton onPress={() => { navigation.navigate('Login') }}>
                                <ButtonText>Logout</ButtonText>
                            </StyledButton>
                        </StyledFormArea>
                    </WelcomeContainer>
                </InnerContainer>
            </KeyboardWrapper>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
});

export default Meusdados;
