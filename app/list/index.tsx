import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

function Index() {
    const [data, setData] = useState(null);

    const dataList = async () => {
        await axios.get("http://192.168.0.101:5000/list_files")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        dataList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Archivos</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()} // Para darle una clave única
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Nombre: {item.name}</Text>
                        <Text style={styles.itemDetail}>Extensión: {(item.name).split(".").pop()}</Text>
                        <Text style={styles.itemDetail}>Tamaño (bytes): {item.size}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    itemDetail: {
        fontSize: 14,
        color: '#555',
    },
});

export default Index;
