import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useWorkouts } from '@/context/WorkoutsContext';
import Card from "../../components/card";

export default function WorkoutDetail() {
    const route = useRoute();
    const { id, title, description } = route.params;
    const { workouts } = useWorkouts();

    // Find the workout with matching id
    const workout = workouts.find(workout => workout.id === id);

    // Log for debugging
    console.log('Route params:', route.params);
    console.log('Workouts:', workouts);
    console.log('Selected workout:', workout);

    return (
        <ScrollView>
            <Card>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {/* Check if workout and workout.exercises are valid */}
                {workout && Array.isArray(workout.exercises) && workout.exercises.length > 0 ? (
                    // Map over exercises if they exist
                    workout.exercises.map(exercise => (
                        <View key={exercise.id} style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{exercise.force}</Text></Text>
                            <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{exercise.level}</Text></Text>
                        </View>
                    ))
                ) : (
                    // Display message if no exercises found or workout is undefined
                    <Text>No exercises found for this workout.</Text>
                )}
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
    exerciseContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseDetailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    exerciseDetail: {
        fontSize: 14,
        color: '#555',
    },
});
