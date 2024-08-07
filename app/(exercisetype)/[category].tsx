
import { StyleSheet, View, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Card from "../../components/card";
import ExerciseComponent from "@/components/ExerciseComponent";


// This is the component that will be displayed when the user navigates to the category detail screen
export default function CategoryDetail() {

    // Get the item from the local search params
    let item = useLocalSearchParams() as { title: string };
    return (
        <View style={styles.fullScreen}>
            <Card>
                <Text style={styles.text}>{item.title}</Text>
                <View style={styles.rating}>
                    <ExerciseComponent level={item.title} />
                </View>
            </Card>

        </View>
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

