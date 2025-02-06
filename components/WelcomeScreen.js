import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeScreen({ route }) {
  const { userName } = route.params; // Recibir nombre del usuario

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido, {userName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 24, fontWeight: 'bold' },
});
