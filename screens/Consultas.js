import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import axios from 'axios';
const {primary, secondary, tertiary, darkLight, brand, green, red, customGreen, backgroundGreen, green2, greenForm, black, roxinho

} = Colors;

import {
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

const Consultas = ({ navigation }) => {
    const [especialidade, setEspecialidade] = useState('');
    const [dataCons, setDataCons] = useState('');
    const [horario, setHorario] = useState('');
    const [resumoCons, setResumo] = useState('');
    const [retorno, setRetorno] = useState('');
    const [lembrete, setLembrete] = useState('');

    const SalvarExam = () => {
        axios.post('http://${ipmaquina}:3000/Consultas', {
            especialidade,
            dataCons,
            horario,
            resumoCons,
            retorno,
            lembrete
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <InnerContainer style={{ backgroundColor: backgroundGreen }}>
            <WelcomeContainer style={{ backgroundColor: backgroundGreen }}>
                <PageTitle welcome={true} style={{ flexWrap: 'wrap', lineHeight: 30, color: customGreen, marginTop: 25, fontSize: 30 }}>
                    EXAMES
                </PageTitle>
                <Text style={{ color: roxinho, alignItems: 'center' }}>{'Salve aqui seu próximo exame'}</Text>
            </WelcomeContainer>

            <View style={styles.inputCon}>
                <MyTextInput
                    onChangeText={setEspecialidade}
                    placeholder="Especialidade:"
                    placeholderTextColor={backgroundGreen} // Certifique-se de definir a cor do texto do placeholder
                    style={{ backgroundColor: customGreen, color: backgroundGreen }}
                />
                <MyTextInput
                    onChangeText={setDataCons}
                    placeholder="Data:"
                    placeholderTextColor={backgroundGreen}
                    style={{ backgroundColor: customGreen, color: backgroundGreen }}
                />
                <MyTextInput
                    onChangeText={setHorario}
                    placeholder="Horário:"
                    placeholderTextColor={backgroundGreen}
                    style={{ backgroundColor: customGreen, color: backgroundGreen }}
                />
                <MyTextInput
                    onChangeText={setRetorno}
                    placeholder="Retorno:"
                    placeholderTextColor={backgroundGreen}
                    style={{ backgroundColor: customGreen, color: backgroundGreen }}
                />
                <MyTextInput
                    onChangeText={setLembrete}
                    placeholder="Lembrete Agendamento:"
                    placeholderTextColor={backgroundGreen}
                    style={{ backgroundColor: customGreen, color: backgroundGreen }}
                />
            </View>

            <View style={{ height: 2, backgroundColor: roxinho, width: '79%', marginTop: 15, marginBottom: 15 }}></View>

            <StyledButton style={styles.button} onPress={SalvarExam}>
                <ButtonText>Salvar</ButtonText>
            </StyledButton>
        </InnerContainer>
    );
}

const styles = StyleSheet.create({
    inputCon: {
        backgroundColor: backgroundGreen,
        marginBottom: 20,
        color: backgroundGreen,
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