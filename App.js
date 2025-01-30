import { StyleSheet, Text, View } from 'react-native';
import "expo-router/entry";
import { Stack } from 'expo-router';

export default function App() {
  return (
    <Stack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
