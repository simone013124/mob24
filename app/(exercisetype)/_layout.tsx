import {Stack} from "expo-router";

export default function ExerciseLayout () {
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
                headerTitle: "Kategorien",
                title: "Hier die Kategorien"
            }}/>


            <Stack.Screen name="[category]" options={{
                headerTitle: "Category Details",
                title: "Category Details" }} />

        </Stack>
    )
}