// SendMessageScreen.js
// SendMessageScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

const API_URL = 'http://192.168.68.114:5000/send_message';

export default function SendMessageScreen() {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sendMessageToPython = async (exameAtual) => { // Recebe o parâmetro exameAtual
    try {
      const response = await axios.post(API_URL, {
        url: "./Laudo Completo 22_12_2023.pdf",
        exame_atual: exameAtual // Usa o valor passado como argumento
      });
      console.log('Resposta do servidor:', response.data);
      setReceivedMessage(`${exameAtual}: ${response.data.message}`); // Formata a mensagem com exameAtual
      setIsModalVisible(true);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Download PDF"/>
      {/* Passa 'Hematócrito' como argumento para sendMessageToPython */}
      <Button title="Resultados" onPress={() => sendMessageToPython('Hematócrito')} />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{receivedMessage}</Text>
          <Button title="Fechar" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
