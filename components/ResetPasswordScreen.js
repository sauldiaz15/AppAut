import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const route = useRoute(); // Obtener parámetros de la URL
  useEffect(() => {
    if (route.params?.token) {
      setToken(route.params.token);
    } else {
      Alert.alert("Error", "Token no encontrado en la URL. Verifica el enlace.");
    }
  }, [route.params]);

  const handleSubmit = async () => {
    if (!token || !password) {
      Alert.alert("Error", "El token y la contraseña son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.139:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", result.message || "Contraseña restablecida con éxito.");
      } else {
        Alert.alert("Error", result.message || "Error al restablecer la contraseña.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Hubo un problema al procesar la solicitud.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Restablecer" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
