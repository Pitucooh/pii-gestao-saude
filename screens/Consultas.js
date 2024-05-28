import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, Alert, Platform } from 'react-native';
import axios from 'axios';
import { ipMaquina } from '../ips';
import { KeyboardAvoidingView } from 'react-native';

const { primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black, roxinho } = Colors;

import {
    InnerContainer,
    PageTitle,
    Colors,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    MyTextInput
} from './../components/styles';

import Modal from 'react-native-modal';

const Consultas = ({ navigation }) => {
    const [especialidade, setEspecialidade] = useState('');
    const [dataCons, setDataCons] = useState('');
    const [horario, setHorario] = useState('');
    const [resumoCons, setResumo] = useState('');
    const [retorno, setRetorno] = useState('');
    const [lembrete, setLembrete] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const SalvarExam = async () => {

        const dataPattern = /^\d{2}-\d{2}-\d{4}$/;  // Formato DD-MM-YYYY
        const horarioPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;  // Formato HH:MM

        if (!especialidade || !dataCons || !horario || !retorno || !lembrete) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }
    
        // Verificar se a data está no formato correto
        if (!dataPattern.test(dataCons)) {
            setFeedbackMessage('Data no formato inválido. Use o formato DD-MM-YYYY.');
            return;
        }
    
        // Verificar se o horário está no formato correto
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
    
            if (response.ok) {
                Alert.alert(
                    'Exame Salvo',
                    'O registro do seu exame foi salvo com sucesso.',
                    [{ text: 'OK', onPress: () => {
                        // Limpar os inputs após o usuário fechar o alerta
                        setEspecialidade('');
                        setDataCons('');
                        setHorario('');
                        setResumo('');
                        setRetorno('');
                        setLembrete('');
                    }}],
                    { cancelable: false }
                );
            } else {
                setFeedbackMessage('Erro ao salvar o exame. Por favor, tente novamente mais tarde.');
            }                                                     
        } catch (error) {
            console.error(error);
            setFeedbackMessage('Erro ao salvar o exame.');
        }
    };
    
        return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <InnerContainer style={{ backgroundColor: backgroundGreen }}>
                <WelcomeContainer style={{ backgroundColor: backgroundGreen }}>
                    <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 30, color: customGreen, marginTop: 25, fontSize: 30 }}>
                        CONSULTAS
                    </PageTitle>
                    
                    
                    <Text style={{ color: roxinho, alignItems: 'center' }}>{'Salve aqui seu próximo exame'}</Text>
                    
                </WelcomeContainer>

                <View style={styles.inputCon}>
                    <MyTextInput
                        onChangeText={setEspecialidade}
                        placeholder="Especialidade:"
                        placeholderTextColor={backgroundGreen} // Certifique-se de definir a cor do texto do placeholder
                        style={{ backgroundColor: customGreen, color: backgroundGreen }}
                    />
                    <MyTextInput
                        onChangeText={setDataCons}
                        placeholder="Data:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: customGreen, color: backgroundGreen }}
                    />
                    <MyTextInput
                        onChangeText={setHorario}
                        placeholder="Horário:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: customGreen, color: backgroundGreen }}
                    />

                    <View style={styles.notesContainer}>
                                                <Text style={styles.notesText}>Bloco de Notas:</Text>
                                                <TextInput
                                                    style={styles.notesInput}
                                                    multiline={true}
                                                    numberOfLines={4}
                                                    placeholder="Anote aqui as observações das consultas"
                                                />
                    </View>
                    <MyTextInput
                        onChangeText={setRetorno}
                        placeholder="Retorno:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: customGreen, color: backgroundGreen }}
                    />
                    <MyTextInput
                        onChangeText={setLembrete}
                        placeholder="Lembrete Agendamento:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: customGreen, color: backgroundGreen }}
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
    );
}

const styles = StyleSheet.create({

    notesContainer: {
        backgroundColor: roxinho,
        borderRadius: 10,
        padding: 10,
        
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
        borderRadius: 5,
        padding: 5,
        color: customGreen
    },

    inputCon: {
        backgroundColor: backgroundGreen,
        
        color: backgroundGreen,
        padding: 10,
        width: '90%',
        textAlign: 'left',
    },
    button: {
        width: 100,
        padding: 10,
        borderRadius: 5,
        backgroundColor: roxinho,
        marginBottom: 20,
    },
    errorMessage: {
        color: 'red',
        fontSize: 15, // Reduzindo o tamanho da fonte
        opacity: 0.8, // Reduzindo a opacidade para tornar o texto menos proeminente
        marginTop: 3, // Reduzindo a margem superior para encolher o espaço ocupado
        marginBottom: 3, // Reduzindo a margem inferior para encolher o espaço ocupado
        paddingHorizontal: 5, // Adicionando preenchimento horizontal para encolher o espaço ocupado
        paddingVertical: 2, // Adicionando preenchimento vertical para encolher o espaço ocupado
        textAlign: 'center',
    },
});

export default Consultas;
