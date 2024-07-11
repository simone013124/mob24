import { Exercise } from '@/types/exercise';

const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

// Fetches exercises from the API and returns them as an array of Exercise objects
export const fetchExercises = async (): Promise<Exercise[]> => {
    const response = await fetch(EXERCISES_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const exercisesData: Exercise[] = await response.json();

    // Add imageUrl property to each exercise object
    const exercisesWithImageUrls = exercisesData.map(exercise => ({
        ...exercise,
        imageUrl: `${IMAGE_BASE_URL}${exercise.imageUrl}`
    }));

    return exercisesWithImageUrls;
};
