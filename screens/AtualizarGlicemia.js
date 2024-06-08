import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';

const STORAGE_KEY = '@glicemiaRecords';

const SegundoComponente = () => {
    const [showInput, setShowInput] = useState(false);
    const [glicemia, setGlicemia] = useState('');
    const [glicemiaResult, setGlicemiaResult] = useState('');
    const [pilha, setPilha] = useState([]);

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
                    <Text style={styles.title}>Segundo Componente</Text>
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
                                <Button title="Salvar" onPress={handleSave} />
                                <Button title="Cancelar" onPress={handleCancel} />
                            </View>
                            <Text style={styles.resultText}>{glicemiaResult}</Text>
                        </>
                    ) : (
                         <>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        paddingTop: 150, // Espaçamento superior
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
   
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    addButton: {
        backgroundColor: '#007bff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
});

export default AtualizarGlicemia;
