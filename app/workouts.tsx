import { StyleSheet, View, Text } from 'react-native';
export default function Workouts() {
    return (
        <View style={styles.container}>
            <Text>All Exercises</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});
