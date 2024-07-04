import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

type FlatButtonProps = {
    text: string,
    onPress: () => void
}
export default function FlatButton(props:FlatButtonProps){
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    }
});
