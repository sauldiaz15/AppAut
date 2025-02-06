import { Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.139:3000/api'; // Ajusta según tu servidor

// Función de inicio de sesión
export const handleLogin = async (email, password) => {
  if (!email || !password) {
    // En caso de campos vacíos
    return { success: false, message: "Por favor ingresa el correo y la contraseña" };
  }

  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.status === 200) {
      // Retorna los datos de la respuesta si es exitoso
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Hubo un problema al iniciar sesión' };
    }
  } catch (error) {
    // En caso de un error en el servidor
    return { success: false, message: error.response?.data?.message || 'Error al contactar al servidor' };
  }
};

// Función de registro de usuario (incluye nombre)
export const handleRegister = async (username, email, password) => {
  if (!username || !email || !password) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });

    if (response.status === 200) {
      return { success: true, message: 'Registro exitoso, ahora puedes iniciar sesión' };
    } else {
      return { success: false, message: 'No se pudo completar el registro' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Error al contactar al servidor' };
  }
};