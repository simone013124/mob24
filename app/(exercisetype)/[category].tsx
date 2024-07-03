import { StyleSheet, View, Text, Image } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import Card from "../../components/card";
import ExerciseComponent from "@/components/ExerciseComponent";


export default function CategoryDetail() {
    let item= useLocalSearchParams();

    return (
        <Card>

            <Text>{item.title }</Text>
            <Text>{item.body }</Text>
            <View style={styles.rating}>
                <Text>fuuu</Text>
                <ExerciseComponent level={item.title} />

            </View>
        </Card>
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
    }
});