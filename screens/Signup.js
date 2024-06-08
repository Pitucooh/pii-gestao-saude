import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';

import KeyboardWrapper from '../components/KeyboardWrapper';
import { ipMaquina } from '../ips'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

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
    
} from './../components/styles';

const { brand, darkLight, backgroundGreen, customGreen, primary, greenForm, roxinho } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = async (values) => {
        setErrorMsg('');
        try {
            // Verificar se todos os campos estão preenchidos
            if (!values.nome || !values.email || !values.CPF || !values.senha || !values.confirmeSenha) {
                setErrorMsg('Por favor, preencha todos os campos.');
                return;
            }
    
            // Verificar se o email tem formato válido
            if (!validateEmail(values.email)) {
                setErrorMsg('Por favor, insira um email válido.');
                return;
            }
    
            const response = await fetch(`http://${ipMaquina}:3000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.success) {
                setSuccessMsg('Cadastro realizado com sucesso. Faça seu login.');
                setTimeout(() => {
                    setSuccessMsg('');
                    navigation.navigate('Login');
                }, 2000); 
            } else {
                setErrorMsg(data.message);
            }            
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
            setErrorMsg('Erro ao fazer cadastro. Por favor, tente novamente.');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const formatCPF = (input) => {
        if (!input) return ''; // Verifica se input é undefined ou vazio e retorna uma string vazia

        // Remover caracteres não numéricos do input
        const cleaned = input.replace(/\D/g, '');

        // Aplicar a formatação do CPF (xxx.xxx.xxx-xx)
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
        if (match) {
            return match[1] + (match[2] ? '.' + match[2] : '') + (match[3] ? '.' + match[3] : '') + (match[4] ? '-' + match[4] : '');
        }

        return input;
    };

    return (
        <KeyboardWrapper>
            <StyledContainer style={{ backgroundColor: backgroundGreen }}>
                <StatusBar style="dark" />
                <InnerContainer style={{ backgroundColor: backgroundGreen }}>
                <PageTitle style={{
                         textAlign: 'left',
                         flexWrap: 'wrap',
                         lineHeight: 30,
                         fontSize: 25,
                         color: customGreen
                    }}>
                        {"YE GESTÃO EM SAÚDE"}
                    </PageTitle>

                    <View style={{ height: 2, backgroundColor: roxinho, width: '50%' }}></View>
                    <Text style={{ color: roxinho, padding:4, marginBottom: 20}}>Fazer cadastro 
                    </Text>

                    <Formik
                        initialValues={{ nome: '', email: '', CPF: '', senha: '', confirmeSenha: '' }}
                        onSubmit={handleSignup}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Nome Completo"
                                    placeholder=""
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('nome')}
                                    onBlur={handleBlur('nome')}
                                    value={values.nome}
                                    maxLength={50}
                                    inputStyle={{
                                        backgroundColor: greenForm,
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        textAlign: 'left',
                                        color: backgroundGreen
                                    }}
                                />
                                <MyTextInput
                                    label="Email"
                                    placeholder="Digite o seu email"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    maxLength={30}
                                    inputStyle={{
                                        backgroundColor: greenForm,
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        textAlign: 'left',
                                        color: backgroundGreen
                                    }}
                                />
                                <MyTextInput
                                    label="CPF"
                                    placeholder="xxx.xxx.xxx-xx"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('CPF')}
                                    onBlur={handleBlur('CPF')}
                                    value={formatCPF(values.CPF)}
                                    keyboardType="numeric"
                                    maxLength={14}
                                    inputStyle={{
                                        backgroundColor: greenForm,
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        textAlign: 'left',
                                        color: backgroundGreen
                                    }}
                                />
                                <MyTextInput
                                    label="Senha"
                                    placeholder="* * * * * * * * *"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('senha')}
                                    onBlur={handleBlur('senha')}
                                    value={values.senha}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                    maxLength={20}
                                    inputStyle={{
                                        backgroundColor: greenForm,
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        textAlign: 'left',
                                        color: backgroundGreen
                                    }}
                                />
                                <MyTextInput
                                    label="Confirme a Senha"
                                    placeholder="* * * * * * * * *"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('confirmeSenha')}
                                    onBlur={handleBlur('confirmeSenha')}
                                    value={values.confirmeSenha}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                    maxLength={20}
                                    inputStyle={{
                                        backgroundColor: greenForm,
                                        borderRadius: 10,
                                        borderWidth: 0,
                                        textAlign: 'left',
                                        color: backgroundGreen
                                    }}
                                />

                                <MsgBox type={errorMsg ? 'ERRO' : 'SUCESSO'}>{errorMsg || successMsg}</MsgBox>

                                <StyledButton onPress={handleSubmit} style={{marginBottom: 10, width: 149,  backgroundColor: greenForm, flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft:55  }}>
                                    
                                    <ButtonText style={{ color: backgroundGreen }}>Cadastrar</ButtonText>
                                </StyledButton>
                                    <View style={{ height: 2, backgroundColor: roxinho, marginVertical: 10, width: '50%', alignItems:'center', marginLeft:60  }}></View>
                                <ExtraView>
                                    <ExtraText>Já tem uma conta?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent> Login</TextLinkContent>
                                    </TextLink>
                                    <TextLink />
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardWrapper>
    );
};

const MyTextInput = ({ label, icon, inputStyle, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} style={inputStyle} secureTextEntry={isPassword ? hidePassword : false} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;
