import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

//defining the type for the photo object
type Photo = {
    uri: string;
    date: string;
};

// MyProgress component
const MyProgress = () => {

    // State for storing the photos, empty array as initial value
    const [photos, setPhotos] = useState<Photo[]>([]);

    // Fetch the photos from storage when the component mounts
    // and ask for camera permissions
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Camera access required', 'We need your consent to use the camera.');
                }
            }

            // loading saved photos from AsyncStorage
            try {
                const jsonValue = await AsyncStorage.getItem('@photos');
                if (jsonValue != null) {
                    setPhotos(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error('Error loading photos from storage', e);
            }
        })();
    }, []);

    useEffect(() => {
        // saving photos to AsyncStorage when the photos state changes
        const savePhotos = async () => {
            try {
                const jsonValue = JSON.stringify(photos);
                await AsyncStorage.setItem('@photos', jsonValue);
            } catch (e) {
                console.error('Error saving photos to storage', e);
            }
        };

        savePhotos();
    }, [photos]);

    // function to take a photo
    const takePhoto = async () => {
        try {
            // open camera and take a photo
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            // if the user did not cancel and a photo was taken
            if (!result.canceled && result.assets && result.assets.length > 0) {

                // create a new photo object with the uri and the current date
                const newPhoto: Photo = {
                    uri: result.assets[0].uri,
                    date: new Date().toLocaleString(),
                };
                // add the new photo to the photos array
                setPhotos([...photos, newPhoto]);
            }
        } catch (error) {
            Alert.alert('Error', 'Could not make a photo ' + (error as Error).message);
        }
    };

    // function to delete a photo
    const deletePhoto = async (index: number) => {
        // Kopie der Fotos erstellen, um das gelöschte Foto zu entfernen
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);

        // Fotos im AsyncStorage aktualisieren
        try {
            const jsonValue = JSON.stringify(updatedPhotos);
            await AsyncStorage.setItem('@photos', jsonValue);
        } catch (e) {
            console.error('Error updating photos in AsyncStorage after deletion', e);
        }
    };

    return (
        <LinearGradient
            colors={['#d2a9d2', '#e7e4e4', '#a9c6d2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}>My progress</Text>
                <Text style={styles.text1}>You can document your progress here!</Text>
                <Text style={styles.text1}>Take a photo now!</Text>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Ionicons name="camera" size={24} color="white" />
                    <Text style={styles.buttonText}>Take a pic</Text>
                </TouchableOpacity>

                {photos.map((photo, index) => (
                    <View key={index} style={styles.photoContainer}>
                        <Image source={{ uri: photo.uri }} style={styles.image} />
                        <Text style={styles.date}>{photo.date}</Text>
                        <TouchableOpacity onPress={() => deletePhoto(index)} style={styles.deleteButton}>
                            <Ionicons name="trash-bin" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative', // Um die Position des Lösch-Buttons innerhalb des Containers zu steuern
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
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 5,
    },
});

export default MyProgress;
