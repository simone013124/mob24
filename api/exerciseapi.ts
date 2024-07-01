import { Exercise } from '../types/exercise';

const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';

export const fetchExercises = async (): Promise<Exercise[]> => {
    const response = await fetch(EXERCISES_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const exercisesData: Exercise[] = await response.json();
    console.log('Fetched exercises:', exercisesData);
    return exercisesData;
};



