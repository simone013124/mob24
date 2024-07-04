import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import styles from "@/styles/exercise"; // Beibehalten der allgemeinen Stile

const myProgress: React.FC = () => {
    const [photo, setPhoto] = useState(null);

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setPhoto(source);
            }
        });
    };

    return (
        <View style={[styles.container, localStyles.container]}>
            <Text style={localStyles.text}>Mein Fortschritt</Text>

            <Text style={localStyles.text1}>Hier kannst du deinen Fortschritt sehen</Text>
            <Text style={localStyles.text1}>und dich motivieren lassen.</Text>

            <Button title="Foto machen" onPress={takePhoto} />

            {photo && <Image source={photo} style={localStyles.image} />}

        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Hintergrundfarbe
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 15, // Abgerundete Ecken
        marginBottom: 20, // Abstand zum Text
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

export default myProgress;
