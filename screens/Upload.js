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

      console.log('Document selection result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile(file);
        console.log('Selected file:', file);
      } else {
        console.log('Document selection canceled or error:', result);
      }
    } catch (error) {
      console.error('Error selecting document:', error);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      Alert.alert('No file selected', 'Please select a file first.');
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
      const response = await axios.post('http://192.168.15.135:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, //120 segundos?!?!?!?
      });

      console.log('Upload successful:', response.data);
      Alert.alert('Success', 'Upload successful!');
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Error', 'Error uploading file. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filePickerContainer}>
        <Button title="Select Document" onPress={handleFilePick} />
        {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}
      </View>
      {selectedFile && (
        <View style={styles.uploadButtonContainer}>
          <Button title="Upload File" onPress={uploadFile} />
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
