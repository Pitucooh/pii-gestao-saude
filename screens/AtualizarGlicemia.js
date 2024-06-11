import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState('');
    const [stack, setStack] = useState([]);
    const [adding, setAdding] = useState(false);
    const [showAdvice, setShowAdvice] = useState({});

    useEffect(() => {
        const loadStack = async () => {
            try {
                const savedStack = await AsyncStorage.getItem('glicemiaStack');
                if (savedStack) {
                    setStack(JSON.parse(savedStack));
                }
            } catch (error) {
                console.error('Failed to load stack', error);
            }
        };
        loadStack();
    }, []);

    useEffect(() => {
        const saveStack = async () => {
            try {
                await AsyncStorage.setItem('glicemiaStack', JSON.stringify(stack));
            } catch (error) {
                console.error('Failed to save stack', error);
            }
        };
        saveStack();
    }, [stack]);

    const calcGlicemia = (glicemia) => {
        if (glicemia < 70) {
            return "Glicemia baixa. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else if (glicemia < 100) {
            return "Glicemia normal.";
        } else if (glicemia >= 100 && glicemia <= 126) {
            return "Atenção! Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        } else {
            return "Glicemia alta. Seus exames apresentam algum tipo de alteração, é indicado procurar atendimento médico para avaliação.";
        }
    };

    const handleSave = () => {
        const glicemiaValue = parseFloat(glicemia);
        if (!isNaN(glicemiaValue)) {
            const glicemiaResultValue = calcGlicemia(glicemiaValue);
            const date = new Date().toLocaleString();
            const newRecord = { glicemia: glicemiaValue, result: glicemiaResultValue, date, key: `${stack.length}` };
            setStack([newRecord, ...stack]);
            setGlicemia('');
            setAdding(false);
    
            Alert.alert(
                'Registro Salvo',
                'O registro da sua glicemia foi salvo com sucesso.',
                [{ text: 'OK', onPress: () => console.log('Registro salvo') }],
                { cancelable: false }
            );
        } else {
            Alert.alert('Erro', 'Por favor, insira um valor válido para a glicemia.');
        }
    };

    const handleCancel = () => {
        setGlicemia('');
        setGlicemiaResult('');
        setAdding(false);
    };

    const handleDelete = () => {
        if (stack.length > 0) {
            setStack(stack.slice(1));
        } else {
            Alert.alert('Erro', 'Nenhum registro para excluir.');
        }
    };

    const toggleAdvice = (key) => {
        setShowAdvice((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: backgroundGreen }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>GLICEMIA</Text>
                    <Text style={styles.descriptionText}>
                        Atualize sua glicemia colocando seus dados mais recentes
                    </Text>
                    {stack.map((item, index) => (
                        <View key={index} style={styles.record}>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Data:</Text>
                                <Text style={styles.recordValue}>{item.date}</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Glicemia:</Text>
                                <Text style={styles.recordValue}>{item.glicemia} mg/dL</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Resultado:</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <TouchableOpacity style={styles.adviceButton} onPress={() => toggleAdvice(item.key)}>
                                    <Text style={styles.adviceButtonText}>Mostrar Conselho</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                    <Text style={styles.deleteButtonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                            {showAdvice[item.key] && <Text style={styles.adviceText}>{item.result}</Text>}
                        </View>
                    ))}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={adding}
                        onRequestClose={() => setAdding(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Adicionar Registro de Glicemia</Text>
                                <StyledInputLabel>Glicemia</StyledInputLabel>
                                <TextInput
                                    placeholder="Glicemia (mg/dL)"
                                    keyboardType="numeric"
                                    value={glicemia}
                                    onChangeText={(text) => setGlicemia(text)}
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
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
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
    title: {
        lineHeight: 30,
        color: customGreen,
        fontSize: 30,
        marginTop: 50,
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
        width: '100%',
        marginLeft: 5,
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
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 5,
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
        padding: 5,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: customGreen,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
        lineHeight: 30,
    },
    adviceButton: {
        backgroundColor: customGreen,
        padding: 5,
        borderRadius: 5,
    },
    adviceButtonText: {
        color: 'white',
    },
    deleteButton: {
        backgroundColor: '#8c3030',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
        width: 55,
    },
    deleteButtonText: {
        color: 'white',
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: customGreen,
    },
    adviceButton2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        borderColor: roxinho,
        marginBottom: 7
    },
    adviceButtonText2: {
        color: roxinho,
        
    },

    adviceText:{
        color:backgroundGreen,
        fontStyle: 'italic',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: greenForm,
        color: backgroundGreen
    },
});

export default AtualizarGlicemia;
