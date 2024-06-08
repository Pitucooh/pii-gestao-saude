
import { ipMaquina } from '../ips'; 
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DataCons = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { examId } = route.params || {};
    const [dataCons, setDataCons] = useState(null);
    const [especialidade, setEspecialidade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                // Substitua '192.168.0.100' pelo IP da sua máquina de desenvolvimento
                const response = await fetch(`http://${ipMaquina}:3000/getExam/${examId}`);
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    if (response.ok) {
                        setDataCons(data.dataCons);
                        setEspecialidade(data.especialidade);
                    } else {
                        setError('Erro ao buscar os detalhes da consulta');
                    }
                } else {
                    setError('Resposta inesperada do servidor');
                    console.error('Resposta inesperada do servidor:', await response.text());
                }
            } catch (error) {
                setError('Erro ao conectar ao servidor');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (examId) {
            fetchExam();
        } else {
            setLoading(false);
        }
    }, [examId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{error}</Text>
                <Button title="Tentar novamente" onPress={() => navigation.goBack()} />
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