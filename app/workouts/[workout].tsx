import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Verwenden Sie useRoute aus react-navigation/native, um auf die Route-Parameter zuzugreifen
import Card from "../../components/card";

export default function WorkoutDetail() {
    const route = useRoute();
    const { title, description } = route.params;

    return (
        <ScrollView>
            <Card>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.description}>{description}</Text>

            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
});
