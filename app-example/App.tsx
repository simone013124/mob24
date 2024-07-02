import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './mob24/app-example/(tabs)/index.tsx';

const Stack = createStackNavigator();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* Weitere Bildschirme können hier hinzugefügt werden */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
