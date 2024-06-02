import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const Medicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [nomeRemedio, setNomeRemedio] = useState('');
    const [horario, setHorario] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [intervalo, setIntervalo] = useState('');
    const [periodo, setPeriodo] = useState('');

    useEffect(() => {
        const loadMedicamentos = async () => {
            try {
                const savedMedicamentos = await AsyncStorage.getItem('medicamentos');
                if (savedMedicamentos) {
                    setMedicamentos(JSON.parse(savedMedicamentos));
                }
            } catch (error) {
                console.error('Failed to load medicamentos', error);
            }
        };
        loadMedicamentos();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSave = async () => {
        if (nomeRemedio && horario && dosagem && intervalo && periodo) {
            try {
                const savedMedicamentos = await AsyncStorage.getItem('medicamentos');
                const medicamentos = savedMedicamentos ? JSON.parse(savedMedicamentos) : [];
                const newMedicamento = { nomeRemedio, horario, dosagem, intervalo, periodo, key: `${medicamentos.length}` };
                const updatedMedicamentos = [newMedicamento, ...medicamentos];
                await AsyncStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));
                setMedicamentos(updatedMedicamentos);
                setNomeRemedio('');
                setHorario('');
                setDosagem('');
                setIntervalo('');
                setPeriodo('');
                toggleModal();
                Alert.alert('Medicamento Salvo', 'O registro do medicamento foi salvo com sucesso.');
            } catch (error) {
                console.error('Failed to save medicamento', error);
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    const handleDelete = (key) => {
        const updatedMedicamentos = medicamentos.filter(medicamento => medicamento.key !== key);
        setMedicamentos(updatedMedicamentos);
        AsyncStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerenciar Medicamentos</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.record}>
                        <Text style={styles.recordLabel}>Nome: <Text style={styles.recordValue}>{item.nomeRemedio}</Text></Text>
                        <Text style={styles.recordLabel}>Horário: <Text style={styles.recordValue}>{item.horario}</Text></Text>
                        <Text style={styles.recordLabel}>Dosagem: <Text style={styles.recordValue}>{item.dosagem}</Text></Text>
                        <Text style={styles.recordLabel}>Intervalo: <Text style={styles.recordValue}>{item.intervalo} horas</Text></Text>
                        <Text style={styles.recordLabel}>Período: <Text style={styles.recordValue}>{item.periodo} dias</Text></Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.key)}>
                            <Text style={styles.deleteButtonText}>Deletar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <TextInput
                        placeholder="Nome do Remédio"
                        value={nomeRemedio}
                        onChangeText={setNomeRemedio}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Horário"
                        value={horario}
                        onChangeText={setHorario}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Dosagem"
                        value={dosagem}
                        onChangeText={setDosagem}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Intervalo (em horas)"
                        value={intervalo}
                        onChangeText={setIntervalo}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Período (em dias)"
                        value={periodo}
                        onChangeText={setPeriodo}
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={toggleModal}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    record: {
        backgroundColor: '#e0f7fa',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    recordLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recordValue: {
        fontWeight: 'normal',
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Medicamentos;
