import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const DocumentPickerExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // especificar extensão do arquivo
      });

      console.log('Resultado da seleção do documento:', result);

      if (result.type === 'success') {
        setSelectedFile(result);
        console.log('Arquivo selecionado:', result);
      } else {
        console.log('Seleção de documento cancelada ou erro:', result);
      }
    } catch (error) {
      console.error('Erro selecionando documento:', error);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert('Nenhum arquivo selecionado', 'Por favor, selecione um arquivo primeiro.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.mimeType,
        name: selectedFile.name,
      });

      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload feito com sucesso:', response.data);
      Alert.alert('Sucesso', 'Upload feito com sucesso!');
    } catch (error) {
      console.log('Erro fazendo upload:', error);
      Alert.alert('Erro', 'Erro fazendo upload. Por favor, tente novamente.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        Arquivo selecionado: {selectedFile ? selectedFile.name : 'Nenhum'}
      </Text>
      <Button title="Selecionar Documento" onPress={handleFilePick} />
      {selectedFile && (
        <View style={{ marginTop: 20 }}>
          <Button title="Confirmar Upload" onPress={uploadFile} />
        </View>
      )}
    </View>
  );
};

export default DocumentPickerExample;
