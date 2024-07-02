import {
    StyleSheet,
    View,
    Text,
    Pressable,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {router} from "expo-router";
import {useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import Card from '../../components/card';


export type Review = {
    title: string,
    rating: number,
    body: string,
    key: string
}

export default function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([
        { title: 'Beginner', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Intermediate', rating: 5, body: 'lorem ipsum', key: '1' },
        { title: 'Pro', rating: 5, body: 'lorem ipsum', key: '1' },

    ]);

    const addReview = (review:Review) => {
        review.key = Math.random().toString();
        setReviews((currentReviews) => {
            return [review, ...currentReviews];
        });
        setModalOpen(false);
    };

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


            <MaterialIcons
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />

            <FlatList data={reviews} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push({pathname:item.key, params:item})}>
                    <Card>
                        <Text>{ item.title }</Text>
                    </Card>
                </TouchableOpacity>
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
    }
});

