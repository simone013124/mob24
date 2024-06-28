/*import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}*/

import {SplashScreen, Tabs} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {FontAwesome} from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded, error] = useFonts({
        'nunito-regular':require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold':require('../assets/fonts/Nunito-Bold.ttf'),
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

    return <TabsLayout />;
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
            <Tabs.Screen name="(reviews)" options={{
                headerShown: false,
                title: "Reviews",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
            }}/>

            <Tabs.Screen name="index" options={{
                headerTitle: "Home",
                title: "Home",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
            }}/>

            <Tabs.Screen name="saved" options={{
                headerTitle: "Your Saved Exercises",
                title: "Saved",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="save" color={color} />
            }}/>
            <Tabs.Screen name="workouts" options={{
                headerTitle: "workouts",
                title: "workouts",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />
            }}/>



        </Tabs>

    )
}
