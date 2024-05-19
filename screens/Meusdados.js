import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Meusdados = ({ navigation }) => {

    const handleIMCButtonPress = () => {
        navigation.navigate('AtualizarImc');
    };

    const handlePressaoButtonPress = () => {
        navigation.navigate('AtualizarPressao');
    };

    const handleGlicemiaButtonPress = () => {
        navigation.navigate('AtualizarGlicemia');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.metricButton} onPress={handleIMCButtonPress}>
                <Text style={styles.buttonText}>IMC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.metricButton} onPress={handlePressaoButtonPress}>
                <Text style={styles.buttonText}>Pressão Arterial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.metricButton} onPress={handleGlicemiaButtonPress}>
                <Text style={styles.buttonText}>Glicemia</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    metricButton: {
        marginVertical: 10,
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Meusdados;
