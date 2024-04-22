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

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerStyle:  {
                    backgroundColor: 'transparent'
                },
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                headerBackTitle: 'Voltar' 
            }}
            initialRouteName="Login"
            >
                <Stack.Screen name= "Login" component={Login} />
                <Stack.Screen name= "Signup" component={Signup} />
                <Stack.Screen options = {{headerTintColor: primary}} name= "Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )    

}

export default RootStack; 