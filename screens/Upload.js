import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const DocumentPickerExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log('Resultado da seleção:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        console.log('Arquivo selecionado:', file);
      } else {
        console.log('Erro na seleçao:', result);
      }
    } catch (error) {
      console.error('Erro selecionando documento:', error);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert('Nenhum arquivo selecionado', 'Por favor selecionar arquivo antes.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.mimeType || 'application/pdf',
        name: selectedFile.name,
      });

      // colocar ip certo aqui
      const response = await axios.post('http://10.2.0.191:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, //120 segundos?!?!?!?
      });

      console.log('Upload deu certo:', response.data);
      Alert.alert('Sucesso!', 'Upload deu certo!');
    } catch (error) {
      console.error('Erro dando upload:', error);
      Alert.alert('Erro', 'Erro dando upload no arquivo. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filePickerContainer}>
        <Button title="Selecionar" onPress={handleFilePick} />
        {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}
      </View>
      {selectedFile && (
        <View style={styles.uploadButtonContainer}>
          <Button title="Upload do arquivo" onPress={uploadFile} />
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
  },
  filePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
  },
  uploadButtonContainer: {
    marginTop: 20,
  },
});

export default DocumentPickerExample;
