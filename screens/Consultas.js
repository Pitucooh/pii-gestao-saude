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
            <StatusBar style = "light" />
            <InnerContainer>
                <WelcomeContainer>
                    <StyledFormArea>
                        <View>
                            <MyTextInput placeholder="Especialidade:"></MyTextInput>
                            <MyTextInput placeholder="Data:"></MyTextInput>
                            <MyTextInput placeholder="Horário:"></MyTextInput>
                            <View style={styles.notesContainer}>
                        <Text style={styles.notesText}>Resumo da Consulta:</Text>
                        <TextInput
                            style={styles.notesInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Digite suas notas aqui..."
                        />
                        </View>
                            <MyTextInput placeholder="Retorno:"></MyTextInput>
                            <MyTextInput placeholder="Lembrete Agendamento:"></MyTextInput>
                        </View>
                    </StyledFormArea>
                </WelcomeContainer>
                <StyledButton>
                    <ButtonText>Salvar</ButtonText>
                </StyledButton>
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
        flex: 1
    },

    notesContainer: {
        backgroundColor: backgroundGreen,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
        borderWidth: 2, 
        borderColor: greenForm, 
        marginBottom: 20
    },
    notesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: greenForm,
    },
    notesInput: {
        height: 100,
        backgroundColor: greenForm,
        borderRadius: 5,
        padding: 5,
        color: primary
    },


  });

export default Consultas;