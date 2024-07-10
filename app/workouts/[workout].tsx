import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useWorkouts } from '@/context/WorkoutsContext';
import Card from "../../components/card";
import Icon from 'react-native-vector-icons/Ionicons';

export default function WorkoutDetail() {
    const route = useRoute();
    // @ts-ignore
    const { id, title, description } = route.params;
    const { workouts, removeExerciseFromWorkout } = useWorkouts(); // Entfernen Sie das Workout aus dem WorkoutsContext

    const workout = workouts.find(workout => workout.id === id);

    const handleRemoveExercise = (exerciseId: string) => {
        if (workout) {
            removeExerciseFromWorkout(workout.id, exerciseId);
        }
    };

    const handleRemoveWorkout = () => {
       console.log("need to be done");
    }


    return (
        <ScrollView>
            <Card>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                {workout && workout.exercises && workout.exercises.length > 0 ? (
                    workout.exercises.map(exercise => (
                        <View key={exercise.id} style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{exercise.force}</Text></Text>
                            <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{exercise.level}</Text></Text>
                            <TouchableOpacity onPress={() => handleRemoveExercise(exercise.id)}>
                                <Icon name="trash-outline" size={20} color="#555" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                   
                    <Text>No exercises found for this workout.</Text>
                )}
                <TouchableOpacity onPress={handleRemoveWorkout} style={styles.removeWorkoutButton}>
                    <Icon name="trash-outline" size={20} color="pink" />
                </TouchableOpacity>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    removeWorkoutButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },

});
