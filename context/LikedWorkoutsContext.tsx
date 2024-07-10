import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise } from '../types/exercise';  // Stelle sicher, dass der korrekte Pfad verwendet wird

interface LikedWorkoutsContextProps {
    likedWorkouts: Exercise[];
    addLikedWorkout: (workout: Exercise) => void;
    removeLikedWorkout: (workout: Exercise) => void;
}

const LikedWorkoutsContext = createContext<LikedWorkoutsContextProps | undefined>(undefined);

export const useLikedWorkouts = () => {
    const context = useContext(LikedWorkoutsContext);
    if (!context) {
        throw new Error('useLikedWorkouts must be used within a LikedWorkoutsProvider');
    }
    return context;
};

export const LikedWorkoutsProvider: React.FC = ({ children }) => {
    const [likedWorkouts, setLikedWorkouts] = useState<Exercise[]>([]);

    useEffect(() => {
        const loadLikedWorkouts = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@liked_workouts');
                if (jsonValue != null) {
                    setLikedWorkouts(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error('Failed to load liked workouts from storage', e);
            }
        };
        loadLikedWorkouts();
    }, []);

    useEffect(() => {
        const saveLikedWorkouts = async () => {
            try {
                const jsonValue = JSON.stringify(likedWorkouts);
                await AsyncStorage.setItem('@liked_workouts', jsonValue);
            } catch (e) {
                console.error('Failed to save liked workouts to storage', e);
            }
        };
        saveLikedWorkouts();
    }, [likedWorkouts]);

    const addLikedWorkout = (workout: Exercise) => {
        setLikedWorkouts((prevLikedWorkouts) => [...prevLikedWorkouts, workout]);
    };

    const removeLikedWorkout = (workout: Exercise) => {
        setLikedWorkouts((prevLikedWorkouts) => prevLikedWorkouts.filter(w => w.id !== workout.id));
    };

    return (
        <LikedWorkoutsContext.Provider value={{ likedWorkouts, addLikedWorkout, removeLikedWorkout }}>
            {children}
        </LikedWorkoutsContext.Provider>
    );
};
