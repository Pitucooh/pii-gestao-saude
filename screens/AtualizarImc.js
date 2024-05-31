import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const AtualizarIMC = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imcResult, setImcResult] = useState('');
    const [records, setRecords] = useState([]);
    const [adding, setAdding] = useState(false);
    const [showAdvice, setShowAdvice] = useState({});

    useEffect(() => {
        const loadRecords = async () => {
            try {
                const savedRecords = await AsyncStorage.getItem('imcRecords');
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
                await AsyncStorage.setItem('imcRecords', JSON.stringify(records));
            } catch (error) {
                console.error('Failed to save records', error);
            }
        };
        saveRecords();
    }, [records]);

    const calcIMC = (peso, altura) => {
        const alturaMetros = altura / 100;
        const imc = peso / (alturaMetros * alturaMetros);
        if (imc < 18.5) {
            return "Você está um pouco abaixo do peso ideal, seria interessante mudar seus hábitos, que tal procurar um nutricionista para ganhar peso com saúde?";
        } else if (imc >= 18.5 && imc < 25) {
            return "Uau, que incrível, você está no seu peso ideal, parabéns!! Mas não se esqueça, sempre mantenha uma alimentação saudável e busque fazer exercícios físicos.";
        } else if (imc >= 25 && imc < 30) {
            return "Sobrepeso. Eita, acho que está na hora de prestar atenção no seu peso, tome cuidado com sua alimentação, pratique exercícios físicos, sua saúde pode melhorar muito com isso.";
        } else if (imc >= 30 && imc < 35) {
            return "Obesidade I. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disso, é sempre importante realizar algum tipo de atividade física, isso vai ajudar muito a sua saúde.";
        } else if (imc >= 35 && imc < 40) {
            return "Obesidade II. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disso, é sempre importante realizar algum tipo de atividade física, isso vai ajudar muito a sua saúde.";
        } else {
            return "Obesidade grave. Huum, acho que está na hora de se cuidar um pouco mais, o que acha de passar com um endocrinologista ou um nutricionista para avaliar como você pode melhorar sua saúde e alimentação? Além disso, é sempre importante realizar algum tipo de atividade física, isso vai ajudar muito a sua saúde.";
        }
    }

    const handleSave = () => {
        const pesoFloat = parseFloat(peso);
        const alturaFloat = parseFloat(altura);
        if (!isNaN(pesoFloat) && !isNaN(alturaFloat)) {
            const imc = calcIMC(pesoFloat, alturaFloat);
            const date = new Date().toLocaleString();
            const newRecord = { peso, altura, imc, date, key: `${records.length}` };
            setRecords([newRecord, ...records]);
            setPeso('');
            setAltura('');
            setImcResult('');
            setShowAdvice({});
            setAdding(false);

            Alert.alert(
                'Registro Salvo',
                'O registro do seu IMC foi salvo com sucesso.',
                [{ text: 'OK', onPress: () => console.log('Registro salvo') }],
                { cancelable: false }
            );
        } else {
            Alert.alert('Erro', 'Por favor, insira números válidos para peso e altura.');
        }
    };

    const handleCancel = () => {
        setPeso('');
        setAltura('');
        setImcResult('');
        setAdding(false);
    };

    const handleDelete = (key) => {
        setRecords(records.filter(record => record.key !== key));
    };

    const toggleAdvice = (key) => {
        setShowAdvice(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: backgroundGreen }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <Text style={styles.title}>Atualizar IMC</Text>
            <Text style={styles.descriptionText}>
                Atualize seu IMC colocando seus dados mais recentes
            </Text>
            <View>
                {records.map((item, index) => (
                    <View key={index} style={styles.record}>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordLabel}>Data:</Text>
                            <Text style={styles.recordValue}>{item.date}</Text>
                        </View>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordLabel}>Peso:</Text>
                            <Text style={styles.recordValue}>{item.peso} kg</Text>
                        </View>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordLabel}>Altura:</Text>
                            <Text style={styles.recordValue}>{item.altura} cm</Text>
                        </View>
                        <View style={styles.recordRow}>
                            
                            
                            <TouchableOpacity style={styles.adviceButton} onPress={() => toggleAdvice(item.key)}>
                                <Text style={styles.adviceButtonText}>Mostrar Conselho</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.key)}>
                                <Text style={styles.deleteButtonText}>Deletar</Text>
                            </TouchableOpacity>
                        </View>
                        {showAdvice[item.key] && <Text style={styles.adviceText}>{item.imc}</Text>}
                    </View>
                ))}
            </View>

            {adding && (
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        value={peso}
                        onChangeText={(text) => {
                            setPeso(text);
                            if (text && altura) {
                                setImcResult(calcIMC(parseFloat(text), parseFloat(altura)));
                            }
                        }}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Altura (cm)"
                        keyboardType="numeric"
                        value={altura}
                        onChangeText={(text) => {
                            setAltura(text);
                            if (text && peso) {
                                setImcResult(calcIMC(parseFloat(peso), parseFloat(text)));
                            }
                        }}
                        style={styles.input}
                    />
                    <Text style={styles.imcResult}>{imcResult}</Text>
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
        marginLeft: '50%'
    },
    title: {
        flexWrap: 'wrap',
        lineHeight: 30,
        color: customGreen,
        fontSize: 30,
        marginTop: 45,
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
        backgroundColor: backgroundGreen,
        borderRadius: 5,
        width: '100%',
        borderWidth: 2,
        borderColor: greenForm,
        
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        flexWrap: 'wrap',

    },
    recordLabel: {
        fontWeight: 'bold',
        flexShrink: 1,
    },
    recordValue: {
        flexShrink: 1,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
    adviceButton: {
        backgroundColor: customGreen,
        padding: 5,
        borderRadius: 5,
        
    },
    adviceButtonText: {
        color: 'white',
    },
    adviceText: {
        marginTop: 5,
        color: 'black',
    },
    inputContainer: {
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: greenForm,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '70%',
        backgroundColor: greenForm,  
        color: backgroundGreen
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: roxinho,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: backgroundGreen,
        fontSize: 30,
        lineHeight: 30,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
    },
    deleteButton: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#ab4038',
        marginLeft: '75%', 
        borderRadius: 10, 
        
    },
    deleteButtonText: {
        color: 'white',
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
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        color: '#f0eadd'
    },
    saveButton: {
        backgroundColor: customGreen, 
        marginRight: 10,
        padding: 15,
        borderRadius: 10
    },
    cancelButton: {
        backgroundColor: '#752723', 
        color: '#f0eadd',
        padding: 15,
        borderRadius: 10
        
    },
});

export default AtualizarIMC;
