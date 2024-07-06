import {Stack} from "expo-router";

export default function ExerciseLayout () {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#d19dd1',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24,
            },
        }}
        >
            <Stack.Screen name="index" options={{
                headerTitle: "Categories",

            }}/>


            <Stack.Screen name="categories/[category]" options={{
                headerTitle: "Category Details",
            }} />

        </Stack>
    )
}