import {Stack} from "expo-router";

export default function ExerciseLayout () {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#d19dd1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: '',
            },
        }}
        >
            <Stack.Screen name="index" options={{
                headerTitle: "Categories",

            }}/>


            <Stack.Screen name="[category]" options={{
                headerTitle: "Category Details",
            }} />

        </Stack>
    )
}