import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const About: React.FC = () => {
    return (
        <LinearGradient
            colors={['#d2a9d2', '#e7e4e4', '#a9c6d2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={localStyles.fullScreen}
        >
            <ScrollView contentContainerStyle={localStyles.scrollContainer}>
                <View style={localStyles.container}>
                    <Text style={localStyles.text}>this is us - josica.</Text>

                    <Text style={localStyles.text1}>johanna.</Text>
                    <Text style={localStyles.text1}>simone.</Text>
                    <Text style={localStyles.text1}>carmen.</Text>

                    <Image source={require('@/assets/images/josica1.jpeg')} style={localStyles.josica} />

                    <Text style={localStyles.text}>
                        johanna - gym rat and basketball icon.
                    </Text>
                    <View style={localStyles.innerContainer}>
                        <Image source={require('@/assets/images/johanna1.png')} style={localStyles.imageInner} />
                        <Text style={localStyles.text1}>
                            Meet Johanna. {"\n"}At just 25 years old, she’s the embodiment of fitness and fun. Whether she's pumping iron or running drills, Johanna is a beast in the gym, known for her incredible strength and dedication.
                            She’s the one who turns heads with her perfect form and infectious energy.{"\n"}{"\n"}
                            But Johanna doesn’t stop at the gym. She’s also a star player in her local basketball club!{"\n"}{"\n"}
                            Johanna’s motto? {"\n"}<Text style={localStyles.motto}>“Sweat now, shine later – and always have fun doing it!”</Text>
                        </Text>
                        <Image source={require('@/assets/images/johanna2.jpeg')} style={localStyles.imageInner} />
                    </View>

                    <Text style={localStyles.text}>
                        simone - hiking enthusiast and yoga specialist.
                    </Text>
                    <View style={localStyles.innerContainer}>
                        <Image source={require('@/assets/images/simone1.jpeg')} style={localStyles.imageInner} />
                        <Text style={localStyles.text1}>
                            Simone is 25 years old and a true adventure seeker. {"\n"}In her free time, she loves to hang out in her charming hometown of Schladming, where she scales every mountain in sight. Whether it’s a steep climb or a casual hike, Simone conquers them all with a smile.{"\n"}
                            {"\n"}{"\n"}When she’s not mountain climbing, Simone finds her zen in Hagenberg by practicing yoga. She twists and bends with the grace of a seasoned yogi, turning every yoga session into a serene escape.{"\n"}{"\n"}
                            Simones motto? {"\n"}<Text style={localStyles.motto}>“Climb high, breathe deep, and find balance in every peak and pose!”</Text>
                        </Text>
                        <Image source={require('@/assets/images/simone2.png')} style={localStyles.imageInner} />
                    </View>

                    <Text style={localStyles.text}>
                        carmen - marathon runner and kayak passionate.
                    </Text>
                    <View style={localStyles.innerContainer}>
                        <Image source={require('@/assets/images/carmen1.png')} style={localStyles.imageInner} />
                        <Text style={localStyles.text1}>
                           This is Carmen, 24 years old. {"\n"}She’s dedicated to running, regularly taking on marathons with a steady pace and a smile. Carmen enjoys the challenge and the satisfaction of crossing each finish line.
                            {"\n"}{"\n"}
                            When she’s not running, you’ll find her out on the water, kayaking through rivers and lakes. She loves the peacefulness of paddling and the joy of being surrounded by nature. Her passion for both running and kayaking keeps her active and always ready for a new adventure.
                           .{"\n"}{"\n"}
                            Carmens motto?{"\n"} <Text style={localStyles.motto}> “Stride with purpose, paddle with passion!”</Text>
                        </Text>
                        <Image source={require('@/assets/images/carmen2.png')} style={localStyles.imageInner} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const localStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    josica: {
        ...Platform.select({
            web: {
                width: '30%',
                height: 300,
                borderRadius: 15, // Abgerundete Ecken
                marginBottom: 90,
            },
            default: {
                width: '100%',
                height: 200,
                borderRadius: 15, // Abgerundete Ecken
                marginBottom: 20,
            },
        }),
    },
    innerContainer: {
        marginBottom: 20, // Abstand zum Text
        backgroundColor: '#E6E6FA',
        padding: 10,
        borderRadius: 15, // Abgerundete Ecken
        alignItems: 'center',
        width: '90%',
        ...Platform.select({
            web: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            default: {
                flexDirection: 'column',
            },
        }),
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15, // Abgerundete Ecken
        marginBottom: 20, // Abstand zum Text
    },
    imageInner: {
        width: '100%',
        height: 250,
        borderRadius: 15, // Abgerundete Ecken
        marginBottom: 20, // Abstand zum Text
        ...Platform.select({
            web: {
                width: 300,
                marginHorizontal: 10,
            },
        }),
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#E6E6FA',
        padding: 10,
        borderRadius: 15, // Abgerundete Ecken
    },
    text1: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
        ...Platform.select({
            web: {
                flex: 1,
            },
        }),
    },
    motto: {
        fontWeight: 'bold',
    },
});

export default About;
