import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const exercises = [
    { id: '1', title: 'beginner' },
    { id: '2', title: 'intermediate' },
    { id: '3', title: 'expert' },
];

export default function ExerciseList() {
    const router = useRouter();

    const handlePress = (title: string) => {
        router.push(`/category/${title}`);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePress(item.title)}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});
