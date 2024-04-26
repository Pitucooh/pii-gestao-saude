import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



import{
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    PageLogo,
    Avatar
} from './../components/styles';


const Menu = ({navigation}) => {
    
    const handleCardPress = (screenName) => {
        navigation.navigate(screenName);
      };
    
    return (
        <>
            <StatusBar style = "light" />
            <InnerContainer>
                <WelcomeContainer>
                    <PageLogo resizeMode= "cover" source = {require('./../assets/logo.png')} />
                    <PageTitle welcome={true}>Bem vindo!</PageTitle>
                    <SubTitle welcome={true}>Fulano</SubTitle>
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