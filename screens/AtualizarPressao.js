import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AtualizarPressao = () => {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const [pressaoResult, setPressaoResult] = useState('');
    const [records, setRecords] = useState([]);
    const [adding, setAdding] = useState(false);

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
            const date = new Date().toLocaleString();
            const newRecord = { sistolica, diastolica, pressao, date, key: `${records.length}` };
            setRecords([newRecord, ...records]);
            setSistolica('');
            setDiastolica('');
            setPressaoResult('');
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

    const handleCancel = () => {
        setSistolica('');
        setDiastolica('');
        setPressaoResult('');
        setAdding(false);
    };

    const handleDelete = (key) => {
        setRecords(records.filter(record => record.key !== key));
    };

    const renderRightActions = (progress, dragX, index) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
        });
    
        return (
            <TouchableOpacity
                onPress={() => handleDelete(records[index].key)}
                style={[styles.rightAction, { transform: [{ scale: trans }] }]}
            >
                <Text style={styles.actionText}>Deletar</Text>
            </TouchableOpacity>
        );
    };
    

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Atualizar Pressão Arterial</Text>
                    {records.map((item, index) => (
                        <Swipeable
                            key={index}
                            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)}
                        >
                            <View style={styles.record}>
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
                                    <Text style={styles.recordValue}>{item.pressao}</Text>
                                </View>
                            </View>
                        </Swipeable>
                    ))}
                    {adding && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Sistólica (mmHg)"
                                keyboardType="numeric"
                                value={sistolica}
                                onChangeText={(text) => setSistolica(text)}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Diastólica (mmHg)"
                                keyboardType="numeric"
                                value={diastolica}
                                onChangeText={(text) => setDiastolica(text)}
                                style={styles.input}
                            />
                            <Text style={styles.pressaoResult}>{pressaoResult}</Text>
                            <View style={styles.buttonContainer}>
                                <Button title="Salvar" onPress={handleSave} />
                                <Button title="Cancelar" onPress={handleCancel} color="#FF0000" />
                            </View>
                        </View>
                    )}
                </View>
                {!adding && (
                    <TouchableOpacity style={styles.addButton} onPress={() => setAdding(true)}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                            )}
            </ScrollView>
            </KeyboardAvoidingView>
            );
            };

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Ajuste para evitar que o botão "Adicionar" seja sobreposto pelo teclado
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    },
    record: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
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
    color: '#555',
    flexShrink: 1,
    },
    inputContainer: {
    paddingBottom: 20,
    },
    input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    },
    pressaoResult: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
    addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    },
    addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
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
    });

    export default AtualizarPressao;

