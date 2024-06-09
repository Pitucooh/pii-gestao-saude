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
                        <Text style={styles.modalTitle}>Adicionar os dados das suas medicações</Text>
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

                        <TouchableOpacity style={styles.infoButton} onPress={() => Alert.alert('Importância', 'É essencial tomar os medicamentos na hora e data corretas para garantir a eficácia do tratamento.')}>
                            <Text style={styles.infoButtonText}>ℹ️</Text>
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
        backgroundColor: backgroundGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
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
        marginLeft:17,
        
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    recordLabel: {
        fontWeight: 'bold',
        color: backgroundGreen
        
    },
    recordValue: {
        color: backgroundGreen
    },
    adviceText: {
        color: backgroundGreen,
        fontStyle: 'italic',
        marginTop: 10,
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
        borderRadius: 10,
    },
    imcResult: {
        color: customGreen,
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
        backgroundColor: '#ccc',
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
    
    deleteButton: {
        backgroundColor: '#8c3030',
        padding: 5,
        borderRadius: 5,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: backgroundGreen,
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    infoButton: {
        position: 'absolute',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'right',
        alignItems: 'center',
        marginLeft:225
    },
    infoButtonText: {
        color: 'white',
        fontSize: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: greenForm,
        color: backgroundGreen
    },
    imcResult: {
        color: 'black',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: customGreen


    },
});

export default Medicamentos;
