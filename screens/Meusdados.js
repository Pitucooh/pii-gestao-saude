import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
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

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const calcIMC = (peso, altura) => {
        const alturaMetros = altura / 100;
        const imc = peso / (alturaMetros * alturaMetros);

        if (imc < 18.5) {
            return "Você está um pouco abaixo do peso ideal, seria interessante mudar seus habitos, que tal procurar um nutricionista para ganhar peso com saúde?";
        } else if (imc >= 18.5 && imc < 25) {
            return "Uou, que incrível, você está no seu peso ideal, parabéns!!, mas não se esquece, sempre mantenha uma alimentação saldável e busque fazer exercícios físicos.";
        } else if (imc >= 25 && imc < 30) {
            return "Sobrepeso. Eita, acho que está na hora de prestar atenção no seu peso, tome cuidado com sua alimentação, pratique exercícios físicos, sua saúde pode melhorar muito com isso.";
        } else if (imc >= 30 && imc < 35) {
            return "Obesidade I. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde.";
        } else if (imc >= 35 && imc < 40) {
            return "Obesidade II. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde.";
        } else {
            return "Obesidade grave. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disse, é sempre importante realizar algum tipo de atividade física, isso vai ajudar e muito sua saúde.";
        }
    }

    const calcPressaoArterial = (sistolica, diastolica) => {
        if (sistolica < 90 && diastolica < 60) {
            return "Pressão baixa. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma.";
        } else if (90 <= sistolica && sistolica < 120 && 60 <= diastolica && diastolica < 80) {
            return "Pressão ótima. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece.";
        } else if (120 <= sistolica && sistolica <= 129 && 80 <= diastolica && diastolica <= 84) {
            return "Pressão normal. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece.";
        } else if (130 <= sistolica && sistolica <= 139 && 85 <= diastolica && diastolica <= 89) {
            return "Atenção. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma.";
        } else if (sistolica >= 140 && diastolica >= 90) {
            return "Pressão alta. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma.";
        }
    }

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

    const handleCalculateIMC = () => {
        const pesoFloat = parseFloat(peso);
        const alturaFloat = parseFloat(altura);
        if (!isNaN(pesoFloat) && !isNaN(alturaFloat)) {
            const result = calcIMC(pesoFloat, alturaFloat);
            setImcResult(result);
            setModalMessage(result);
            setModalVisible(true);
        } else {
            setImcResult('Por favor, insira números válidos para peso e altura.');
            setModalMessage('Por favor, insira números válidos para peso e altura.');
            setModalVisible(true);
        }
    }

    const handleCalculatePressao = () => {
        const sistolicaInt = parseInt(sistolica);
        const diastolicaInt = parseInt(diastolica);
        if (!isNaN(sistolicaInt) && !isNaN(diastolicaInt)) {
            const result = calcPressaoArterial(sistolicaInt, diastolicaInt);
            setPressaoResult(result);
            setModalMessage(result);
            setModalVisible(true);
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
            setModalMessage('Por favor, insira números válidos para pressão arterial.');
            setModalVisible(true);
        }
    }

    const handleCalculateGlicemia = () => {
        const glicemiaFloat = parseFloat(glicemia);
        if (!isNaN(glicemiaFloat)) {
            const result = calcGlicemia(glicemiaFloat);
            setGlicemiaResult(result);
            setModalMessage(result);
            setModalVisible(true);
        } else {
            setGlicemiaResult('Por favor, insira um número válido para glicemia.');
            setModalMessage('Por favor, insira um número válido para glicemia.');
            setModalVisible(true);
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
                            </View>
                            <StyledButton onPress={handleCalculateIMC}>
                                <ButtonText>Calcular IMC</ButtonText>
                            </StyledButton>
                            <Text>{imcResult}</Text>
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
                            </View>
                            <StyledButton onPress={handleCalculatePressao}>
                                <ButtonText>Calcular Pressão</ButtonText>
                            </StyledButton>
                            <Text>{pressaoResult}</Text>
                        </View>

                        <View style={styles.card}>
                            <Text>Glicemia</Text>
                            <TextInput
                                placeholder="Glicemia"
                                keyboardType="numeric"
                                value={glicemia}
                                onChangeText={setGlicemia}
                                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                            />
                            <StyledButton onPress={handleCalculateGlicemia}>
                                <ButtonText>Calcular Glicemia</ButtonText>
                            </StyledButton>
                            <Text>{glicemiaResult}</Text>
                        </View>

                        <StyledButton onPress={() => navigation.navigate('Login')}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </WelcomeContainer>
                </InnerContainer>
            </KeyboardWrapper>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Meusdados;
