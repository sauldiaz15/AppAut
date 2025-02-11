import { useState } from "react";
import { StyleSheet, TextInput, View, Button, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  handleLogin,
  handleRegister,
  handleForgotPassword,
} from "../services/Auth";
import { Platform } from "react-native";

export default function AuthForm() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userData = await handleLogin(email, password);
        if (userData.success) {
          navigation.navigate("Welcome", { userName: userData.data.username });
        } else {
          showAlert("Error", userData.message);
        }
      } else {
        const result = await handleRegister(name, email, password);
        if (result.success) {
          showAlert("Registro exitoso", result.message);
          setIsLogin(true);
          clearForm();
        } else {
          showAlert("Error", result.message);
        }
      }
    } catch (error) {
      showAlert(
        "Error",
        error.message || "Ocurrió un problema, intenta de nuevo."
      );
    }
  };

  const handleForgotPasswordRequest = async () => {
    if (!email) {
      showAlert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }
    try {
      const result = await handleForgotPassword(email);
      showAlert("Recuperación", result.message);
      setIsForgotPassword(false);
      clearForm();
    } catch (error) {
      showAlert(
        "Error",
        error.message || "Error al enviar solicitud de recuperación"
      );
    }
  };

  return (
    <View style={styles.formContainer}>
      {isForgotPassword ? (
        <>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            title="Enviar enlace de recuperación"
            onPress={handleForgotPasswordRequest}
          />
          <Text
            style={styles.switchText}
            onPress={() => setIsForgotPassword(false)}
          >
            Volver al inicio de sesión
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </Text>
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
            title={isLogin ? "Iniciar Sesión" : "Registrarse"}
            onPress={handleAuth}
          />
          <Text
            style={styles.switchText}
            onPress={() => {
              setIsLogin(!isLogin);
              clearForm();
            }}
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </Text>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: "100%", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  switchText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  forgotPasswordText: {
    marginTop: 10,
    color: "red",
    textDecorationLine: "underline",
  },
});
