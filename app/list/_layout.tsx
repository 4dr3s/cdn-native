import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

function ListLayout() {
  return (
    <View style={styles.container}>
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

export default ListLayout;
