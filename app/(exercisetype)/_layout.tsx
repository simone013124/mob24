import {Stack} from "expo-router";

// stack navigator for exercise layout - index and category
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


            <Stack.Screen name="[category]" options={{
                headerTitle: "Category Details",
            }} />

        </Stack>
    )
}