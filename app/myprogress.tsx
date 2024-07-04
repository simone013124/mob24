import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Importieren des Icons

type Photo = {
    uri: string;
    date: string;
};

const MyProgress = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);

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

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const newPhoto: Photo = {
                    uri: result.assets[0].uri,
                    date: new Date().toLocaleString(), // Aktuelles Datum und Uhrzeit
                };
                setPhotos([...photos, newPhoto]);
            }
        } catch (error) {
            Alert.alert('Fehler', 'Konnte kein Foto machen: ' + (error as Error).message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>Mein Fortschritt</Text>
            <Text style={styles.text1}>Hier kannst du deinen Fortschritt dokumentieren!</Text>
            <Text style={styles.text1}>Schieße gleich ein Bild!</Text>

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.buttonText}>Foto machen</Text>
            </TouchableOpacity>

            {photos.map((photo, index) => (
                <View key={index} style={styles.photoContainer}>
                    <Image source={{ uri: photo.uri }} style={styles.image} />
                    <Text style={styles.date}>{photo.date}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 15,
        marginBottom: 5,
    },
    date: {
        fontSize: 18,
        color: '#555',
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    text1: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default MyProgress;
