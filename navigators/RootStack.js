import React from 'react';

import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Menu from './../screens/Menu';
import Consultas from './../screens/Consultas';
import Exames from '../screens/Exames';
import Medicamentos from './../screens/Medicamentos';
import Meusdados from './../screens/Meusdados';
import AtualizarGlicemia from './../screens/AtualizarGlicemia';
import AtualizarImc from './../screens/AtualizarImc';
import AtualizarPressao from './../screens/AtualizarPressao';
import DatasCons from './../screens/DatasCons';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: '#000', // Definindo a cor preta da seta de retorno
                    headerBackTitleStyle: {
                        color: '#000'
                    }
                }}
                initialRouteName="Menu"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Consultas" component={Consultas} />
                <Stack.Screen name="Exames" component={Exames} />
                <Stack.Screen name="Medicamentos" component={Medicamentos} />
                <Stack.Screen name="Meusdados" component={Meusdados} />
                <Stack.Screen name="AtualizarGlicemia" component={AtualizarGlicemia} />
                <Stack.Screen name="AtualizarImc" component={AtualizarImc} />
                <Stack.Screen name="AtualizarPressao" component={AtualizarPressao} />
                <Stack.Screen name="DatasCons" component={DatasCons} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;
