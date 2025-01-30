import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";

function CameraLayout() {
    return (
        <View style={styles.container}>
            <Slot />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
});

export default CameraLayout;
