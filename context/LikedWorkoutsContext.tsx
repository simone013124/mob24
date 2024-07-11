import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '../types/exercise';  // Stelle sicher, dass der korrekte Pfad verwendet wird

// Defines the shape of the context
interface LikedWorkoutsContextProps {
    likedWorkouts: Exercise[]; // Array of liked workouts
    addLikedWorkout: (workout: Exercise) => void; // Function to add a liked workout
    removeLikedWorkout: (workout: Exercise) => void; // Function to remove a liked workout
}

// Create the context
// The context is initialized with an empty object, which is the default value of the context
const LikedWorkoutsContext = createContext<LikedWorkoutsContextProps | undefined>(undefined);


// Custom hook to use the LikedWorkoutsContext
export const useLikedWorkouts = () => {
    const context = useContext(LikedWorkoutsContext);
    if (!context) {
        throw new Error('useLikedWorkouts must be used within a LikedWorkoutsProvider');
    }
    return context;
};

// Provider component for the LikedWorkoutsContext
export const LikedWorkoutsProvider: React.FC = ({ children }) => {
    const [likedWorkouts, setLikedWorkouts] = useState<Exercise[]>([]);

    // Load liked workouts from storage when the component mounts
    useEffect(() => {
        const loadLikedWorkouts = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@liked_workouts'); // Load liked workouts from storage
                if (jsonValue != null) {
                    setLikedWorkouts(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error('Failed to load liked workouts from storage', e);
            }
        };
        loadLikedWorkouts();
    }, []);

    // Save liked workouts to storage when the likedWorkouts state changes
    useEffect(() => {
        const saveLikedWorkouts = async () => {
            try {
                // Convert likedWorkouts array to a JSON string
                const jsonValue = JSON.stringify(likedWorkouts);
                // Save the JSON string to AsyncStorage with the key '@liked_workouts'
                await AsyncStorage.setItem('@liked_workouts', jsonValue);
            } catch (e) {
                console.error('Failed to save liked workouts to storage', e);
            }
        };
        saveLikedWorkouts();
        //second argument is the dependency array, which means that the effect will only run when the likedWorkouts state changes
    }, [likedWorkouts]);

    // Function to add a liked workout
    const addLikedWorkout = (workout: Exercise) => {
        //prevLikedWorkouts is the previous state of likedWorkouts
        //... is the spread operator, which creates a new array with all the elements of the previous state
        //workout is the new workout to add
        setLikedWorkouts((prevLikedWorkouts) => [...prevLikedWorkouts, workout]);
    };

    // Function to remove a liked workout
    const removeLikedWorkout = (workout: Exercise) => {
        // Filter out the workout with the specified ID
        //prevLikedWorkouts is the previous state of likedWorkouts
        //w is the current workout in the array
        //w.id !== workout.id is the condition to filter out the workout with the specified ID
        setLikedWorkouts((prevLikedWorkouts) => prevLikedWorkouts.filter(w => w.id !== workout.id));
    };

    return (
        // The LikedWorkoutsContext.Provider component provides the context value to its children
        <LikedWorkoutsContext.Provider value={{ likedWorkouts, addLikedWorkout, removeLikedWorkout }}>
            {children}
        </LikedWorkoutsContext.Provider>
    );
};
