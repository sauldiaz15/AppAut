import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.139:3000/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", result.message || "Revisa tu correo para continuar.");
        navigation.goBack(); // Regresa a la pantalla de autenticación
      } else {
        Alert.alert("Error", result.message || "No se pudo enviar el correo.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar la solicitud.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Recuperar Contraseña
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
        }}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Enviar enlace de recuperación" onPress={handleForgotPassword} />
    </View>
  );
}
