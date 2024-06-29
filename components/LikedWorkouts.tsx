// components/LikedWorkouts.tsx
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import ExerciseComponent from './ExerciseComponent';
import styles from '../styles/exercise';
import { LikedWorkoutsContext } from '../context/LikedWorkoutsContext';
import { Exercise } from '../types/exercise';

interface LikedWorkoutsProps {
    allExercises: Exercise[];
}

const LikedWorkouts: React.FC<LikedWorkoutsProps> = ({ allExercises }) => {
    const { likedWorkouts } = useContext(LikedWorkoutsContext);

    const likedExercises = allExercises.filter((exercise) => likedWorkouts.includes(exercise.id));

    if (likedExercises.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>No liked workouts.</Text>
            </View>
        );
    }

    return <ExerciseComponent exercises={likedExercises} />;
};

export default LikedWorkouts;
