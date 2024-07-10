import React, { createContext, useState, ReactNode } from 'react';
import { Workout } from '@/types/workout';

type LikedWorkoutsContextType = {
    workouts: Workout[];
    addWorkout: (workout: Workout) => void;
};

export const LikedWorkoutsContext = createContext<LikedWorkoutsContextType | undefined>(undefined);

export const LikedWorkoutsProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const addWorkout = (workout: Workout) => {
        setWorkouts((currentWorkouts) => [...currentWorkouts, workout]);
    };

    return (
        <LikedWorkoutsContext.Provider value={{ workouts, addWorkout }}>
            {children}
        </LikedWorkoutsContext.Provider>
    );
};
