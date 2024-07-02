import { Exercise } from '../types/exercise';

const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

export const fetchExercises = async (): Promise<Exercise[]> => {
    const response = await fetch(EXERCISES_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const exercisesData: Exercise[] = await response.json();

    // Füge die vollständige Bild-URL zu jedem Exercise hinzu
    const exercisesWithImageUrls = exercisesData.map(exercise => ({
        ...exercise,
        imageUrl: `${IMAGE_BASE_URL}${exercise.imageUrl}`
    }));

    console.log('Fetched exercises with image URLs:', exercisesWithImageUrls);
    return exercisesWithImageUrls;
};
