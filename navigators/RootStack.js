import React from 'react';

import {Colors} from './../components/styles';
const {primary, tertiary} = Colors;

//React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Menu from './../screens/Menu';
import Consultas from './../screens/Consultas';
import Exames from '../screens/Exames';
import Medicacoes from './../screens/Medicacoes';
import Meusdados from './../screens/Meusdados';
import AtualizarGlicemia from './../screens/AtualizarGlicemia';
import AtualizarImc from './../screens/AtualizarImc';
import AtualizarPressao from './../screens/AtualizarPressao';


const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle:  {
                    backgroundColor: 'transparent'
                },
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                headerBackTitle: 'Voltar',
                headerBackTitleStyle: {
                    color: '#000' 
                }            
            }}
            initialRouteName="Login"
            >
                <Stack.Screen name= "Login" component={Login} />
                <Stack.Screen name= "Signup" component={Signup} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Welcome" component={Welcome} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Menu" component={Menu} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Consultas" component={Consultas} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Exames" component={Exames} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Medicacoes" component={Medicacoes} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "Meusdados" component={Meusdados} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "AtualizarGlicemia" component={AtualizarGlicemia} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "AtualizarImc" component={AtualizarImc} />
                <Stack.Screen options = {{headerTintColor: '#000' }} name= "AtualizarPressao" component={AtualizarPressao} />
            </Stack.Navigator>
        </NavigationContainer>
    )    

}

export default RootStack; 