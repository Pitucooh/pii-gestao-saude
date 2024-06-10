import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, TextInput, Button, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InnerContainer, PageTitle, Colors, StyledButton, ButtonText, WelcomeContainer, MyTextInput } from './../components/styles';
import Modal from 'react-native-modal';
import { ipMaquina } from '../ips';
import KeyboardWrapper from '../components/KeyboardWrapper';


const { customGreen, backgroundGreen, greenForm, roxinho } = Colors;


const Consultas = () => {
    const navigation = useNavigation();
    
    const [especialidade, setEspecialidade] = useState('');
    const [dataCons, setDataCons] = useState('');
    const [horario, setHorario] = useState('');
    const [resumoCons, setResumo] = useState('');
    const [retorno, setRetorno] = useState('');
    const [lembrete, setLembrete] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSaveAndNavigate = async () => {
        const consulta = { especialidade, dataCons, horario, resumoCons, retorno, lembrete };

        try {
            const storedConsultas = await AsyncStorage.getItem('consultas');
            const consultas = storedConsultas ? JSON.parse(storedConsultas) : [];
            consultas.push(consulta);
            await AsyncStorage.setItem('consultas', JSON.stringify(consultas));

            setEspecialidade('');
            setDataCons('');
            setHorario('');
            setResumo('');
            setRetorno('');
            setLembrete('');

            navigation.navigate('DatasCons', { refresh: true });
        } catch (error) {
            console.error('Erro ao salvar a consulta:', error);
        }
    };

    const SalvarExam = async () => {
        const dataPattern = /^\d{2}-\d{2}-\d{4}$/;
        const horarioPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    
        if (!especialidade || !dataCons || !horario || !resumoCons || !retorno || !lembrete) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }
    
        if (!dataPattern.test(dataCons)) {
            setFeedbackMessage('Data no formato inválido. Use o formato DD-MM-YYYY.');
            return;
        }
    
        if (!horarioPattern.test(horario)) {
            setFeedbackMessage('Horário no formato inválido. Use o formato HH:MM.');
            return;
        }
    
        try {
            const response = await fetch(`http://${ipMaquina}:3000/saveExam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    especialidade,
                    dataCons,
                    horario,
                    resumoCons,
                    retorno,
                    lembrete
                })
            });
    
            const data = await response.json();
    
            console.log('Resposta do servidor:', data); // Logar a resposta do servidor
    
            if (response.ok) {
                Alert.alert(
                    'Exame Salvo',
                    'O registro do seu exame foi salvo com sucesso.',
                    [{ text: 'OK', onPress: handleSaveAndNavigate }],
                    { cancelable: false }
                );
            } else {
                setFeedbackMessage('Erro ao salvar o exame. Por favor, tente novamente mais tarde.');
            }
        } catch (error) {
            setFeedbackMessage('Erro ao salvar o exame.');
        }
    };
    

    return (
        <KeyboardWrapper>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <InnerContainer style={{ backgroundColor: backgroundGreen }}>
                        <WelcomeContainer style={{ backgroundColor: backgroundGreen }}>
                            <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 30, color: customGreen, marginTop: 30, fontSize: 30 }}>
                                CONSULTAS
                            </PageTitle>
                            <Text style={{ color: roxinho, alignItems: 'center' }}>{'Salve aqui seu próximo exame'}</Text>
                        </WelcomeContainer>

                        <View style={styles.inputCon}>
                            <TextInput
                                onChangeText={setEspecialidade}
                                value={especialidade}
                                placeholder="Especialidade:"
                                placeholderTextColor={backgroundGreen}
                                maxLength={50}
                                style={styles.inputDados}
                            />
                            <TextInput
                                onChangeText={setDataCons}
                                value={dataCons}
                                placeholder="Data:"
                                maxLength={10}
                                placeholderTextColor={backgroundGreen}
                                style={[styles.inputDados, { backgroundColor: greenForm, color: backgroundGreen }]}
                            />
                            <TextInput
                                onChangeText={setHorario}
                                value={horario}
                                maxLength={5}
                                placeholder="Horário:"
                                placeholderTextColor={backgroundGreen}
                                style={[styles.inputDados, { backgroundColor: greenForm, color: backgroundGreen }]}
                            />

                            <View style={styles.notesContainer}>
                                <Text style={styles.notesText}>Bloco de Notas:</Text>
                                <TextInput
                                    style={{backgroundColor: backgroundGreen, borderRadius: 10, padding: 5}}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder="Anote aqui as observações das consultas"
                                    value={resumoCons}
                                    onChangeText={setResumo}
                                />
                            </View>

                            <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 20, color: customGreen, fontSize: 20 }}>
                                Retorno e lembrete
                            </PageTitle>
                            <TextInput
                                onChangeText={setRetorno}
                                value={retorno}
                                placeholder="Retorno:"
                                maxLength={50}
                                placeholderTextColor={backgroundGreen}
                                style={[styles.inputDados, { color: backgroundGreen }]}
                            />
                            <TextInput
                                onChangeText={setLembrete}
                                value={lembrete}
                                placeholder="Lembrete Agendamento:"
                                maxLength={50}
                                placeholderTextColor={backgroundGreen}
                                style={[styles.inputDados, { color: backgroundGreen }]}
                            />
                        </View>
                        {feedbackMessage ? <Text style={styles.errorMessage}>{feedbackMessage}</Text> : null}

                        <View style={{ height: 2, backgroundColor: roxinho, width: '79%', marginTop: 15, marginBottom: 15 }}></View>

                        <StyledButton style={styles.button} onPress={SalvarExam}>
                            <ButtonText>Salvar</ButtonText>
                        </StyledButton>

                        <Modal isVisible={isModalVisible}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>{modalMessage}</Text>
                                <Button title="Fechar" onPress={() => setIsModalVisible(false)} />
                            </View>
                        </Modal>
                    </InnerContainer>
                </TouchableWithoutFeedback>
                </KeyboardWrapper>
    );
};

const styles = StyleSheet.create({
    notesContainer: {
        backgroundColor: roxinho,
        borderRadius: 10,
        padding: 10,
        marginBottom: 7,
        width: '100%',
        alignSelf: 'center',
    },
    notesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: backgroundGreen,
    },
    notesInput: {
        height: 70,
        backgroundColor: backgroundGreen,
        padding: 5,
        color: roxinho,
    },
    inputCon: {
        backgroundColor: backgroundGreen,
        color: backgroundGreen,
    },
    button: {
        borderRadius: 5,
        backgroundColor: roxinho,
        marginBottom: 20,
        padding: 1
    },
    errorMessage: {
        color: 'red',
        fontSize: 15,
        opacity: 0.8,
        marginTop: 3,
        marginBottom: 3,
        paddingHorizontal: 5,
        paddingVertical: 2,
        textAlign: 'center',
    },
    inputDados: {
        borderRadius: 10,
        color: backgroundGreen,
        marginBottom: 10, 
        padding: 12, 
        backgroundColor: greenForm, 
    },
});

export default Consultas;
