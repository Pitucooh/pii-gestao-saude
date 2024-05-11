import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import KeyboardWrapper from '../components/KeyboardWrapper';
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
    TextLinkContent
} from './../components/styles';

const { brand, darkLight } = Colors;

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = async (values) => {
        setErrorMsg('');
        try {
            if (!validateEmail(values.email)) {
                setErrorMsg('Por favor, insira um email válido.');
                return;
            }

            const response = await fetch('http://192.168.15.102:3000/signup', {
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
                }, 2000); // Remover mensagem após 3 segundos e redirecionar para a página de login
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

    return (
        <KeyboardWrapper>
            <StyledContainer style={{backgroundColor: backgroundGreen}}>
                <StatusBar style="dark" />
                <InnerContainer  style={{backgroundColor: backgroundGreen}}>
                    <PageTitle>YE GESTÃO EM SAÚDE</PageTitle>
                    <SubTitle>Fazer cadastro</SubTitle>

                    <Formik
                        initialValues={{ nome: '', email: '', CPF: '', senha: '', confirmeSenha: '' }}
                        onSubmit={handleSignup}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Nome Completo"
                                    icon="person"
                                    placeholder=""
                                    placeholderTextColor="#FFFFFF"  
                                    onChangeText={handleChange('nome')}
                                    onBlur={handleBlur('nome')}
                                    value={values.nome}
                                    maxLength={50}
                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,          
                                        borderWidth: 0, 
                                        textAlign: LeftIcon     ,
                                        color: black 
                                    }}
                                />
                                <MyTextInput
                                    label="Email"
                                    icon="mail"
                                    placeholder="Digite o seu email"
                                    placeholderTextColor="#FFFFFF" 
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    maxLength={30}

                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,          
                                        borderWidth: 0, 
                                        textAlign: LeftIcon     ,
                                        color: black 
                                    }}
                                />
                                <MyTextInput
                                    label="CPF"
                                    icon="credit-card"
                                    placeholder="xxx.xxx.xxx-xx"
                                    placeholderTextColor="#FFFFFF" 
                                    onChangeText={handleChange('CPF')} 
                                    onBlur={handleBlur('CPF')} 
                                    value={formatCPF(values.CPF)} 
                                    keyboardType="numeric" 
                                    maxLength={14} 
                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,          
                                        borderWidth: 0, 
                                        textAlign: LeftIcon     ,
                                        color: black 
                                    }}
                                />
                                <MyTextInput
                                    label="Senha"
                                    icon="lock"
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
                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,          
                                        borderWidth: 0, 
                                        textAlign: LeftIcon     ,
                                        color: black 
                                    }}
                                />
                                <MyTextInput
                                    label="Confirme a Senha"
                                    icon="lock"
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

                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,          
                                        borderWidth: 0, 
                                        textAlign: LeftIcon     ,
                                        color: black 
                                    }}
                                />

                                <MsgBox type={errorMsg ? 'ERRO' : 'SUCESSO'}>{errorMsg || successMsg}</MsgBox>

                                <StyledButton onPress={handleSubmit} style={{padding: 10, alignItems: 'center', marginBottom: 10, justifyContent: 'center', marginLeft:100, borderColor: 'green', backgroundColor: 'transparent' }}>
                                <Fontisto name="person" size={30} style={{color:'white'}} />
                                    <ButtonText style={{color: 'white'}}>Cadastrar</ButtonText>
                            </StyledButton>
                                <Line />
                                <ExtraView>
                                    <ExtraText>Já tem uma conta?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent>Login</TextLinkContent>
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

// Função para formatar o CPF enquanto o usuário digita
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons
                        name={hidePassword ? 'md-eye-off' : 'md-eye'}
                        size={30}
                        color={darkLight}
                    />
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;
