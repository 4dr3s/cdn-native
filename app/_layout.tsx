import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function IndexLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DISPOSITIVOS MÓVILES</Text>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center', // Centra horizontalmente
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el texto esté centrado
  },
});

export default IndexLayout;
