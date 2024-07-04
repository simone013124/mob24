import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LikedWorkoutsContext } from '../context/LikedWorkoutsContext';
import styles from '../styles/exercise';
import ExerciseDetail from '../components/ExerciseDetail';

const Saved = () => {
    const { likedWorkouts } = useContext(LikedWorkoutsContext);
    const [selectedExercise, setSelectedExercise] = useState(null);

    if (likedWorkouts.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>No liked workouts.</Text>
            </View>
        );
    }

    if (selectedExercise) {
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

    return (
        <FlatList
            data={likedWorkouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedExercise(item)}>
                    <ScrollView style={styles.exerciseContainer}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                    </ScrollView>
                </TouchableOpacity>
            )}
        />
    );
};

export default Saved;
