import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import{
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
    TextLinkContent
} from './../components/styles';

import {View, ActivityIndicator} from 'react-native';

//Colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding wrapper
import KeyboardWrapper from '../components/KeyboardWrapper';

//api client
import axios from 'axios';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://10.2.128.110:3000/user/signup';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCESSO'){
                handleMessage(message, status)
            } else{
                navigation.navigate('Welcome', {...data});
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
                <PageTitle>Gestão Saude</PageTitle>
                <SubTitle>Fazer Cadastro</SubTitle>

                <Formik
                    initialValues={{ nome: '', email: '', CPF: '', senha: '', confirmeSenha: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values};
                        if (values.email == ''|| 
                            values.senha == '' || 
                            values.nome == ''|| 
                            values.CPF == '' || 
                            values.confirmeSenha == ''
                        ){
                            handleMessage('Por favor, preencha todos os campos');
                            setSubmitting(false);
                        } else if (values.senha !== values.confirmeSenha){
                            handleMessage('Por favor, verifique se as senhas digitadas são iguais');
                            setSubmitting(false);
                        }
                        else {
                            handleSignup(values, setSubmitting);
                        }     
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label = "Nome Completo"
                                icon="person"
                                placeholder=""
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('nome')}
                                onBlur={handleBlur('nome')}
                                value={values.nome}
                            />
                            <MyTextInput
                                label = "Email"
                                icon="mail"
                                placeholder="Digite o seu email"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />  
                            <MyTextInput
                                label = "CPF"
                                icon="credit-card"
                                placeholder="xxx.xxx.xxx-xx"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('CPF')}
                                onBlur={handleBlur('CPF')}
                                value={values.CPF}
                            />
                            <MyTextInput
                                label="Senha"
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
                            <MyTextInput
                                label="Confirme a Senha"
                                icon="lock"
                                placeholder="* * * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmeSenha')}
                                onBlur={handleBlur('confirmeSenha')}
                                value={values.confirmeSenha}
                                secureTextEntry= {hidePassword}
                                isPassword= {true}
                                hidePassword = {hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                
    
                            <MsgBox type={messageType}>{message}</MsgBox>
                           
                            {!isSubmitting &&
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Cadastro</ButtonText>
                            </StyledButton>}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                            </StyledButton>)}

                            <Line />
                            <ExtraView>
                                <ExtraText>Já tem uma conta?</ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>
                              <TextLink>
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


export default Signup;