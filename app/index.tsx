// index.tsx
import React from 'react';
import { View, Text } from 'react-native';
import ExerciseComponent from '../components/ExerciseComponent'; // Pfad anpassen, falls notwendig

const Index: React.FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', margin: 20 }}>Hello JOSICA</Text>

        </View>
    );
};

export default Index;
