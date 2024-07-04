import { StyleSheet, View, Text, Image } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import Card from "../../components/card";


export default function Workout() {
    let item= useLocalSearchParams();

    return (
        <Card>
            <Text>{item.title }</Text>
            <Text>{item.body }</Text>
            <View >
                <Text>what is item</Text>
            </View>
        </Card>
    );
}
