import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/card';
import WorkoutForm from '../../components/workoutForm';

//define the type for the workout object
export type Workout = {
    id: string,
    title: string,
    description: string,
}

// WorkoutPage component
export default function WorkoutPage() {

    // State for storing the categories
    const [modalOpen, setModalOpen] = useState(false);
    // State for storing the workouts
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    // Fetch the workouts from storage when the component mounts
    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const workoutsData = await AsyncStorage.getItem('workouts');
                if (workoutsData) {
                    setWorkouts(JSON.parse(workoutsData));
                }
            } catch (error) {
                console.error('Failed to load workouts from storage', error);
            }
        };
        loadWorkouts();
    }, []);

    // Save the workouts to storage when the workouts state changes
    useEffect(() => {
        const saveWorkouts = async () => {
            try {
                await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
            } catch (error) {
                console.error('Failed to save workouts to storage', error);
            }
        };
        saveWorkouts();
    }, [workouts]);

    // Function to add a new workout
    const addWorkout = (workout: Workout) => {
        workout.id = Math.random().toString();
        // setWorkouts wird verwendet, um den State workouts zu aktualisieren. Sie erhält
        // eine Funktion als Argument, die den vorherigen State currentWorkouts verwendet
        // currentWorkouts ist eine Funktion, die als Argument an setWorkouts übergeben wird,
        // um den aktuellen Zustand der Workouts zu erhalten
        setWorkouts((currentWorkouts) => {
            return [workout, ...currentWorkouts];
        });
        setModalOpen(false);
    };

    return (
        <View>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={{ ...styles.modalToggle, ...styles.modalClose }}
                            onPress={() => setModalOpen(false)}
                        />
                        <WorkoutForm addWorkout={addWorkout} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />

            <FlatList
                data={workouts}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({ pathname: "workouts/item.workoutName", params: item })}>
                        <Card>
                            <Text style={styles.text}>{item.title}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

// renderItem ist eine Funktion, die für jedes Element in data aufgerufen wird
// Sie erhält ein Objekt item, das das aktuelle Workout darstellt. Hier wird für
// jedes Workout ein TouchableOpacity gerendert. Wenn der Benutzer darauf drückt,
// wird die Methode router.push aufgerufen, um zur Seite "workouts/item.workoutName"
// zu navigieren und das Workout als Parameter zu übergeben

const styles = StyleSheet.create({
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
