import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const DocumentPickerExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the MIME type for PDF files
      });

      if (result.type === 'success') {
        setSelectedFile(result);
        uploadFile(result.uri);
      } else {
        console.log('Document picking cancelled');
      }
    } catch (error) {
      console.log('Error picking document:', error);
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

      const response = await axios.post('http://127.0.0.1:5000', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        Selected File: {selectedFile ? selectedFile.name : 'None'}
      </Text>
      <Button title="Pick a Document" onPress={handleFilePick} />
    </View>
  );
};

export default DocumentPickerExample;