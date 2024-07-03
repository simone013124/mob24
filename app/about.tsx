import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from "@/styles/exercise"; // Beibehalten der allgemeinen Stile

const About: React.FC = () => {
    return (
        <View style={[styles.container, localStyles.container]}>
            <Text style={localStyles.text}>das sind wir - josica.</Text>

            <Text style={localStyles.text1}>johanna.</Text>
            <Text style={localStyles.text1}>simone.</Text>
            <Text style={localStyles.text1}>carmen.</Text>
            <Image source={require('@/assets/images/josica1.jpeg')} style={localStyles.image} />

            <Text style={localStyles.text1}>Wir sind 3 Mädels mit 3 Lieblingsdingen: Programmieren, Studieren, Schöni</Text>
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

export default About;
