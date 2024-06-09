import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Animated, Modal, } from 'react-native';
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


  
const AtualizarGlicemia = () => {
    const [showInput, setShowInput] = useState(false);
    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState('');
    const [pilha, setPilha] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); 
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
        const newRecord = { glicemia: glicemia, result: glicemiaResult, date: new Date() };
        setPilha(prevPilha => [...prevPilha, newRecord]);
        setShowInput(false);
        setGlicemia('');
        setGlicemiaResult('');
        Alert.alert(
            'Registro Salvo',
            'O registro da sua glicemia foi salvo com sucesso.',
            [{ text: 'OK', onPress: () => console.log('Registro salvo') }],
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
                    <Text style={styles.title}>Glicemia</Text>
                    <Text style={styles.descriptionText}>
                        Atualize sua glicemia colocando seus dados mais recentes
                    </Text>
                    {showInput ? (
                        <>
                            <Text style={styles.subtitle}>Informe sua Glicemia</Text>
                            <TextInput
                                placeholder="Digite sua glicemia"
                                keyboardType="numeric"
                                value={glicemia}
                                onChangeText={text => {
                                    setGlicemia(text);
                                    setGlicemiaResult(calcGlicemia(parseFloat(text)));
                                }}
                                style={styles.input}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.resultText}>{glicemiaResult}</Text>
                        </>
                    ) : (
                        <>
                            {pilha.map((record, index) => (
                                <Swipeable
                                    key={index}
                                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
                                >
                                    <View style={styles.recordContainer}>
                                        <Text style={styles.recordText}>Data: {formatDate(record.date)}</Text>
                                        <Text style={styles.recordText}>Glicemia: {record.glicemia}</Text>
                                        <Text style={styles.recordText}>Resultado: {record.result}</Text>
                                    </View>
                                </Swipeable>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
            {!adding && (
                <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={adding}
                onRequestClose={() => {
                    setAdding(!adding);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adicionar Registro de Pressão</Text>
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
            </Modal>

           
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
    title: {
        lineHeight: 30,
        color: customGreen,
        fontSize: 30,
        marginTop: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    descriptionText: {
        color: roxinho,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    record: {
        padding: 10,
        marginTop: 10,
        backgroundColor: greenForm,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 2,
        borderColor: greenForm,
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    recordLabel: {
        fontWeight: 'bold',
        color: backgroundGreen,
    },
    recordValue: {
        color: backgroundGreen,
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
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: customGreen,
    },
    cancelButton: {
        backgroundColor: '#8c3030',
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
    updateButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    recordContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    recordText: {
        fontSize: 16,
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
    },
    box: {
        width: 0, 
        height: 100,
        backgroundColor: 'red',
        marginTop: 20,
      },
});


export default AtualizarGlicemia;
