import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ipMaquina } from '../ips';
import {
    InnerContainer,
    PageTitle,
    Colors,
    StyledButton,
    ButtonText,
    WelcomeContainer,
    MyTextInput
} from './../components/styles';

const { customGreen, backgroundGreen, greenForm, roxinho } = Colors;

import Modal from 'react-native-modal';

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

    const handleSaveAndNavigate = (examId) => {
        navigation.navigate('DataCons', { examId });
    };

    const SalvarExam = async () => {
        const dataPattern = /^\d{2}-\d{2}-\d{4}$/;
        const horarioPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!especialidade || !dataCons || !horario || !retorno || !lembrete) {
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

            if (response.ok) {
                const examId = data.id; // supondo que a resposta contenha um campo 'id'
                Alert.alert(
                    'Exame Salvo',
                    'O registro do seu exame foi salvo com sucesso.',
                    [{ text: 'OK', onPress: () => {
                        setEspecialidade('');
                        setDataCons('');
                        setHorario('');
                        setResumo('');
                        setRetorno('');
                        setLembrete('');
                        handleSaveAndNavigate(examId);
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
                    <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 30, color: customGreen, marginTop:30, fontSize: 30 }}>
                        CONSULTAS
                    </PageTitle>
                    
                    <Text style={{ color: roxinho, alignItems: 'center' }}>{'Salve aqui seu próximo exame'}</Text>
                </WelcomeContainer>

                <View style={styles.inputCon}>
                    <MyTextInput
                        onChangeText={setEspecialidade}
                        value={especialidade}
                        placeholder="Especialidade:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: greenForm, color: backgroundGreen, borderRadius: 10 }}
                    />
                    <MyTextInput
                        onChangeText={setDataCons}
                        value={dataCons}
                        placeholder="Data:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: greenForm, color: backgroundGreen }}
                    />
                    <MyTextInput
                        onChangeText={setHorario}
                        placeholder="Horário:"
                        placeholderTextColor={backgroundGreen}
                        style={{ backgroundColor: greenForm, color: backgroundGreen }}
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

                    <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 20, color: customGreen, fontSize: 20 }}>
                        Retorno e lembrete
                    </PageTitle>
                    <MyTextInput
                        onChangeText={setRetorno}
                        placeholder="Retorno:"
                        placeholderTextColor={backgroundGreen}
                        inputStyle={{
                            
                            borderRadius: 10,
                            borderWidth: 0,
                            textAlign: 'left',
                            color: backgroundGreen
                        }}
                    />
                    <MyTextInput
                        onChangeText={setLembrete}
                        placeholder="Lembrete Agendamento:"
                        placeholderTextColor={backgroundGreen}
                        inputStyle={{
                            backgroundColor: greenForm,
                            borderRadius: 10,
                            borderWidth: 0,
                            textAlign: 'left',
                            color: backgroundGreen
                        }}
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
        borderRadius: 10,
        padding: 5,
        color: roxinho
    },
    inputCon: {
        backgroundColor: backgroundGreen,
        color: backgroundGreen,

    },
    button: {
        
        borderRadius: 5,
        backgroundColor: roxinho,
        marginBottom: 20,
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
});

export default Consultas;
