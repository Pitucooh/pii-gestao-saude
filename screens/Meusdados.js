import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {
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

const Meusdados = ({ navigation }) => {
    const handleCardPress = (screen) => {
        // Implemente o que deseja fazer quando o card for pressionado
        console.log(`Card pressionado: ${screen}`);
    };

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeContainer>
                    <Avatar resizeMode="cover" source={require('./../assets/logo.png')} />
                    <SubTitle welcome={true}>Fulano</SubTitle>

                    <View>
                        <Text>Última aferição de Pressão</Text>
                        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                            <Text style={styles.cardText}>...</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Última aferição de Glicemia</Text>
                        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                            <Text style={styles.cardText}>...</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Última verificação de peso e altura</Text>
                        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                            <Text style={styles.cardText}>...</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>IMC</Text>
                        <TouchableOpacity style={styles.card} onPress={() => handleCardPress('Meusdados')}>
                            <Text style={styles.cardText}>...</Text>
                        </TouchableOpacity>
                    </View>

                    <StyledFormArea>
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate('Login') }}>
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


export default Meusdados;
