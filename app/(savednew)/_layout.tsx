import {Stack} from "expo-router";

export default function WorkoutLayout () {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
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