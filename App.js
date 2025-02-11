import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import LoginScreen from "./components/LoginScreen";
import WelcomeScreen from './components/WelcomeScreen';
import ResetPasswordScreen from "./components/ResetPasswordScreen";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";

const Stack = createStackNavigator();

// Configuración de Deep Linking
const linking = {
  prefixes: ["myapp://"], // Define el esquema de la app
  config: {
    screens: {
      Login: "Login",
      Welcome: "Welcome",
      ForgotPassword: "ForgotPassword",
      ResetPassword: "ResetPassword",
    }
  }
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenido' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
