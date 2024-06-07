import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DataCons = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { examId } = route.params || {};
    const [dataCons, setDataCons] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');

            try {
                // Substitua 'your-api-endpoint' pelo endpoint correto da sua API
                const response = await fetch(`your-api-endpoint/exams/${examId}`);
                const data = await response.json();

                if (response.ok) {
                    setDataCons(data.dataCons);
                    setEspecialidade(data.especialidade);
                } else {
                    setError('Erro ao buscar os detalhes da consulta');
                }
            } catch (error) {
                setError('Erro ao conectar ao servidor');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [examId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Data da Consulta: {dataCons || 'N/A'}</Text>
            <Text style={styles.text}>Especialidade: {especialidade || 'N/A'}</Text>
            <Button
                title="Editar Consulta"
                onPress={() => navigation.navigate('Consultas', { dataCons, especialidade })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default DataCons;
