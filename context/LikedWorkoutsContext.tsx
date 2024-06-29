// context/LikedWorkoutsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Exercise } from '../types/exercise';

interface LikedWorkoutsContextProps {
    likedWorkouts: Exercise[];
    addLikedWorkout: (workout: Exercise) => void;
    removeLikedWorkout: (workout: Exercise) => void;
}

export const LikedWorkoutsContext = createContext<LikedWorkoutsContextProps | undefined>(undefined);

export const useLikedWorkouts = () => {
    const context = useContext(LikedWorkoutsContext);
    if (!context) {
        throw new Error('useLikedWorkouts must be used within a LikedWorkoutsProvider');
    }
    return context;
};

export const LikedWorkoutsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [likedWorkouts, setLikedWorkouts] = useState<Exercise[]>([]);

    const addLikedWorkout = (workout: Exercise) => {
        setLikedWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
    };

    const removeLikedWorkout = (workout: Exercise) => {
        setLikedWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== workout.id));
    };

    return (
        <LikedWorkoutsContext.Provider value={{ likedWorkouts, addLikedWorkout, removeLikedWorkout }}>
            {children}
        </LikedWorkoutsContext.Provider>
    );
};

/*// In deiner LikedWorkoutsContext.tsx Datei oder einer ähnlichen Datei, die deinen Kontext verwaltet
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Exercise } from '../types/exercise';

interface LikedWorkoutsContextProps {
    likedWorkouts: Exercise[];
    addLikedWorkout: (workout: Exercise) => void;
    removeLikedWorkout: (workout: Exercise) => void;
    likeWorkout: (workoutId: string) => void; // Neue Funktion hinzufügen
}

// ...

export const LikedWorkoutsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [likedWorkouts, setLikedWorkouts] = useState<Exercise[]>([]);

    // ...

    const likeWorkout = (workoutId: string) => {
        // Hier kannst du Logik hinzufügen, um das Workout mit der gegebenen workoutId zu markieren
        // Beispiel:
        const workoutToLike = allExercises.find(workout => workout.id === workoutId);
        if (workoutToLike) {
            setLikedWorkouts(prevWorkouts => [...prevWorkouts, workoutToLike]);
        }
    };

    return (
        <LikedWorkoutsContext.Provider value={{ likedWorkouts, addLikedWorkout, removeLikedWorkout, likeWorkout }}>
            {children}
        </LikedWorkoutsContext.Provider>
    );
};
*/