import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchExercises } from '../../api/exerciseapi';
import { Exercise } from '../../types/exercise';

export default function CategoryScreen() {
    const { category } = useLocalSearchParams();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadExercises = async () => {
            try {
                const allExercises = await fetchExercises();
                const filteredExercises = allExercises.filter(exercise => exercise.level === category);
                setExercises(filteredExercises);
            } catch (e) {
                setError('Failed to load exercises');
            } finally {
                setLoading(false);
            }
        };

        loadExercises();
    }, [category]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemDetail}>Force: {item.force}</Text>
                        <Text style={styles.itemDetail}>Mechanic: {item.mechanic}</Text>
                        <Text style={styles.itemDetail}>Equipment: {item.equipment}</Text>
                        <Text style={styles.itemDetail}>Category: {item.category}</Text>
                        <Text style={styles.itemDetail}>Primary Muscles: {item.primaryMuscles.join(', ')}</Text>
                        <Text style={styles.itemDetail}>Secondary Muscles: {item.secondaryMuscles.join(', ')}</Text>
                    </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDetail: {
        fontSize: 16,
        color: '#555',
    },
});
