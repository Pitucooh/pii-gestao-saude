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
                    <View style={{ height: 2, backgroundColor: customGreen, width: '100%', marginTop:15, marginBottom: 15}}></View>

                          
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
            
        </>
    );
};


const styles = StyleSheet.create({

    container:{
        backgroundColor: greenForm, 
        width: 300,
        borderRadius: 20,
        height: 350,
        alignItems: 'flex-start'
    }, 
    
    card: {
        backgroundColor: backgroundGreen, 
        width: 110,
        marginRight:1000,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    cardText: {
      fontSize: 18,
      color: greenForm
      
    },

    footer:{
        backgroundColor: greenForm,
        width: 500,
        marginTop:200,
        flex: 1,
    }
  });


export default Menu;
