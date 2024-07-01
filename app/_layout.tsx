import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { LikedWorkoutsProvider } from '../context/LikedWorkoutsContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <LikedWorkoutsProvider>
            <TabsLayout />
        </LikedWorkoutsProvider>
    );
}

function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: '#0E6c6c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        }}
        >

            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                title: "Home",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
            }} />

            <Tabs.Screen name="saved" options={{
                headerTitle: "Your Saved Exercises",
                title: "Saved",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="save" color={color} />
            }} />


            <Tabs.Screen name="(exercisetype)" options={{
                headerTitle: "what se fuck",
                title: "exercise",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />
            }} />

        </Tabs>
    );
}
