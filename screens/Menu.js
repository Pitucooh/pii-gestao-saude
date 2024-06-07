import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';

import KeyboardWrapper from '../components/KeyboardWrapper';
import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    Colors,
    WelcomeContainer
} from './../components/styles';

const { primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black, roxinho } = Colors;

const Menu = ({ navigation }) => {

    const handleCardPress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <>
            <StatusBar style="light" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <InnerContainer>
                    <WelcomeContainer>
                        <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 30, color: customGreen, fontSize: 30, marginTop: 25 }}>MENU</PageTitle>
                        <View style={{ height: 2, backgroundColor: roxinho, width: '50%' }}></View>
                        <SubTitle welcome={true} style={{ color: greenForm, marginTop: 10 }}>Seja bem-vindo!</SubTitle>
                        <Text style={{ color: greenForm, marginBottom: 20 }}>{'Monitore a sua saúde'} </Text>

                        <View style={styles.notesContainer}>
                            <Text style={styles.notesText}>Bloco de Notas:</Text>
                            <TextInput
                                style={styles.notesInput}
                                multiline={true}
                                numberOfLines={4}
                                placeholder="Digite suas notas aqui..."
                            />
                        </View>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Exames')}>
                                <Text style={styles.cardText}>Exames</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Consultas')}>
                                <Text style={styles.cardText}>Consultas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Medicamentos')}>
                                <Text style={styles.cardText}>Medicamentos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                                <Text style={styles.cardText}>Meus Dados</Text>
                            </TouchableOpacity>
                        </View>

                        <StyledFormArea>
                            <View style={{ height: 2, backgroundColor: roxinho, width: '100%', marginTop: 15, marginBottom: 15 }}></View>
                        </StyledFormArea>
                    </WelcomeContainer>
                </InnerContainer>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: greenForm,
        width: 300,
        borderRadius: 20,
        height: 350,
        alignItems: 'flex-start'
    },
    card: {
        backgroundColor: backgroundGreen,
        width: 140,
        marginRight: 1000,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 18,
        color: greenForm
    },
    footer: {
        backgroundColor: greenForm,
        width: 500,
        marginTop: 200,
        flex: 1
    },
    notesContainer: {
        backgroundColor: roxinho,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 20
    },
    notesText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: backgroundGreen,
    },
    notesInput: {
        height: 100,
        backgroundColor: backgroundGreen,
        borderRadius: 5,
        padding: 5,
        color: black
    },
});

export default Menu;
