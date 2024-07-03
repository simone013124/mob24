import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { Exercise } from '../types/exercise';

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

interface ExerciseDetailProps {
    exercise: Exercise;
    onBack: () => void;
}

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onBack }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${exercise.imageUrl}` }}
                style={styles.exerciseImage}
            />
            <Text style={styles.exerciseDetailLabel}>Force: {exercise.force}</Text>
            <Text style={styles.exerciseDetailLabel}>Level: {exercise.level}</Text>
            <Text style={styles.exerciseDetailLabel}>Mechanic: {exercise.mechanic}</Text>
            <Text style={styles.exerciseDetailLabel}>Equipment: {exercise.equipment}</Text>
            <Text style={styles.exerciseDetailLabel}>Category: {exercise.category}</Text>
            <Text style={styles.exerciseDetailLabel}>Primary Muscles: {exercise.primaryMuscles.join(', ')}</Text>
            <Text style={styles.exerciseDetailLabel}>Secondary Muscles: {exercise.secondaryMuscles.join(', ')}</Text>
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsTitle}>Instructions:</Text>
                {exercise.instructions.map((instruction, index) => (
                    <Text key={index} style={styles.instructionText}>{instruction}</Text>
                ))}
            </View>
            <Button title="Back" onPress={onBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    exerciseName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciseImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    exerciseDetailLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    instructionsContainer: {
        marginTop: 20,
    },
    instructionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ExerciseDetail;