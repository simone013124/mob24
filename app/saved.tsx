import { StyleSheet, View, Text } from 'react-native';
export default function AboutPage() {
    return (
        <View style={styles.container}>
            <Text>Your saved Workouts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});
