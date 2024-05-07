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

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardWrapper>
        <StyledContainer style={{backgroundColor: backgroundGreen}}>
            <StatusBar style="dark" />
            <InnerContainer>
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
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Menu");
                    }}
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
                                borderWidth: 0            
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
                                borderWidth: 0            
                            }}
                            
                        />

                        <></>

                        <MsgBox>...</MsgBox>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                        <StyledButton onPress={handleSubmit} style={{ marginBottom: 10, paddingVertical: 15, paddingHorizontal: 30, justifyContent: 'center', marginLeft:100, borderColor: greenForm, }}>
                            <Fontisto name="person" size={30} style={{color:'white'}} />
                            <ButtonText>Login</ButtonText>
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