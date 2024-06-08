import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  WelcomeContainer,
} from './../components/styles';

const Meusdados = ({ navigation }) => {

  const handleIMCButtonPress = () => {
    navigation.navigate('AtualizarImc');
  };

  const handlePressaoButtonPress = () => {
    navigation.navigate('AtualizarPressao');
  };

  const handleGlicemiaButtonPress = () => {
    navigation.navigate('AtualizarGlicemia');
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Fulano da Silva');
  const [age, setAge] = useState('30 anos');
  const [email, setEmail] = useState('fulano.silva@gmail.com');

  const openProfileEditor = () => {
    setModalVisible(true);
  };

  const saveProfile = () => {
    setModalVisible(false);
  };

  return (
    <InnerContainer style={{ backgroundColor: backgroundGreen }}>
      <WelcomeContainer>
        <PageTitle welcome={true} style={styles.pageTitle}>
          MEUS DADOS
        </PageTitle>
        <Text style={styles.descriptionText}>
          Salve aqui os seus dados para maior facilidade
        </Text>

        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.imageAndIconContainer}>
              <Image
                source={{ uri: 'https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg' }} 
                style={styles.profileImage}
              />
              <TouchableOpacity onPress={openProfileEditor}>
                <Icon name="cog" size={30} color={backgroundGreen} style={styles.profileIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileTitle}>Perfil</Text>
            <Text style={styles.profileText}>Nome: {name}</Text>
            <Text style={styles.profileText}>Idade: {age}</Text>
            <Text style={styles.profileText}>Email: {email}</Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <TouchableOpacity style={styles.metricButton} onPress={handleIMCButtonPress}>
                <Text style={styles.buttonText}>IMC</Text>
                
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <Text style={styles.metricInfo}>22.5</Text>
            </View>

            <View style={styles.metricItem}>
              <TouchableOpacity style={styles.metricButton} onPress={handlePressaoButtonPress}>
                <Text style={styles.buttonText}>Pressão Arterial</Text>
                
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <Text style={styles.metricInfo}>120/80</Text>
            </View>

            <View style={styles.metricItem}>
              <TouchableOpacity style={styles.metricButton} onPress={handleGlicemiaButtonPress}>
                <Text style={styles.buttonText}>Glicemia</Text>
                
              </TouchableOpacity>
              <View style={styles.separator}></View>
              <Text style={styles.metricInfo}>90 mg/dL</Text>
            </View>
          </View>
        </View>
      </WelcomeContainer>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.modalButton} onPress={saveProfile}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 15,
  },
  imageAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileIcon: {
    marginLeft: 70,
    marginBottom: 80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: greenForm,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: customGreen,
    padding: 20,
  },
  pageTitle: {
    flexWrap: 'wrap',
    lineHeight: 30,
    color: customGreen,
    fontSize: 30,
    marginTop: 30,
    textAlign: 'center',
  },
  descriptionText: {
    color: roxinho,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  profileContainer: {
    marginBottom: 30,
    padding: 20,
    width: '100%',
    backgroundColor:backgroundGreen,
    borderRadius: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: customGreen,
  },
  profileText: {
    fontSize: 18,
    color: greenForm,
    marginBottom: 5,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  metricItem: {
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  metricButton: {
    width: 100,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: roxinho,
    borderRadius: 10,
  },
  separator: {
    height: 2,
    backgroundColor: roxinho,
    width: '50%',
    marginTop: 15,
  },
  buttonText: {
    color: backgroundGreen,
    fontSize: 16,
    textAlign: 'center',
  },
  metricInfo: {
    color: backgroundGreen,
    fontSize: 16,
    marginTop: 5,
    backgroundColor: greenForm,
    padding: 7,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: customGreen
  },
  modalView: {
    margin: 50,
    backgroundColor: backgroundGreen,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: customGreen,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: customGreen
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 8,
    marginBottom: 10,
    width: '100%',
    backgroundColor: customGreen,
    color: backgroundGreen
  },
  modalButton: {
    backgroundColor: roxinho,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Meusdados;
