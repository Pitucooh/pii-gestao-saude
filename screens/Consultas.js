import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const {primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black} = Colors;

import{
    InnerContainer,
    PageTitle,
    Colors,
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

   
       <WelcomeContainer>
                   
            <PageTitle welcome={true} style={{flexWrap: 'wrap', lineHeight: 30, color:customGreen, 
                       marginTop:25, fontSize: 30, }}>EXAMES</PageTitle>
             <Text style={{color: greenForm,  alignItems: 'center'}}>{'DSalve aqui seu próximo exame'} </Text>
        </WelcomeContainer>
        

         <View style={styles.inputCon}>
        <MyTextInput placeholder="Especialidade:" style={{backgroundColor: backgroundGreen}}></MyTextInput>
        <MyTextInput placeholder="Data:" style={{backgroundColor: backgroundGreen}}></MyTextInput>
        <MyTextInput placeholder="Horário:" style={{backgroundColor: backgroundGreen}}></MyTextInput>
                            
        <MyTextInput placeholder="Retorno:" style={{backgroundColor: backgroundGreen}}></MyTextInput>
        <MyTextInput placeholder="Lembrete Agendamento:" style={{backgroundColor: backgroundGreen}}></MyTextInput>
        </View>
                   
    
        <StyledButton style={styles.button}>
                <ButtonText>Salvar</ButtonText>
        </StyledButton>
       
  
           
        </>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
    },
    inputCon: {
        backgroundColor: 'greenForm',
        marginBottom: 20, 
        borderRadius: 20,
        padding: 10,
        width: '90%', 
        alignSelf: 'center', 
    },
    buttonContainer: {
        alignItems: 'center', 
        marginTop: 20,
    },
    button: {
        width: 100, 
        padding: 10,
        borderRadius: 5,
        backgroundColor: customGreen, 
        marginBottom: 50,
        marginLeft:125
    },
    footer: {
        backgroundColor: 'backgroundGreen',
        width: 500,
        marginTop: 200,
        flex: 1,
    },

    


  });

export default Consultas;