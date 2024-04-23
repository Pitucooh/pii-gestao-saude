import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formika
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import{
    StyledContainer,
    InnerContainer,
    PageLogo,
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
    TextLinkContent
} from './../components/styles';

import {View, ActivityIndicator} from 'react-native';

//Colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding wrapper
import KeyboardWrapper from '../components/KeyboardWrapper';

//API client
import axios from 'axios';

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.15.102:3000/user/signin';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCESSO'){
                handleMessage(message, status)
            } else{
                navigation.navigate('Welcome', {...data[0]});
            }
            setSubmitting(false);
        })
        .catch((error) => {
            console.error("Erro ao processar requisição:", error);
            if (error.response) {
                // O servidor retornou um status de erro
                console.error("Detalhes do erro:", error.response.data);
            }
            setSubmitting(false);
            handleMessage("Ocorreu um erro. Verifique sua conexão de rede e tente novamente.");
        });
        
    };

    const handleMessage = (message, type = 'FALHOU') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
    <KeyboardWrapper>
        <StyledContainer>
            <StatusBar style = "dark" />
            <InnerContainer>
                <PageLogo resizeMode= "cover" source = {require('./../assets/logo.png')} />
                <PageTitle>Gestão Saude</PageTitle>
                <SubTitle>Fazer Login</SubTitle>

                <Formik
                    initialValues={{ email: '', senha: '' }}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == ''|| values.senha == ''){
                            handleMessage('Por favor, preencha todos os campos');
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }     
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
                            <MyTextInput
                                label = "Seu e-mail"
                                icon="mail"
                                placeholder="Digite o seu email"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                                <MyTextInput
                                label="Sua Senha"
                                icon="lock"
                                placeholder="* * * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('senha')}
                                onBlur={handleBlur('senha')}
                                value={values.senha}
                                secureTextEntry= {hidePassword}
                                isPassword= {true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />

                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting &&
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                            </StyledButton>)}

                            <Line />
                            <StyledButton google={true} onPress={handleSubmit}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true}>Entrar com o google</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Não tem uma conta ainda?</ExtraText>
                                <TextLink onPress={() => navigation.navigate('Signup')}>
                                    <TextLinkContent>Cadastre-se</TextLinkContent>
                                </TextLink>
                        </ExtraView>     
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return (
        <View> 
            <LeftIcon>
            <Octicons name = {icon} size={30} color = {brand} />

            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name = {hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color= {darkLight} />
                </RightIcon>
            )}
        </View>
    )
}


export default Login;