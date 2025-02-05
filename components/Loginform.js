import { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { handleLogin, handleRegister } from '../services/Auth';

export default function AuthForm() {
  const [name, setName] = useState(''); // Nuevo estado para el nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Alternar entre login y registro

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>

      {/* Mostrar el campo de nombre solo en el registro */}
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

      <Button
        title={isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        onPress={() => isLogin ? handleLogin(email, password) : handleRegister(name, email, password)}
      />

      <Text style={styles.switchText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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

