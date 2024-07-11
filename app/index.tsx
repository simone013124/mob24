import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { Quote } from '@/types/quote';
import { fetchQuote } from '@/api/quoteapi';

// Home screen component
export default function HomeScreen() {

    // State for storing the quote
    const [quote, setQuote] = useState<Quote | null>(null);
    //state for loading the quote - shows if the quote is loading
    const [loading, setLoading] = useState(true);

    // Fetch a random quote from the API
    useEffect(() => {
        const fetchRandomQuote = async () => {
            try {
                const data = await fetchQuote();
                // Set the quote in state
                setQuote(data);
                // Set loading to false
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quote:', error);
                setLoading(false);
            }
        };

        fetchRandomQuote();
    }, []);

    // Display a background image with a title and a quote
    // Display a loading indicator while fetching the quote
    // Display the quote content and author
    return (
        <ImageBackground source={require('../assets/images/fitness.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, Johannes!</Text>
                <View style={styles.quoteContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={styles.quote}>"{quote?.content}" - {quote?.author}</Text>
                    )}
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    quoteContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    quote: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
