import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useLikedWorkouts } from '@/context/LikedWorkoutsContext';
import { Exercise } from '@/types/exercise';
import styles from '../styles/exercise';
import ExerciseDetail from '../components/ExerciseDetail';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchExercises } from '@/api/exerciseapi';
import FlatButton from "@/components/button";

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

// Saved screen component
// This component displays a list of liked workouts

const Saved: React.FC = () => {

    // Get the liked workouts and functions to add/remove liked workouts from the context
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();
    // State for storing the selected exercise
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    // State for loading state
    const [loading, setLoading] = useState(true);
    // State for error state
    const [error, setError] = useState<Error | null>(null);

    // Fetch exercises when the component mounts
    useEffect(() => {
        const getExercises = async () => {
            try {
                await fetchExercises();
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getExercises();
    }, []);

    // Display a loading indicator while fetching the exercises
    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Display an error message if the exercises could not be loaded
    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    // Display a message if no liked workouts are available
    if (likedWorkouts.length === 0) {
        return (
            <LinearGradient
                colors={['#d2a9d2', '#e7e4e4', '#a9c6d2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={customStyles.fullScreen}
            >
                <View style={[styles.container, styles.center]}>
                    <Text>No liked workouts.</Text>
                </View>
            </LinearGradient>
        );
    }

    // Display the list of liked workouts
    if (selectedExercise) {

        // Display the selected exercise in detail
        // Pass the exercise and a function to go back to the list of liked workouts
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

    // Display the list of liked workouts
    return (
        <LinearGradient
            colors={['#d2a9d2', '#e7e4e4', '#a9c6d2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={customStyles.fullScreen}
        >

            <FlatList
                data={likedWorkouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const photos = item.images;
                    const firstPhoto = `${IMAGE_BASE_URL}${photos[0]}`;

                    return (
                        <TouchableOpacity onPress={() => setSelectedExercise(item)}>
                            <View style={styles.exerciseContainer}>
                                <Text style={styles.exerciseName}>{item.name}</Text>
                                <Image
                                    source={{ uri: firstPhoto }}
                                    style={styles.exerciseImage}
                                />
                                <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{item.force}</Text></Text>
                                <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{item.level}</Text></Text>

                                <FlatButton
                                    text='Unlike'
                                    onPress={() => removeLikedWorkout(item)}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </LinearGradient>
    );
};

const customStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
});

export default Saved;
