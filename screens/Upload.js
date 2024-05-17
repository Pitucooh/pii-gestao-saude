import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: DocumentPicker.types.allFiles,
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log(err);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Arquivo escolhido: {selectedFile ? selectedFile.uri : 'nenhum'}</Text>
      <Text style={{ marginBottom: 20 }}>Por que esse DocumentPicker não funciona?</Text>
      <Button title="Upload File" onPress={handleFilePick} />
    </View>
  );
};

export default UploadPage;
