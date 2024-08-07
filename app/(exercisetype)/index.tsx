import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import {router} from "expo-router";
import {useState} from "react";
import Card from '../../components/card';


//define the type for the category object
export type Category = {
    title: string,
    key: string
}

// ExercisePage component
export default function ExercisePage() {

    const [modalOpen, setModalOpen] = useState(false);

    // State for storing the categories
    const [categories, setCategories] = useState<Category[]>([
        { title: 'beginner', key: '1' },
        { title: 'intermediate', key: '2' },
        { title: 'expert', key: '3' },
    ]);


    // nimmt key von jedem item und rendert jedes item in liste
    // auf klicken wird die key an die url angehängt und eine detailseite geöffnet [category].tsx
    return (
        <View>
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