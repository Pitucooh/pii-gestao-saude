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

const {primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black} = Colors;


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
                    <Text style={{color: greenForm, marginBottom:20}}>{'Monitore a sua saúde'} </Text>
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

    container:{
       
        flex: 1, 
        backgroundColor: greenForm, 
        width: 300,
        borderRadius: 20
        
    }, 
    
    card: {
        backgroundColor: 'transparent', 
        marginBottom: 10, 
        padding: 15,
        borderWidth: 2,
        borderColor: green2,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center', 
       
        
    },
    cardText: {
      fontSize: 18,
      color: primary
      
    },
  });


export default Menu;
