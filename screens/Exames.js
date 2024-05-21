import React, { useState } from 'react';
import { View, Button, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [botaoVisivel, setBotaoVisivel] = useState(true);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log('Resultado do DocumentPicker:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        console.log('Arquivo selecionado:', file);
      } else {
        console.log('Seleção de arquivo cancelada ou sem arquivo selecionado');
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
    }
  };

  const uploadFileAndGetResults = async () => {
    if (!selectedFile) {
      Alert.alert('Nenhum arquivo selecionado', 'Por favor selecione um arquivo antes.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: 'application/pdf',
        name: selectedFile.name,
      });

      console.log('FormData:', formData);

      const response = await axios.post('http://10.2.0.191:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
      });

      console.log('Resposta do servidor:', response.data);

      setResultados(response.data);
      setBotaoVisivel(false);
      Alert.alert('Sucesso!', 'Upload feito com sucesso e resultados obtidos!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      Alert.alert('Erro', 'Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.filePickerContainer}>
        <Button title="Selecionar Arquivo PDF" onPress={handleFilePick} />
        {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}
      </View>
      {selectedFile && (
        <View style={styles.uploadButtonContainer}>
          <Button title="Fazer Upload do Arquivo" onPress={uploadFileAndGetResults} />
        </View>
      )}
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
  filePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
  },
  uploadButtonContainer: {
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
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
  }
});

export default App;
