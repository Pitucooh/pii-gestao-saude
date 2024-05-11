import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formika
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

const darkGreen = Colors.darkGreen

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
const {brand, darkLight, primary, customGreen, backgroundGreen, greenForm} = Colors;

// keyboard avoiding wrapper
import KeyboardWrapper from '../components/KeyboardWrapper';

    const Login = ({ navigation }) => {
        const [hidePassword, setHidePassword] = useState(true);
        const [errorMsg, setErrorMsg] = useState('');
    
        const handleLogin = async (values) => {
            setErrorMsg('');
            try {
                const response = await fetch('http://192.168.15.102:3000/login', {
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
        <StyledContainer style={{backgroundColor: backgroundGreen}}>
            <StatusBar style="dark" />
            <InnerContainer style={{backgroundColor: backgroundGreen}}>
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
                
                <View style={{ height: 2, backgroundColor: customGreen, marginVertical: 10, width: '100%'}}></View>
                <Formik 
                    initialValues={{ email: '', senha: '' }}
                    onSubmit={handleLogin} 
                >
                     {({ handleChange, handleBlur, handleSubmit,  values }) => (
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
                                textAlign: LeftIcon      
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
                                textAlign: LeftIcon
                            }}
                            
                        />

                        <></>

                        <MsgBox>{errorMsg}</MsgBox>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
    
                                <StyledButton onPress={handleSubmit} style={{padding: 10, alignItems: 'center', marginBottom: 10, justifyContent: 'center', marginLeft:100, borderColor: 'green', backgroundColor: 'transparent' }}>
                                <Fontisto name="person" size={30} style={{color:'white'}} />
                                    <ButtonText style={{color: 'white'}}>Login</ButtonText>
                            </StyledButton>
                    
                        </View>

                        </View>
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