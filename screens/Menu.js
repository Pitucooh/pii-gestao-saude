import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm } = Colors;

const Menu = ({navigation}) => {
    
    const handleCardPress = (screenName) => {
        navigation.navigate(screenName);
      };
    
    return (
        <>
            <StatusBar style = "light" />
            <InnerContainer>
                <WelcomeContainer>
                   
                    <PageTitle welcome={true} style={{flexWrap: 'wrap', lineHeight: 30, color:customGreen, 
                         fontSize: 30, marginTop: 25}}>MENU</PageTitle>
                    <View style={{ height: 2, backgroundColor: customGreen, width: '50%' }}></View>
                    <SubTitle welcome={true} style={{color: greenForm, marginTop: 10}}>Seja bem vindo, Fulano</SubTitle>
                    <View style={styles.container}>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Exames')}>
                    <Text style={styles.cardText}>Exames</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Consultas')}>
                    <Text style={styles.cardText}>Consultas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Medicacoes')}>
                    <Text style={styles.cardText}>Medicações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                    <Text style={styles.cardText}>Meus Dados</Text>
                </TouchableOpacity>
                </View>
                    <StyledFormArea>
                    <Line />
                        <StyledButton onPress={() => {navigation.navigate('Login')}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>      
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
            
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      marginVertical: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    cardText: {
      fontSize: 18,
    },
  });


export default Menu;