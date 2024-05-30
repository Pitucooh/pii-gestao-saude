import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DataCons = () => {
    const route = useRoute();
    const { dataCons, especialidade } = route.params;
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Data da Consulta: {dataCons}</Text>
        <Text style={styles.text}>Especialidade: {especialidade}</Text>
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
