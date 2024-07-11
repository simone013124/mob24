import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for category IDs
type CategoryId = '1' | '2' | '3' | '4';

// Tips screen component
const Tips: React.FC = () => {

    // State for storing the selected category
    const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);

    const categories = [
        { id: '1', title: 'Nutrition Tips', image: require('../assets/images/ernaehrung.png') },
        { id: '2', title: 'Gym Tips', image: require('../assets/images/gym.png') },
        { id: '3', title: 'Motivation Tips', image: require('../assets/images/motivation.png') },
        { id: '4', title: 'Recovery and Relaxation', image: require('../assets/images/relax.png') }
    ];

    const tipsData: { [key in CategoryId]: string[] } = {
        '1': [
            'Drink plenty of water.',
            'Eat more protein.',
            'Avoid processed foods.',
            'Plan your meals ahead.',
            'Eat a variety of colors to get all necessary nutrients.',
            'Reduce sugar, especially in sweetened drinks and snacks.',
            'Eat slowly and chew thoroughly to improve digestion.'
        ],
        '2': [
            'Warm up before you exercise.',
            'Focus on proper form.',
            'Increase weight gradually.',
            'Keep a workout journal.',
            'Focus on your breathing.',
            'Stretch regularly.',
            'Use free weights for more effective training.'
        ],
        '3': [
            'Set realistic goals.',
            'Find a workout buddy.',
            'Create a motivating playlist.',
            'Set milestones to stay motivated.',
            'Reward yourself after reaching a goal.',
            'Visualize your successes.',
            'Track your progress with photos or journals.'
        ],
        '4': [
            'Aim to get 7-9 hours of sleep each night.',
            'Plan light activities like walks, yoga, or swimming on rest days.',
            'Incorporate regular stretching and mobility exercises into your routine.',
            'Drink enough water to replace fluids lost through sweat.',
            'Eat a balanced meal or snack within 30-60 minutes after training.',
            'Use massage rollers, balls, or visit a masseur.',
            'Try techniques like ice baths, sauna, or contrast showers.',
            'Plan regular breaks and recovery days in your training schedule.'
        ]
    };

    // Function to handle category selection
    const handleCategoryPress = (categoryId: CategoryId) => {
        setSelectedCategory(categoryId);
    };

    // Function to render the tips list
    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.tipContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome name="check-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.tipText}>{item}</Text>
        </View>
    );

    return (
        <LinearGradient
            colors={['#d2a9d2', '#e7e4e4', '#a9c6d2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fullScreen}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {selectedCategory === null ? (
                        <View>
                            <Text style={styles.title}>Select a Category</Text>
                            <View style={styles.categoriesContainer}>
                                {categories.map(category => (
                                    <TouchableOpacity
                                        key={category.id}
                                        style={styles.categoryBox}
                                        onPress={() => handleCategoryPress(category.id as CategoryId)}
                                    >
                                        <ImageBackground source={category.image} style={styles.imageBackground} imageStyle={styles.imageStyle}>
                                            <View style={styles.overlay}>
                                                <Text style={styles.categoryText}>{category.title}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ) : // Display the tips for the selected category
                        (
                        <View>
                            <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
                                <Text style={styles.backButtonText}>← Back to Categories</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={tipsData[selectedCategory]}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.tipsList}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    categoryBox: {
        width: '45%',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    imageBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 10,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    tipsList: {
        alignItems: 'center',
    },
    tipContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    tipText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#333',
        flex: 1,
    },
});

export default Tips;
