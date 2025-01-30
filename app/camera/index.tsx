import { CameraView, CameraType, Camera } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Mediaibrary from "expo-media-library"
import axios from "axios";


function CameraIndex() {
    const router = useRouter()
    const [facing, setFacing] = useState<CameraType>('back');
    const [permissionCamera, setPermissionCamera] = useState(false);
    const [permissionGallery, setpermissionGallery] = useState(false);
    const [image, setImage] = useState(null)
    const cameraRef = useRef(null)

    const permisos = async () => {
        Mediaibrary.requestPermissionsAsync()
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setPermissionCamera(cameraStatus.status === "granted")
    }

    useEffect(() => {
        permisos()
    }, []);

    if (permissionCamera === false) {
        return <Text>No se concedio el acceso a la cámara</Text>
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                console.log(photo);
                setImage(photo.uri);
                const photoPath = photo.uri;
                const photoName = photoPath.split("/").pop();
                sendPhoto(photoPath, photoName);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("no entro")
        }
    }

    const sendPhoto = async (uri, name)=>{
        const formData = new FormData();
        const file = {
            uri: uri,
            type: 'image/jpg',
            name: name
        };
        formData.append('file', file);
        try {
            console.log("enviando...")
            await axios.post("http://192.168.0.101:5000/upload", formData, {
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            .then((response)=>{
                console.log(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Tomar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Girar Cámara</Text>
                </TouchableOpacity>
            </CameraView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    button: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "flex-end",
        margin: 20
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CameraIndex;