import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
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
            <Text style={styles.descriptionText}>
               Adicione aqui seus medicamentos! É importante o monitoramento das suas medicações!
            </Text>
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
                <View style={styles.centeredView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adicionar Medicamento</Text>
                        <StyledInputLabel>Nome do Remédio</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setNomeRemedio(text)}
                            value={nomeRemedio}
                            placeholder="Digite o nome do remédio"
                        />
                        <StyledInputLabel>Horário</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setHorario(text)}
                            value={horario}
                            placeholder="Digite o horário"
                        />
                        <StyledInputLabel>Dosagem</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setDosagem(text)}
                            value={dosagem}
                            placeholder="Digite a dosagem"
                        />
                        <StyledInputLabel>Intervalo (horas)</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setIntervalo(text)}
                            value={intervalo}
                            placeholder="Digite o intervalo"
                            keyboardType="numeric"
                        />
                        <StyledInputLabel>Período (dias)</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setPeriodo(text)}
                            value={periodo}
                            placeholder="Digite o período"
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                                <Text style={styles.modalButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundGreen,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: primary,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: darkLight,
        marginBottom: 20,
    },
    record: {
        backgroundColor: customGreen,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    recordLabel: {
        fontSize: 16,
        color: darkLight,
        marginBottom: 5,
    },
    recordValue: {
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: roxinho,
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: primary,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: 30,
        right: 30,
        elevation: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: backgroundGreen,
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: primary,
        padding: 10,
        borderRadius: 8,
        width: '40%',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Medicamentos;
