import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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


    const pressaoArterial = (sistolica, diastolica) => {
        if (sistolica < 90 && diastolica < 60) {
            return "Pressão baixa. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        } else if (90 <= sistolica && sistolica < 120 && 60 <= diastolica && diastolica < 80) {
            return "Pressão ótima. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece";
        } else if (120 <= sistolica && sistolica <= 129 && 80 <= diastolica && diastolica <= 84) {
            return "Pressão normal. Meus parabéns, os valores das suas aferições estão ótimos, continue fazendo um bom trabalho, sua saúde agradece";
        } else if (130 <= sistolica && sistolica <= 139 && 85 <= diastolica && diastolica <= 89) {
            return "Atenção. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        } else if (sistolica>=140 && diastolica >=90) {
            return "Pressão alta. É indicado que você procure atendimento médico de emergência para avaliação, principalmente se estiver com algum sintoma";
        }
    }

    const handleSave = () => {
        const sistolicaInt = parseInt(sistolica);
        const diastolicaInt = parseInt(diastolica);
        let result = '';
        if (!isNaN(sistolicaInt) && !isNaN(diastolicaInt)) {
            const result = pressaoArterial(sistolicaInt, diastolicaInt);
            const date = new Date().toLocaleString();
            const newRecord = { sistolica, diastolica, result, date, key: `${records.length}` };
            setRecords([newRecord, ...records]);
            setSistolica('');
            setDiastolica('');
            setPressaoResult('');
            setAdding(false);

            Alert.alert(
                'Registro Salvo',
                'O registro da sua pressão arterial foi salva com sucesso.',
                [{ text: 'OK', onPress: () => console.log('Registro salvo') }],
                { cancelable: false }
            );
        } else {
            Alert.alert('Erro', 'Por favor, insira números válidos para peso e altura.');
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust the value here if necessary
        >
            <Text style={styles.title}>Atualizar Pressão Arterial</Text>
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
                            <Text style={styles.recordLabel}>Sistólica:</Text>
                            <Text style={styles.recordValue}>{item.sistolica} mmHg</Text>
                        </View>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordLabel}>Diastólica:</Text>
                            <Text style={styles.recordValue}>{item.diastolica} mmHg</Text>
                        </View>
                        <View style={styles.recordRow}>
                            <Text style={styles.recordLabel}>Pressão Arterial:</Text>
                            <Text style={styles.recordValue}>{item.result}</Text>
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
                <View style={styles.container}>
                <Text>Atualizar Pressão Arterial</Text>
                <TextInput
                    placeholder="Sistólica (mmHg)"
                    keyboardType="numeric"
                    value={sistolica}
                    onChangeText={(text) =>{
                        setSistolica(text);
                        if(text && sistolica){
                            setPressaoResult(result(parseInt(text), parseInt(sistolica)));
                        }
                    }}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Diastólica (mmHg)"
                    keyboardType="numeric"
                    value={diastolica}
                    onChangeText={(text) => {
                        setDiastolica(text);
                        if (text && diastolica) {
                            setPressaoResult(result(parseFloat(diastolica), parseFloat(text)));
                        }
                    }}
                    style={styles.input}
                />

                <Text style={styles.pressaoResult}>{pressaoResult}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Salvar" onPress={handleSave} />
                    <Button title="Cancelar" onPress={handleCancel} color="#FF0000" />
                </View>
            </View>)}
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
    pressaoResult: {
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

export default AtualizarPressao;

