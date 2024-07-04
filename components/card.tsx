import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ children }) => {
    return (
        <LinearGradient
            colors={['#d2a9d2', '#e7e4e4',  '#a9c6d2']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <View style={styles.content}>
                {children}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'rgba(96,67,86,0.91)',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 10, // Padding für den Inhalt der Karte
    },
    content: {
        backgroundColor: 'transparent', // Hintergrundfarbe des Inhalts auf transparent setzen
    },
});

export default Card;
