import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export default function HomeScreen() {
    return (
        <ImageBackground source={require('../assets/images/fitness.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, Johannes!</Text>
                {/* Rest of your content */}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '60%',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    title: {
        margin: 32,
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
