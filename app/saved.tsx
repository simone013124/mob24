// components/LikedWorkouts.tsx
import React, { useContext } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { LikedWorkoutsContext } from '../context/LikedWorkoutsContext';
import styles from '../styles/exercise';


const Saved: React.FC = () => {
    const { likedWorkouts } = useContext(LikedWorkoutsContext);

    if (likedWorkouts.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>No liked workouts.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={likedWorkouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                </View>
            )}
        />
    );
};

export default Saved;
