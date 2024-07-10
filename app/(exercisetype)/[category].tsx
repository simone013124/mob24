import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Card from "../../components/card";
import ExerciseComponent from "@/components/ExerciseComponent";



export default function CategoryDetail(props) {

    let item = useLocalSearchParams();

    return (
        <ScrollView contentContainerStyle={styles.fullScreen}>
            <View contentContainerStyle={styles.container}>
            <Card>
                <Text style={styles.text}>{item.title}</Text>
                <View style={styles.rating}>
                    <ExerciseComponent level={item.title} />
                </View>
            </Card>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginVertical: 5,
    },
    resultText: {
        fontSize: 18,
        color: 'green',
        marginVertical: 10,
    },

    text:{
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    },

    fullScreen: {
        flexGrow: 1,

    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },

});

