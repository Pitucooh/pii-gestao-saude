import React, { useState } from 'react';
import { View, Button, Text, ScrollView, Alert, StyleSheet } from 'react-native';

const App = () => {
  const [resultados, setResultados] = useState([]);
  const [botaoVisivel, setBotaoVisivel] = useState(true);

  const obterResultados = async () => {
    try {
      const response = await fetch('http://10.2.128.141:5000/api/processar_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_path: 'Laudo Completo 22_12_2023.pdf' }),
      });

      const data = await response.json();
      setResultados(data);
    } catch (error) {
      Alert.alert('Erro ao obter resultados', error.message);
    }
    setBotaoVisivel(false);
  };

  return (
    <View style={styles.container}>
      <View>
            {botaoVisivel && (
                <Button
                    title="Obter Resultados"
                    onPress={obterResultados}
                />
            )}
        </View>
      <ScrollView style={styles.scrollView}>
    {resultados && Object.keys(resultados).length > 0 ? (
        Object.entries(resultados).map(([tipo_exame, info]) => (
            <View key={tipo_exame} style={styles.resultadoContainer}>
                <Text style={styles.resultadoText}>{`${tipo_exame}`}</Text>
                <Text style={styles.resultadoText}>{`Resultado: ${info.resultado} ${info.parametro}`}</Text>
                <Text style={styles.resultadoText}>{`Referência: ${info.valor_minimo} - ${info.valor_maximo} ${info.parametro}`}</Text>
                <Text style={styles.resultadoText}>{`Dentro dos Limites: ${info.dentro_limites ? 'Sim' : 'Não'}`}</Text>
            </View>
        ))
    ) : (
        <Text style={styles.placeholderText}>Nenhum resultado disponível</Text>
        
    )}
</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  resultadoContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  resultadoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default App;
