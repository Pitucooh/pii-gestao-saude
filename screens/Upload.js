import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
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
        uploadFile(result.uri);
      } else {
        console.log('Selecionar documento cancelado ou erro:', result);
      }
    } catch (error) {
      console.log('Erro selecionando documento:', error);
    }
  };
  

  const uploadFile = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'application/pdf',
        name: 'selectedFile.pdf',
      });

      const response = await axios.post('http://10.2.130.84:5000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('upload feito com sucesso:', response.data);
    } catch (error) {
      console.log('erro fazendo upload:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        Arquivo selecionado: {selectedFile ? selectedFile.name : 'None'}
      </Text>
      <Button title="selecionar documento" onPress={handleFilePick} />
    </View>
  );
};

export default DocumentPickerExample;