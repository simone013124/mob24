import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../styles/exercise';
import globalStyles from '../styles/global';
import { Exercise } from '../types/exercise';
import { fetchExercises } from '../api/exerciseapi';
import { useLikedWorkouts } from '../context/LikedWorkoutsContext';
import ExerciseDetail from './ExerciseDetail';
import { useWorkouts } from '../context/WorkoutsContext';
import FlatButton from "@/components/button"; // Importiere useWorkouts aus dem WorkoutsContext

const ExerciseComponent: React.FC<{ level: string }> = ({ level }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { likedWorkouts, addLikedWorkout, removeLikedWorkout } = useLikedWorkouts();
    const { workouts } = useWorkouts(); // Verwende useWorkouts aus dem WorkoutsContext
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null); // State für ausgewähltes Workout im Dropdown-Menü
    const [open, setOpen] = useState(false); // State für das Öffnen/Schließen des Dropdown-Menüs

    useEffect(() => {
        const getExercises = async () => {
            try {
                const exercisesData = await fetchExercises();
                setExercises(exercisesData);
                setLoading(false);
            } catch (error) {
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

    if (selectedExercise) {
        return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
    }

    const filteredExercises = exercises.filter(exercise => exercise.level === level);

    const handleAddToWorkout = (item: Exercise) => {
        if (selectedWorkout) {
            // Hier implementierst du die Logik zum Hinzufügen der Übung zu einem Workout
            console.log(`Added exercise ${item.name} to workout ${selectedWorkout}`);
        } else {
            console.warn('No workout selected');
        }
    };

    return (
        <FlatList
            data={filteredExercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseDetailLabel}>Force: <Text style={styles.exerciseDetail}>{item.force}</Text></Text>
                    <Text style={styles.exerciseDetailLabel}>Level: <Text style={styles.exerciseDetail}>{item.level}</Text></Text>

                    <DropDownPicker
                        items={workouts.map(workout => ({ label: workout.title, value: workout.id }))}
                        defaultValue={selectedWorkout}
                        containerStyle={{ height: 40, marginBottom: 10 }}
                        open={open}
                        setOpen={setOpen}
                        setValue={setSelectedWorkout}
                        value={selectedWorkout}
                        onChangeValue={(value) => setSelectedWorkout(value)}
                    />

                    <FlatButton
                        text="Add to Workout"
                        onPress={() => handleAddToWorkout(item)}
                    />

                    <FlatButton
                        text={likedWorkouts.some(w => w.id === item.id) ? 'Unlike' : 'Like'}
                        onPress={() => {
                            likedWorkouts.some(w => w.id === item.id) ? removeLikedWorkout(item) : addLikedWorkout(item);
                        }}
                    />

                    <FlatButton
                        text="Details"
                        onPress={() => setSelectedExercise(item)}
                    />
                </View>
            )}
        />
    );
};

export default ExerciseComponent;
