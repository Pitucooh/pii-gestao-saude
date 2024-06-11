import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;
import KeyboardWrapper from '../components/KeyboardWrapper';


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
            <Text style={styles.title}>GERENCIAR MEDICAMENTOS</Text>
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
            <KeyboardWrapper>
                <View style={styles.centeredView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adicionar Medicamento</Text>
                        <StyledInputLabel>Nome do Remédio</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setNomeRemedio(text)}
                            value={nomeRemedio}
                            placeholder="Digite o nome do remédio"  style={styles.input}
                        />
                        <StyledInputLabel>Horário</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setHorario(text)}
                            value={horario}
                            placeholder="Digite o horário" style={styles.input}
                        />
                        <StyledInputLabel>Dosagem</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setDosagem(text)}
                            value={dosagem}
                            placeholder="Digite a dosagem" style={styles.input}
                        />
                        <StyledInputLabel>Intervalo (horas)</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setIntervalo(text)}
                            value={intervalo}
                            placeholder="Digite o intervalo"
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <StyledInputLabel>Período (dias)</StyledInputLabel>
                        <StyledTextInput
                            onChangeText={text => setPeriodo(text)}
                            value={periodo}
                            placeholder="Digite o período"
                            keyboardType="numeric"  style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.modalButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </KeyboardWrapper>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: backgroundGreen,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        lineHeight: 30,
        color: customGreen,
        fontSize: 30,
        marginBorrom: 40,
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
        width: '90%',
        marginLeft:17,
        
    },
    recordLabel: {
        fontSize: 16,
        color: backgroundGreen,
        marginBottom: 5,
    },
    recordValue: {
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#8c3030',
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
        backgroundColor: customGreen,
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
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: customGreen,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        
    },
    modalButton: {
        backgroundColor: greenForm,
        borderRadius: 8,
        width: '40%',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: customGreen,
        padding: 10,
        borderRadius: 5,
        width: '40%'
    },
    cancelButton: {
        backgroundColor: '#8c3030',
        padding: 10,
        borderRadius: 5,
        width: '40%',

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    

    input: {
        backgroundColor: greenForm,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        color: customGreen,
        marginBottom: 5,
    },
});

export default Medicamentos;
