import React, { ReactNode, useEffect } from 'react';
import { SplashScreen, Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { LikedWorkoutsProvider } from '@/context/LikedWorkoutsContext';
import { WorkoutsProvider } from '@/context/WorkoutsContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Verhindern, dass das Splashscreen automatisch ausgeblendet wird
SplashScreen.preventAutoHideAsync();

// Typdefinition für die Props von WorkoutsProvider
interface ProviderProps {
    children: ReactNode;
}

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    });

    // Fehlerbehandlung für das Laden von Schriftarten
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    // Ausblenden des Splashscreens, wenn Schriftarten geladen sind
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null; // Anzeigen eines leeren Bildschirms, während Schriftarten geladen werden
    }

    return (
        <LikedWorkoutsProvider>
            <WorkoutsProvider>
                <TabsLayout />
            </WorkoutsProvider>
        </LikedWorkoutsProvider>
    );
}

// TabsLayout-Komponente zur Definition der Tab-Navigation
function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#d19dd1',
                tabBarInactiveTintColor: 'grey',
                headerStyle: {
                    backgroundColor: '#d19dd1', // Hintergrundfarbe des Headers
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 24,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Home",
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    headerTitle: "Your Saved Exercises",
                    title: "Liked",
                    tabBarIcon: ({ color }) => <FontAwesome name="heart-o" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(exercisetype)"
                options={{
                    headerShown: false,
                    title: "exercise",
                    tabBarIcon: ({ color }) => <MaterialIcons name="fitness-center" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    headerTitle: "About us",
                    title: "about",
                    tabBarIcon: ({ color }) => <SimpleLineIcons name="info" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tips"
                options={{
                    headerTitle: "Tips",
                    title: "tips",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb-on" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="myprogress"
                options={{
                    headerTitle: "myprogress",
                    title: "myprogress",
                    tabBarIcon: ({ color }) => <Entypo name="progress-two" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="workouts"
                options={{
                    headerTitle: "Your customized workouts",
                    title: "workouts",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="save" color={color} />,
                }}
            />
        </Tabs>
    );
}
