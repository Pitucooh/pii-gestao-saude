import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AtualizarIMC = () => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imcResult, setImcResult] = useState('');
    const [records, setRecords] = useState([]);
    const [adding, setAdding] = useState(false);

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
            return "Você está um pouco abaixo do peso ideal, seria interessante mudar seus habitos, que tal procurar um nutricionista para ganhar peso com saúde?";
        } else if (imc >= 18.5 && imc < 25) {
            return "Uou, que incrível, você está no se peso ideal, parabéns!!, mas não se esquece, sempre mantenha uma alimentação saldável e busque fazer exercícios físicos.";
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust the value here if necessary
        >
            <Text style={styles.title}>Atualizar IMC</Text>
            <SwipeListView
                data={records}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.record}>
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
                            <Text style={styles.recordLabel}>IMC:</Text>
                            <Text style={styles.recordValue}>{item.imc}</Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={({ item }) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.key)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75}
                stopRightSwipe={-75}
            />

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
                        <Button title="Salvar" onPress={handleSave} />
                        <Button title="Cancelar" onPress={handleCancel} color="#FF0000" />
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
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
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
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    recordLabel: {
        fontWeight: 'bold',
    },
    recordValue: {
        color: '#555',
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
    imcResult: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
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
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        backgroundColor: 'red',
        right: 0,
    },
    deleteButtonText: {
        color: 'white',
    },
});

export default AtualizarIMC;
