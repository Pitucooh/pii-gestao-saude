import React, { useState, useEffect } from 'react';
import { View, Button, Text, ScrollView, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipMaquina } from '../ips'; 

import KeyboardWrapper from '../components/KeyboardWrapper';
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
    WelcomeContainer
} from './../components/styles';



const {primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black} = Colors;

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [botaoVisivel, setBotaoVisivel] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSavedResults();
  }, []);

  const loadSavedResults = async () => {
    try {
      const savedResults = await AsyncStorage.getItem('resultados');
      if (savedResults !== null) {
        setResultados(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error('Erro ao carregar resultados salvos:', error);
    }
  };

  const saveResults = async () => {
    try {
      await AsyncStorage.setItem('resultados', JSON.stringify(resultados));
    } catch (error) {
      console.error('Erro ao salvar resultados:', error);
    }
  };

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

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: 'application/pdf',
        name: selectedFile.name,
      });

      console.log('FormData:', formData);

      const response = await axios.post(`http://${ipMaquina}:5000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
      });

      console.log('Resposta do servidor:', response.data);

      setResultados(response.data);
      setBotaoVisivel(false);
      Alert.alert('Sucesso!', 'Upload feito com sucesso e resultados obtidos!');
      saveResults();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      Alert.alert('Erro', 'Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <InnerContainer style={{backgroundColor: backgroundGreen}}>
       <WelcomeContainer>
                   
                   <PageTitle welcome={true} style={{flexWrap: 'wrap', lineHeight: 30, color:customGreen, 
                        fontSize: 30, marginTop: 25}}>EXAMES</PageTitle>
                   <Text style={{color: greenForm, marginBottom:20, alignItems: 'center'}}>{'Faça o upload dos exames e tenha os resultados'} </Text>
                   
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
                        <View>
                          <Text style={styles.placeholderText}>Os resultados dos seus exames aparecerão aqui após a seleção!</Text>
                          {loading && (
                            <ActivityIndicator style={styles.loadingIndicator} size="large" color={backgroundGreen} />
                          )}
                        </View>
                      )}
                    </ScrollView>
                  </View>
                  <View style={{ height: 2, backgroundColor: customGreen, width: '100%', marginTop:15, marginBottom: 15}}></View>
                   <View style={styles.uploadButtonContainer}>
                   {!selectedFile ? ( <Button title="Selecionar Arquivo PDF" onPress={handleFilePick} color={customGreen} />
                    ) : (
                      <View>
                      <Button title="Enviar para a analise"  onPress={uploadFileAndGetResults} color={customGreen}/>
                      <View style={styles.filePickerContainer}>
                        <Text style={styles.fileName}>{selectedFile.name}</Text>
                      </View>
                      </View>
                    )}
                   </View>
                   <StyledFormArea>
                   </StyledFormArea>
               </WelcomeContainer>
    </InnerContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 0.79,
    borderRadius:20,
    padding: 20,
    height: 70,
    backgroundColor: greenForm,
    borderWidth: 2,
    borderWidth: 1,
    borderColor: greenForm,
    
  },
  filePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
    
  },

  fileName: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 2, 
    borderColor: customGreen,
    padding: 13,
    marginTop: 15, 
    color: customGreen,
    flex: 1,
    borderRadius: 20,

  },

  uploadButtonContainer: {
    color: greenForm
  },
  scrollView: {
    flex: 1,
    width: '100%',
    
    padding: 20,
    borderRadius: 20,
    
  },
  resultadoContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: backgroundGreen,
    backgroundColor: backgroundGreen, 
    borderRadius: 15,
    
  },
  resultadoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: backgroundGreen,
  },
  
  loadingIndicator: {
    marginTop: 20,
  },
});

export default App;
