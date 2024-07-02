import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, Image, Button } from "react-native";
import styles from '../styles/exercise.js';
import { Exercise } from '../types/exercise';
import { fetchExercises } from '../api/exerciseapi.ts';
import { useLikedWorkouts } from '../context/LikedWorkoutsContext';

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';


const ExerciseComponent: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();

    useEffect(() => {
        const getExercises = async () => {
            try {
                const exercisesData = await fetchExercises();
                setExercises(exercisesData);
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

    return (
        <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{item.force}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{item.level}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Mechanic: <Text style={styles.exerciseDetail}>{item.mechanic}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Equipment: <Text style={styles.exerciseDetail}>{item.equipment}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Category: <Text style={styles.exerciseDetail}>{item.category}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Primary Muscles: <Text style={styles.exerciseDetail}>{item.primaryMuscles.join(', ')}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Secondary Muscles: <Text style={styles.exerciseDetail}>{item.secondaryMuscles.join(', ')}</Text></Text>

                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsTitle}>Instructions:</Text>
                        {item.instructions.map((instruction, index) => (
                            <Text key={index} style={styles.instructionText}>{instruction}</Text>
                        ))}
                    </View>

                    {item.images && item.images.length > 0 && (
                        <Image
                            source={{ uri: `${IMAGE_BASE_URL}${item.images[0]}` }}
                            style={[styles.exerciseImage, { width: 200, height: 200 }]} // Beispiel für festgelegte Breite und Höhe
                            onLoad={() => console.log('Image loaded:', `${IMAGE_BASE_URL}${item.images[0]}`)}
                        />
                    )}

                    <Button
                        title={likedWorkouts.some(w => w.id === item.id) ? 'Unlike' : 'Like'}
                        onPress={() => {
                            likedWorkouts.some(w => w.id === item.id) ? removeLikedWorkout(item) : addLikedWorkout(item)
                        }}
                    />
                </View>
            )}
        />
    );
};

export default ExerciseComponent;
