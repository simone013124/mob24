import React, {useState} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Button, TextInput} from 'react-native';
import { Exercise } from '../types/exercise';
import globalStyles from '../styles/global';
import {Formik} from "formik";
import * as Yup from "yup";
import {useLocalSearchParams} from "expo-router";
import FlatButton from './button.tsx';

const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

interface ExerciseDetailProps {
    exercise: Exercise;
    onBack: () => void;
}

const exerciseSchema = Yup.object({
    repetitions: Yup.number()
        .required('Bitte die Anzahl der Wiederholungen eingeben.')
        .min(1, 'Die Wiederholungen müssen mindestens 1 sein.')
        .integer('Bitte eine ganze Zahl eingeben.')
});

const ExerciseDetail: React.FC<ExerciseDetailProps> = ({ exercise, onBack }) => {
    const [repetitions, setRepetitions] = useState(null);
    let item = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
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

            <Formik
                validationSchema={exerciseSchema}
                initialValues={{ repetitions: '' }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    setRepetitions(values.repetitions);
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
                        <FlatButton onPress={handleSubmit} text="Save" />
                        {repetitions && (
                            <Text style={styles.resultText}>You have completed {repetitions} repetitions. You are a fucking Beast.</Text>
                        )}
                    </View>
                )}
            </Formik>
            <FlatButton text="Back" onPress={onBack} />
        </ScrollView>
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

    text:{
        fontSize: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 10,
    }
});

export default ExerciseDetail;