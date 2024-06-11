import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
    Colors,
} from './../components/styles';

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

const DatasCons = ({ route }) => {
    const [consultas, setConsultas] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadConsultas = async () => {
            try {
                const storedConsultas = await AsyncStorage.getItem('consultas');
                if (storedConsultas) {
                    setConsultas(JSON.parse(storedConsultas));
                }
            } catch (error) {
                console.error('Erro ao carregar as consultas:', error);
            }
        };

        loadConsultas();
    }, [route.params?.refresh]);

    const handleCardPress = (screenName) => {
        navigation.navigate(screenName);
    };

    const handleDeleteConsulta = (index) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esta consulta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        try {
                            const updatedConsultas = [...consultas];
                            updatedConsultas.splice(index, 1);
                            setConsultas(updatedConsultas);
                            await AsyncStorage.setItem('consultas', JSON.stringify(updatedConsultas));
                        } catch (error) {
                            console.error('Erro ao excluir a consulta:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                
                <Text style={styles.title}>CONSULTAS AGENDADAS</Text>
                <Text style={styles.descriptionText}>
                        Adicione as suas consultas
                    </Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{ height: 2, backgroundColor: roxinho, width: '100%', marginTop: 15, marginBottom: 15 }}></View>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Consultas')}>

                    <Text style={styles.cardText}>Adicionar Consulta</Text>
                </TouchableOpacity>
                {consultas.map((consulta, index) => (
                    <View key={index} style={styles.consultaContainer}>
                        <Text style={styles.label}>Especialidade:</Text>
                        <Text style={styles.text}>{consulta.especialidade}</Text>
                        <Text style={styles.label}>Data da Consulta:</Text>
                        <Text style={styles.text}>{consulta.dataCons}</Text>
                        <Text style={styles.label}>Horário da Consulta:</Text>
                        <Text style={styles.text}>{consulta.horario}</Text>
                        <Text style={styles.label}>Resumo da Consulta:</Text>
                        <Text style={styles.text}>{consulta.resumoCons}</Text>
                        <Text style={styles.label}>Retorno da Consulta:</Text>
                        <Text style={styles.text}>{consulta.retorno}</Text>
                        <Text style={styles.label}>Lembrete de Agendamento:</Text>
                        <Text style={styles.text}>{consulta.lembrete}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteConsulta(index)}>
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundGreen,
    },
    descriptionText: {
        color: roxinho,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: customGreen,
        textAlign: 'center',
        marginTop: 70
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
    },
    consultaContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: greenForm,
        borderWidth: 2,
        borderColor: greenForm,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontWeight: 'bold',
        color: backgroundGreen,
        marginBottom: 5,
    },
    text: {
        color: backgroundGreen,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#8c3030',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: customGreen,
        padding: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        marginBottom: 40,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: backgroundGreen,
        padding: 5,
    },
});

export default DatasCons;
