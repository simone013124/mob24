import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ExerciseListScreen = () => {
    const exercises = [
        { id: '1', title: 'beginner' },
        { id: '2', title: 'intermediate' },
        { id: '3', title: 'expert' },
        // Weitere Übungskategorien hier hinzufügen
    ];

    return (
        <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text>{item.title}</Text>
                </View>
            )}
        />
    );
};

export default ExerciseListScreen;

/* data={data}
           renderItem={({ item }) => (
               <ListItem
                   title={stretching}
                   onPress={() => {
                       navigation.navigate('ExerciseDetail', item);
                   }}
               />
           )}
           keyExtractor={(item) => item.id}*/