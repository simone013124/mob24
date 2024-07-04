import { SplashScreen, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { LikedWorkoutsProvider } from '../context/LikedWorkoutsContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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

            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
            }} />

            <Tabs.Screen name="saved" options={{
                headerTitle: "Your Saved Exercises",
                title: "Saved",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="save" color={color} />
            }} />


            <Tabs.Screen name="(exercisetype)" options={{
                headerShown: false,
                title: "exercise",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />
            }} />

            <Tabs.Screen name="about" options={{
                headerTitle: "About us",
                title: "about",
                tabBarIcon: ({ color }) => <SimpleLineIcons name="info" size={24} color="grey" />

            }} />

            <Tabs.Screen name="tips" options={{
                headerTitle: "Tips",
                title: "tips",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb-on" size={24} color="grey" />
            }} />

            <Tabs.Screen name="myprogress" options={{
                headerTitle: "myprogress",
                title: "myprogress",
                tabBarIcon: ({ color }) => <Entypo name="progress-two" size={24} color="grey" />
            }} />

            <Tabs.Screen name="(savednew)" options={{
                headerTitle: "Your Saved Exercises",
                title: "Saved",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="save" color={color} />
            }} />

            </Tabs>


    );
}
