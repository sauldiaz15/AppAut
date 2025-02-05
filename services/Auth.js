import { Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.139:3000/api'; // Ajusta según tu servidor

// Función de inicio de sesión
export const handleLogin = async (email, password) => {
  if (!email || !password) {
    Alert.alert('Error', 'Por favor ingresa el correo y la contraseña');
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.status === 200) {
      Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
    } else {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  } catch (error) {
    //Alert.alert('Error', 'Hubo un problema con el servidor. Intenta nuevamente.');
    Alert.alert("Error", error.response.data.message);
  }
};

// Función de registro de usuario (incluye nombre)
export const handleRegister = async (username, email, password) => {
  if (!username || !email || !password) {
    Alert.alert('Error', 'Todos los campos son obligatorios');
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });

    if (response.status === 200) {
      Alert.alert('Registro Exitoso', 'Ahora puedes iniciar sesión');
    } else {
      Alert.alert('Error', 'No se pudo completar el registro');
    }
  } catch (error) {
    //Alert.alert('Error', 'Hubo un problema con el servidor. Intenta nuevamente.');
    Alert.alert("Error", error.response.data.message);
  }
};
