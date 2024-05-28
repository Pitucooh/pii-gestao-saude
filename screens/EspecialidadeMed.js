import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';


const Especialidade = ({ route }) => {
    const { especialidade } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Especialidade: {especialidade}</Text>
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress('DataCons')}>
                <Text style={styles.cardText}>Exames</Text>
            </TouchableOpacity>
        </View>
    );
}

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

export default Especialidade;
