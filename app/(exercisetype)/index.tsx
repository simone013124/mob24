import {StyleSheet, View, Text, Pressable, FlatList, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {router} from "expo-router";
import {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import Card from '../../components/card';


export type Category = {
    title: string,
    key: string
}

export default function ExercisePage() {
    // ist ein State, der steuert, ob das Modal geöffnet oder geschlossen ist, zu Beginn geschlossen
    const [modalOpen, setModalOpen] = useState(false);

    // auch ein state, dass wenn man es abändert, die Kategorienliste neu gerendert wird
    const [categories, setCategories] = useState<Category[]>([
        { title: 'beginner', key: '1' },
        { title: 'intermediate', key: '2' },
        { title: 'expert', key: '3' },
    ]);


    return (
        <View>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={24}
                            style={{...styles.modalToggle, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <FlatList data={categories} renderItem={({ item }) => (
                <Pressable onPress={() => router.push({pathname:item.key, params:item})}>
                    <Card>
                        <Text style={styles.text}>{ item.title }</Text>
                    </Card>
                </Pressable>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },

    text:{
        fontSize: 18,
        fontWeight: 'bold',

    }

});