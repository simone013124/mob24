import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, Image } from "react-native";
import styles from '../styles/exercise.js';

const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

interface Exercise {
    id: string;
    name: string;
    force: string | null;
    level: string;
    mechanic: string | null;
    equipment: string | null;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    category: string;
    images: string[];
}

const ExerciseComponent: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(EXERCISES_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const exercisesData: Exercise[] = await response.json();
                console.log('Fetched exercises:', exercisesData);
                setExercises(exercisesData);
                setLoading(false);
            } catch (error) {
                // @ts-ignore
                setError(error);
                setLoading(false);
            }
        };

        fetchExercises();
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


                        <Image
                            source={require('../assets/images/superman.png')} // Hier Pfad zum Standardbild angeben
                            style={styles.exerciseImage}
                        />
                </View>
            )}
        />
    );
};

const Index: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Hello JOSICA.</Text>
            <ExerciseComponent />
        </View>
    );
};

export default Index;