import {Stack} from "expo-router";

export default function WorkoutLayout () {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#d19dd1',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 18,
            },
        }}
        >
            <Stack.Screen name="index" options={{
                headerTitle: "Workouts Overviews",
                title: "Workout Overviews"
            }}/>
            <Stack.Screen name="[workout]" options={{
                headerTitle: "Workout Details",
                title: "Workout Details"
            }}/>
        </Stack>
    )
}