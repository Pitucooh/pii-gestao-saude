import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';


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
    Avatar
} from './../components/styles';


const Exames = ({navigation}) => {
    return (
        <>
            <StatusBar style = "light" />
            <InnerContainer>
                <WelcomeImage resizeMode= "cover" source = {require('./../assets/logo.png')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>EXAMES!</PageTitle>
                    <SubTitle welcome={true}>Fulano</SubTitle>
                    <StyledFormArea>
                    <Avatar resizeMode= "cover" source = {require('./../assets/logo.png')} />
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


export default Exames;