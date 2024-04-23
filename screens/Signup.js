import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
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

import {View} from 'react-native';

//Colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding wrapper
import KeyboardWrapper from '../components/KeyboardWrapper';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardWrapper>
        <StyledContainer>
            <StatusBar style = "dark" />
            <InnerContainer>
                <PageTitle>Gestão Saude</PageTitle>
                <SubTitle>Fazer Cadastro</SubTitle>

                <Formik
                    initialValues={{ nomeCompleto: '', email: '', CPF: '', senha: '', confirmeSenha: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate('Welcome');
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label = "Nome Completo"
                                icon="person"
                                placeholder=""
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('nomeCompleto')}
                                onBlur={handleBlur('nomeCompleto')}
                                value={values.nomeCompleto}
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
                
    
                            <MsgBox>...</MsgBox>

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Cadastrar</ButtonText>
                            </StyledButton>
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