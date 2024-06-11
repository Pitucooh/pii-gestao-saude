import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';import Icon from 'react-native-vector-icons/Ionicons';


const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

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

const AtualizarPressao = () => {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pressaoResult, setPressaoResult] = useState('');
    const [records, setRecords] = useState([]);
    const [adding, setAdding] = useState(false);
    const [showAdvice, setShowAdvice] = useState({});

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const savedRecords = await AsyncStorage.getItem('pressaoRecords');
                if (savedRecords) {
                    setRecords(JSON.parse(savedRecords));
                }
            } catch (error) {
                console.error('Failed to load records', error);
            }
        };
        loadRecords();
    }, []);

    useEffect(() => {
        const saveRecords = async () => {
            try {
                await AsyncStorage.setItem('pressaoRecords', JSON.stringify(records));
            } catch (error) {
                console.error('Failed to save records', error);
            }
        };
        saveRecords();
    }, [records]);

    const calcPressao = (sistolica, diastolica) => {
        if (sistolica < 120 && diastolica < 80) {
            return "Pressão arterial normal. Continue mantendo um estilo de vida saudável!";
        } else if (sistolica >= 120 && sistolica < 130 && diastolica < 80) {
            return "Pressão arterial elevada. Considere fazer mudanças no estilo de vida.";
        } else if ((sistolica >= 130 && sistolica < 140) || (diastolica >= 80 && diastolica < 90)) {
            return "Hipertensão estágio 1. Procure orientação médica.";
        } else if (sistolica >= 140 || diastolica >= 90) {
            return "Hipertensão estágio 2. É importante buscar tratamento médico.";
        } else {
            return "Crise hipertensiva. Procure atendimento médico imediatamente.";
        }
    };

    const handleSave = () => {
        const sistolicaInt = parseInt(sistolica);
        const diastolicaInt = parseInt(diastolica);
        if (!isNaN(sistolicaInt) && !isNaN(diastolicaInt)) {
            const pressao = calcPressao(sistolicaInt, diastolicaInt);
            setPressaoResult(pressao); // Definindo o resultado da pressão arterial
            setCurrentAdvice(pressao); // Atualizando o conselho atual
            const date = new Date().toLocaleString();
            const newRecord = { sistolica, diastolica, pressao, date, key: `${records.length}` };
            setRecords([newRecord, ...records]);
            setSistolica('');
            setDiastolica('');
            setAdding(false);
    
            Alert.alert(
                'Registro Salvo',
                'O registro da sua pressão arterial foi salvo com sucesso.',
                [{ text: 'OK', onPress: () => console.log('Registro salvo') }],
                { cancelable: false }
            );
        } else {
            Alert.alert('Erro', 'Por favor, insira números válidos para sistólica e diastólica.');
        }
    };
    

    const [currentAdvice, setCurrentAdvice] = useState('');

    
    const handleCancel = () => {
        setSistolica('');
        setDiastolica('');
        setPressaoResult('');
        setAdding(false);
    };

    const handleDelete = (key) => {
        setRecords(records.filter(record => record.key !== key));
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
                    <Text style={styles.title}>Atualizar Pressão Arterial</Text>
                    <Text style={styles.descriptionText}>
                        Atualize sua pressão colocando seus dados mais recentes
                    </Text>
                    {records.map((item, index) => (
                        <View key={index} style={styles.record}>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Data:</Text>
                                <Text style={styles.recordValue}>{item.date}</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Sistólica:</Text>
                                <Text style={styles.recordValue}>{item.sistolica} mmHg</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Diastólica:</Text>
                                <Text style={styles.recordValue}>{item.diastolica} mmHg</Text>
                            </View>
                            <View style={styles.recordRow}>
                                <Text style={styles.recordLabel}>Resultado:</Text>
                                
                            </View>
                            <View style={styles.recordRow}>
                                <TouchableOpacity style={styles.adviceButton} onPress={() => toggleAdvice(item.key)}>
                                    <Text style={styles.adviceButtonText}>Mostrar Conselho</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.key)}>
                                    <Text style={styles.deleteButtonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                            {showAdvice[item.key] && <Text style={styles.adviceText}>{item.pressao}</Text>}
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
                            <Text style={styles.modalTitle}>Adicionar Registro de Pressão</Text>
                            <StyledInputLabel>Pressão sistólica</StyledInputLabel>
                            <TextInput
                                placeholder="Sistólica (mmHg)"
                                keyboardType="numeric"
                                value={sistolica}
                                onChangeText={(text) => setSistolica(text)}
                                style={styles.input}
                            />
                            <StyledInputLabel>Pressão diastólica</StyledInputLabel>
                            <TextInput
                                placeholder="Diastólica (mmHg)"
                                keyboardType="numeric"
                                value={diastolica}
                                onChangeText={(text) => setDiastolica(text)}
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
        marginTop: 23,
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

export default AtualizarPressao;
