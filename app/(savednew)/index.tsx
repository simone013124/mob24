import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { router } from "expo-router";
import { useState } from "react";
import Card from '../../components/card';
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutForm from "../../components/workoutForm"; // Updated Form Component

export type Workout = {
    title: string,
    description: string,
    key: string,
    exercises: Exercise[], // Adding exercises array
}

export default function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [workouts, setWorkouts] = useState<Workout[]>([
        { title: 'Morning Yoga', description: 'A relaxing morning yoga routine.', key: '1' },
        { title: 'HIIT Workout', description: 'High intensity interval training.', key: '2' },
        { title: 'Strength Training', description: 'Build muscle and strength.', key: '3' },
    ]);

    const addWorkout = (workout: Workout) => {
        workout.key = Math.random().toString();
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

            <FlatList data={workouts} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push({ pathname: item.key, params: item })}>
                    <Card>
                        <Text >{item.title}</Text>
                    </Card>
                </TouchableOpacity>
            )} />
        </View>
    );
}

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
    }
});