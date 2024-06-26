
import {useEffect, useState} from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";


const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

const ExerciseComponent = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(EXERCISES_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const exercisesData = await response.json();
                const exercisesWithImageUrl = exercisesData.map(exercise => ({
                    ...exercise,
                    imageUrl: `${IMAGE_BASE_URL}${exercise.imagePath}`,
                }));
                setExercises(exercisesWithImageUrl);
                setLoading(false);
            } catch (error) {
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
        <View style={styles.container}>
            <Text style={styles.heading}>Exercises</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.exerciseContainer}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                        <Text>Type: {item.type}</Text>
                        <Image source={{ uri: item.imageUrl }} style={styles.exerciseImage} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciseContainer: {
        marginBottom: 20,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
    },
});

export default ExerciseComponent;

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello JOSICA.</Text>
            <ExerciseComponent />
        </View>
    );
}

