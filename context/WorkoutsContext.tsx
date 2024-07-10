import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '@/types/workout';
import { Exercise } from '@/types/exercise';

type WorkoutsContextType = {
    workouts: Workout[];
    addWorkout: (workout: Workout) => void;
    addExerciseToWorkout: (workoutId: string, exercise: Exercise) => void;
};

const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

export const WorkoutsProvider: React.FC = ({ children }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

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

    const addWorkout = (workout: Workout) => {
        setWorkouts((currentWorkouts) => [workout, ...currentWorkouts]);
    };

    const addExerciseToWorkout = (workoutId: string, exercise: Exercise) => {
        setWorkouts((currentWorkouts) => {
            return currentWorkouts.map(workout => {
                if (workout.id === workoutId) {
                    return {
                        ...workout,
                        exercises: [...workout.exercises, exercise]
                    };
                }
                return workout;
            });
        });
    };

    return (
        <WorkoutsContext.Provider value={{ workouts, addWorkout, addExerciseToWorkout }}>
            {children}
        </WorkoutsContext.Provider>
    );
};

export const useWorkouts = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw new Error('useWorkouts must be used within a WorkoutsProvider');
    }
    return context;
};
