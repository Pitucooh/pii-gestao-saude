import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet} from 'react-native';

const {primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black, roxinho

} = Colors;

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

<InnerContainer style={{backgroundColor: backgroundGreen}}>
       <WelcomeContainer style={{backgroundColor: backgroundGreen,}}>
                   
            <PageTitle welcome={true} style={{flexWrap: 'wrap', lineHeight: 30, color:customGreen, 
                       marginTop:25, fontSize: 30, }}>EXAMES</PageTitle>
             <Text style={{color: roxinho,  alignItems: 'center'}}>{'Salve aqui seu próximo exame'} </Text>
        </WelcomeContainer>
        

         <View style={styles.inputCon}>
        <MyTextInput placeholder="Especialidade:" style={{backgroundColor: customGreen, color: backgroundGreen,}}></MyTextInput>
        <MyTextInput placeholder="Data:" style={{backgroundColor: customGreen, color: backgroundGreen}}></MyTextInput>
        <MyTextInput placeholder="Horário:" style={{backgroundColor: customGreen, color: backgroundGreen}}></MyTextInput>
                            
        <MyTextInput placeholder="Retorno:" style={{backgroundColor: customGreen, color: backgroundGreen}}></MyTextInput>
        <MyTextInput placeholder="Lembrete Agendamento:" style={{backgroundColor: customGreen, color: backgroundGreen,  placeholderTextColor: backgroundGreen}}></MyTextInput>
        </View>
        
        <View style={{ height: 2, backgroundColor: roxinho, width: '79%', marginTop:15, marginBottom: 15}}></View>
    
        <StyledButton style={styles.button}>
                <ButtonText>Salvar</ButtonText>
        </StyledButton>
       
        </InnerContainer>
           
        </>
    );
};

const styles = StyleSheet.create({

    inputCon: {
        backgroundColor: backgroundGreen,
        marginBottom: 20, 
        color:backgroundGreen,
        padding: 10,
        width: '90%', 
        textAlign: 'left',
    },

    button: {
        width: 100, 
        padding: 10,
        borderRadius: 5,
        backgroundColor: roxinho, 
        marginBottom: 50,
        
    },
  

    


  });

export default Consultas;