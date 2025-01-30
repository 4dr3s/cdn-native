import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esto es una nueva aplicación en react native usando BackBlaze</Text>
      <Link href="/camera" style={styles.link}>
        Ir a cámara
      </Link>
      <Link href="/list" style={styles.link}>
        Ver archivos almacenados
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default Index;
