import { Exercise } from '@/types/exercise';

const EXERCISES_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

// async function die eine liste von exercises zurückgibt
export const fetchExercises = async (): Promise<Exercise[]> => {
    const response = await fetch(EXERCISES_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // in exercisesData sind die daten aus der api
    const exercisesData: Exercise[] = await response.json();

    // fügt jeder Übung eine vollständige Bild-URL hinzu
    // spread kopiert alle Eigenschaften der aktuellen Übung (exercise) in ein neues Objekt
    const exercisesWithImageUrls = exercisesData.map(exercise => ({
        ...exercise,
        // fügt eine neue Eigenschaft imageUrl zum neuen Objekt hinzu
        // und kombiniert basis mit individueller URL
        imageUrl: `${IMAGE_BASE_URL}${exercise.imageUrl}`
    }));

    return exercisesWithImageUrls;
};
