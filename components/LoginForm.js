import { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar navegación
import { handleLogin, handleRegister } from '../services/Auth';

export default function AuthForm() {
  const navigation = useNavigation(); // Hook para navegación
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userData = await handleLogin(email, password);
        if (userData.success) {
          navigation.navigate('Welcome', { userName: userData.data.username }); // Navegar con datos
        } else {
          Alert.alert('Error', userData.message);
        }
      } else {
        const result = await handleRegister(name, email, password);
        if (result.success) {
          Alert.alert('Registro exitoso', result.message);
          setIsLogin(true); // Cambia el estado de login a verdadero
          setName(''); // Limpiar el campo de nombre
          setEmail(''); // Limpiar el campo de email
          setPassword(''); // Limpiar el campo de contraseña
        } else {
          Alert.alert('Error', result.message);
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Ocurrió un problema, intenta de nuevo.');
    }
  };
  
  

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title={isLogin ? 'Iniciar Sesión' : 'Registrarse'} onPress={handleAuth} />

      <Text style={styles.switchText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: '100%', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  switchText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
