import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '@/types/workout';
import { Exercise } from '@/types/exercise';

type WorkoutsContextType = {
    workouts: Workout[];
    addWorkout: (workout: Workout) => void;
    addExerciseToWorkout: (workoutId: string, exercise: Exercise) => void;
    removeExerciseFromWorkout: (workoutId: string, exerciseId: string) => void;
};


const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

// @ts-ignore
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
        setWorkouts((currentWorkouts) => [
            { ...workout, exercises: [] }, // Initialize exercises if not present
            ...currentWorkouts
        ]);
    };


    const addExerciseToWorkout = (workoutId: string, exercise: Exercise) => {
        setWorkouts((currentWorkouts) => {
            return currentWorkouts.map(workout => {
                if (workout.id === workoutId) {
                    const exercises = workout.exercises || []; // Initialize exercises if not present
                    return {
                        ...workout,
                        exercises: [...exercises, exercise]
                    };
                }
                return workout;
            });
        });
    };

    const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
        const updatedWorkouts = workouts.map(workout => {
            if (workout.id === workoutId) {
                const updatedExercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
                return {
                    ...workout,
                    exercises: updatedExercises,
                };
            }
            return workout;
        });
        setWorkouts(updatedWorkouts);
    };


    // @ts-ignore
    return (
        <WorkoutsContext.Provider value={{ workouts, addWorkout, addExerciseToWorkout, removeExerciseFromWorkout}}>
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
