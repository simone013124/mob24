import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MyProgress = () => {
    const [photo, setPhoto] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Kamera-Zugriff benötigt', 'Wir benötigen Ihre Zustimmung, um die Kamera zu nutzen');
                }
            }
        })();
    }, []);

    const takePhoto = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setPhoto(result.uri);
            }
        } catch (error) {
            Alert.alert('Fehler', 'Konnte kein Foto machen: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Mein Fortschritt</Text>
            <Text style={styles.text1}>Hier kannst du deinen Fortschritt sehen und dich motivieren lassen.</Text>

            <Button title="Foto machen" onPress={takePhoto} />

            {photo && <Image source={{ uri: photo }} style={styles.image} />}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 15,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    text1: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
    },
});

export default MyProgress;
