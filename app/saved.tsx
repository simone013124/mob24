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

const Saved: React.FC = () => {
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

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

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

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

    if (selectedExercise) {
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

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
