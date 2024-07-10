import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TextInput} from 'react-native';
import { Exercise } from '@/types/exercise';
import {Formik} from "formik";
import * as Yup from "yup";
import {useLocalSearchParams} from "expo-router";

import AsyncStorage from '@react-native-async-storage/async-storage';
import FlatButton from "@/components/button";

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

interface ExerciseDetailProps {
    exercise: Exercise;
    onBack: () => void;
}

const exerciseSchema = Yup.object({
    repetitions: Yup.number()
        .required('Please enter the number of repetitions.')
        .min(1, 'The repetitions must be at least 1.')
        .integer('Please enter a valid & whole number.')
});

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onBack }) => {
    const [repetitions, setRepetitions] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const photos = exercise.images;  // Assuming `exercise.images` is an array of image paths

    useEffect(() => {
        const loadRepetitions = async () => {
            try {
                const savedRepetitions = await AsyncStorage.getItem(`@repetitions_${exercise.id}`);
                if (savedRepetitions !== null) {
                    setRepetitions(parseInt(savedRepetitions, 10));
                }
            } catch (e) {
                console.error('Failed to load repetitions from storage', e);
            }
        };

        loadRepetitions();
    }, [exercise.id]);

    const saveRepetitions = async (reps: number) => {
        try {
            await AsyncStorage.setItem(`@repetitions_${exercise.id}`, reps.toString());
        } catch (e) {
            console.error('Failed to save repetitions to storage', e);
        }
    };

    // Store the first photo
    const firstPhoto = `${IMAGE_BASE_URL}${photos[0]}`;
    let item = useLocalSearchParams();
    return (
        <ScrollView style={styles.fullScreen}>
            <View style={styles.container}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Image
                source={{ uri: firstPhoto }}
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

            <Formik
                validationSchema={exerciseSchema}
                initialValues={{ repetitions: '' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    const reps = parseInt(values.repetitions, 10);
                    setRepetitions(reps);
                    saveRepetitions(reps);
                }}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <View>
                        <Text style={styles.text}>Your Repetitions</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='0'
                            onChangeText={handleChange('repetitions')}
                            value={values.repetitions.toString()}
                            keyboardType='numeric'
                        />
                        {touched.repetitions && errors.repetitions && (
                            <Text style={styles.errorText}>{errors.repetitions}</Text>
                        )}
                        <FlatButton onPress={handleSubmit} text="Save Reps" />
                        {repetitions !== null && (
                            <Text style={styles.resultText}>You have completed {repetitions} repetitions. You are a Beast.</Text>
                        )}
                    </View>
                )}
            </Formik>
            <FlatButton text="Back" onPress={onBack} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
    },


    fullScreen: {
        flexGrow: 1,
        marginBottom: 90,
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginVertical: 5,
    },
    resultText: {
        fontSize: 18,
        color: 'green',
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 10,
    },
});

export default ExerciseDetail;
