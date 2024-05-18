import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, StyleSheet} from 'react-native';


import{
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    MyTextInput
} from './../components/styles';


const Consultas = ({navigation}) => {
    return (
        <>
            <StatusBar style = "light" />
            <InnerContainer>
                <WelcomeContainer>
                    <StyledFormArea>
                        <View>
                            <MyTextInput placeholder="Especialidade:"></MyTextInput>
                        </View>
                    <Avatar resizeMode= "cover" source = {require('./../assets/logo.png')} />    
                    </StyledFormArea>
                </WelcomeContainer>
                <StyledButton>
                    <ButtonText>Salvar</ButtonText>
                </StyledButton>
            </InnerContainer>
        </>
    );
};


export default Consultas;