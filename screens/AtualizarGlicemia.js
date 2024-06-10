import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback, Animated, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    WelcomeContainer,
} from './../components/styles';

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

const STORAGE_KEY = 'glicemiaRecords';

const AtualizarGlicemia = () => {
    const [showInput, setShowInput] = useState(false);
    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState(''); 
    const [pilha, setPilha] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                if (jsonValue !== null) {
                    const savedRecords = JSON.parse(jsonValue);
                    setPilha(savedRecords);
                }
            } catch (error) {
                console.error('Erro ao carregar registros:', error);
            }
        };
        loadRecords();
    }, []);

    useEffect(() => {
        const saveRecords = async () => {
            try {
                const jsonValue = JSON.stringify(pilha);
                await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
            } catch (error) {
                console.error('Erro ao salvar registros:', error);
            }
        };
        saveRecords();
    }, [pilha]);

    const calcGlicemia = (glicemia) => {
        let result = '';
        if (glicemia < 70) {
            result = "Glicemia baixa. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else if (glicemia < 100) {
            result = "Glicemia normal.";
        } else if (glicemia >= 100 && glicemia <= 126) {
            result = "Atenção! Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else if (glicemia > 126) {
            result = "Glicemia alta. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        }
        return result;
    };

    const handleAddRecord = () => {
        setShowInput(true);
        setAdding(false);
    };

    const handleSave = () => {
        const glicemiaValue = parseFloat(glicemia);
        const glicemiaResultValue = calcGlicemia(glicemiaValue);
        setGlicemiaResult(glicemiaResultValue); // Atualizando o estado glicemiaResult
        const newRecord = { glicemia: glicemiaValue, result: glicemiaResultValue, date: new Date() };
        setPilha(prevPilha => [...prevPilha, newRecord]);
        setGlicemia('');
        setAdding(false);
        Alert.alert(
            'Registro Salvo',
            'O registro da sua glicemia foi salvo com sucesso.',
            [{ text: 'OK', onPress: () => setShowInput(false) }],
            { cancelable: false }
        );
    };
    
    
    const handleCancel = () => {
        setShowInput(false);
        setGlicemia('');
        setGlicemiaResult('');
        setAdding(false);
    };

    const handleDeleteRecord = (index) => {
        const updatedPilha = [...pilha];
        updatedPilha.splice(index, 1);
        setPilha(updatedPilha);
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1;
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours();
        const minutes = formattedDate.getMinutes();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedDay}/${formattedMonth}/${year}, ${formattedHours}:${formattedMinutes}`;
    };

    const renderRightActions = (progress, dragX, index) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
        });

        return (
            <TouchableWithoutFeedback onPress={() => handleDeleteRecord(index)}>
                <Animated.View style={[styles.rightAction, { transform: [{ scale: trans }] }]}>
                    <Text style={styles.actionText}>Deletar</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    };

   return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <PageTitle style={styles.pageTitle}>Glicemia</PageTitle>
                    <Text style={styles.subTitle}>Atualize sua glicemia colocando seus dados mais recentes</Text>
                    {showInput ? (
                        <View style={styles.inputButtonContainer}>
                            <View style={styles.inputContainer}>
                                <StyledInputLabel>Informe sua Glicemia</StyledInputLabel>
                                <StyledTextInput
                                    placeholder="Digite sua glicemia"
                                    keyboardType="numeric"
                                    value={glicemia}
                                    onChangeText={text => setGlicemia(text)}
                                />
                                <View style={styles.buttonContainer}>
                                    <StyledButton onPress={handleSave}>
                                        <ButtonText>Salvar</ButtonText>
                                    </StyledButton>
                                    <StyledButton onPress={handleCancel} style={styles.cancelButton}>
                                        <ButtonText>Cancelar</ButtonText>
                                    </StyledButton>
                                </View>
                                <MsgBox>{glicemiaResult}</MsgBox>
                            </View>
                        </View>
                    ) : (
                        <>
                            {pilha.map((record, index) => (
                                <Swipeable
                                    key={index}
                                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
                                >
                                    <View style={styles.recordContainer}>
                                        <Text style={styles.boldText}>Data:</Text>
                                        <Text style={styles.recordText}>{formatDate(record.date)}</Text>
                                        <Text style={styles.boldText}>Glicemia:</Text>
                                        <Text style={styles.recordText}>{record.glicemia}</Text>
                                        <Text style={styles.boldText}>Resultado:</Text>
                                        <Text style={styles.recordText}>{record.result}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteRecord(index)}
                                            style={styles.deleteButton}
                                        >
                                            <Text style={styles.deleteButtonText}>Excluir</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>
                            ))}
                        </>
                    )}
                </View>
        </ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={adding}
        onRequestClose={() => setAdding(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Adicionar Registro de Glicemia</Text>
                    {adding && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Digite a sua glicemia"
                                keyboardType="numeric"
                                value={glicemia}
                                onChangeText={text => {
                                    setGlicemia(text);
                                    setGlicemiaResult(calcGlicemia(parseFloat(text)));
                                }}
                                style={styles.input}
                            />
                            <Text style={styles.pressaoResult}>{glicemiaResult}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
            </TouchableWithoutFeedback>
            </Modal>
        {!adding && (
            <TouchableOpacity style={styles.addButton} onPress={() => setAdding(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        )}
    </KeyboardAvoidingView>
);

};
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: backgroundGreen,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollContainer: {
            flexGrow: 1,
        },
        content: {
            width: '100%',
            alignItems: 'center',
        },
        pageTitle: {
            lineHeight: 30,
            color: customGreen,
            fontSize: 30,
            marginTop: 30,
        },
        subTitle: {
            color: roxinho,
            textAlign: 'center',
            marginBottom: 10,
            fontSize: 16,
        },
        recordContainer: {
            backgroundColor: greenForm,
            padding: 15,
            marginVertical: 10,
            width: '100%',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: greenForm,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        recordText: {
            color: backgroundGreen,
        },
        boldText: {
            color: backgroundGreen,
            fontWeight: 'bold',
        },
        inputButtonContainer: {
            width: '100%',
            alignItems: 'center',
        },
        inputContainer: {
            marginTop: 20,
            width: '70%',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
            backgroundColor: greenForm,
            color: backgroundGreen,
        },
        pressaoResult: {
            color: 'black',
            marginTop: 10,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            flex: 1,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            color: backgroundGreen,
            marginHorizontal: 5,
        },
        saveButton: {
            backgroundColor: customGreen,
            color: backgroundGreen
        },
        cancelButton: {
            backgroundColor: '#8c3030',
            color: backgroundGreen
        },
        addButton: {
            backgroundColor: customGreen,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            marginLeft: 270,
        },
        addButtonText: {
            color: '#fff',
            fontSize: 30,
            lineHeight: 30,
        },
        resultText: {
            marginTop: 20,
            fontSize: 18,
            fontWeight: 'bold',
        },
        rightAction: {
            backgroundColor: '#dd2c00',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 8,
            width: 100,
        },
        actionText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        },
        modalContent: {
            backgroundColor: backgroundGreen,
            padding: 20,
            borderRadius: 10,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            color: backgroundGreen
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: customGreen,
        },
        box: {
            width: 0, 
            height: 100,
            backgroundColor: 'red',
            marginTop: 20,
        },
        deleteButton: {
            backgroundColor: '#8c3030',
            padding: 5,
            borderRadius: 5,
            marginLeft: '80%',
            width: 55
        },
        deleteButtonText: {
            color: 'white',
        },
    });
    
    export default AtualizarGlicemia;
