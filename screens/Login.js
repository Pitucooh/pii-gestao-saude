import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { View } from 'react-native';
import KeyboardWrapper from '../components/KeyboardWrapper';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
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

// Cores
const { brand, darkLight, primary, customGreen, backgroundGreen, greenForm, black } = Colors;

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (values) => {
        setErrorMsg('');
        try {
            const response = await fetch('http://10.2.129.236:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (data.success) {
                navigation.navigate('Menu');
            }
            else {
                setErrorMsg(data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrorMsg('Erro ao fazer login. Por favor, tente novamente.');
        }
    };

    return (
        <KeyboardWrapper>
            <StyledContainer style={{ backgroundColor: backgroundGreen }}>
                <StatusBar style="dark" />
                <InnerContainer style={{ backgroundColor: backgroundGreen }}>
                    <PageLogo
                        resizeMode="cover"
                        style={{ width: 100, height: 100 }}
                    />
                    <PageTitle style={{
                        textAlign: 'left',
                        flexWrap: 'wrap',
                        lineHeight: 60,
                        fontSize: 60,
                        width: '100%',
                        color: customGreen
                    }}>
                        {"YE\nGESTÃO\nEM\nSAÚDE"}
                    </PageTitle>

                    <View style={{ height: 2, backgroundColor: customGreen, marginVertical: 10, width: '100%' }}></View>
                    <Formik
                        initialValues={{ email: '', senha: '' }}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="E-mail"
                                    placeholder="Digite o seu email"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,
                                        borderWidth: 0,
                                        color: primary
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
                                    style={{
                                        backgroundColor: customGreen,
                                        borderRadius: 20,
                                        borderWidth: 0,
                                        color: primary

                                    }}

                                />

                                <></>

                                <MsgBox>{errorMsg}</MsgBox>
                                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <View>

                                        <StyledButton onPress={handleSubmit} style={{ padding: 10, alignItems: 'center' ,marginBottom: 10, justifyContent: 'center', borderWidth: 2, width: 100, borderColor: customGreen, backgroundColor: 'transparent' }}>
                                            <ButtonText style={{ color: greenForm }}>Login</ButtonText>
                                        </StyledButton>

                                    </View>

                                </View>
                                <ExtraView>
                                    <ExtraText>Não tem uma conta ainda?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Signup')}>
                                        <TextLinkContent> Cadastre-se</TextLinkContent>
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

export default Login;
