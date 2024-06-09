import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { InnerContainer, PageTitle, Colors, StyledButton, ButtonText, WelcomeContainer, MyTextInput } from './../components/styles';

const { primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black, roxinho } = Colors;
const DatasCons = ({ route, navigation }) => {
    const { consultas: initialConsultas } = route.params || {};
    const [consultas, setConsultas] = useState(initialConsultas || []);
    
    const handleCardPress = (screenName) => {
        navigation.navigate(screenName);
    };
    useEffect(() => {
        // Salvar as consultas no estado local quando a página for montada
        setConsultas(initialConsultas || []);
    }, [initialConsultas]);

    const handleDeleteConsulta = (index) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir esta consulta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        const updatedConsultas = [...consultas];
                        updatedConsultas.splice(index, 1);
                        setConsultas(updatedConsultas);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Consultas Agendadas</Text>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Consultas')}>
                    <Text style={styles.cardText}>Adicione uma Consulta</Text>
                </TouchableOpacity>
            </View>
            {consultas.map((consulta, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.consultaContainer}
                    onPress={() => {
                    }}
                >
                    <Text style={styles.label}>Especialidade:</Text>
                    <Text style={styles.text}>{consulta.especialidade}</Text>
                    <Text style={styles.label}>Data da Consulta:</Text>
                    <Text style={styles.text}>{consulta.dataCons}</Text>
                    {/* Outros dados da consulta */}
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteConsulta(index)}
                    >
                        <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    consultaContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        position: 'relative',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
    },
    text: {
        marginBottom: 10,
        color: '#333',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default DatasCons;
