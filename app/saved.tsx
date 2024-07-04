import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LikedWorkoutsContext } from '../context/LikedWorkoutsContext';
import styles from '../styles/exercise';
import ExerciseDetail from '../components/ExerciseDetail';
import { LinearGradient } from 'expo-linear-gradient';

const Saved = () => {
    const { likedWorkouts } = useContext(LikedWorkoutsContext);
    const [selectedExercise, setSelectedExercise] = useState(null);

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
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedExercise(item)}>
                        <View style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{item.name}</Text>

                        </View>
                    </TouchableOpacity>
                )}
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
