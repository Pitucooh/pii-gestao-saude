import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
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
      <Text style={{ marginBottom: 20 }}>Arquivo escolhido: {selectedFile ? selectedFile.pdf : 'nenhum'}</Text>
      <Text style={{ marginBottom: 20 }}>Pq esse DocumentPicker não vai?</Text>
      <Button title="Upload File" onPress={handleFilePick} />
    </View>
  );
};

export default UploadPage;