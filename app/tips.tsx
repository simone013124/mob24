import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';

// Definiere den Typ für die Kategorie-IDs, füge '4' für die neue Kategorie hinzu
type CategoryId = '1' | '2' | '3' | '4';

const tips: React.FC = () => {
    // State-Hook zur Verwaltung der ausgewählten Kategorie
    const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);

    // Liste der Kategorien mit IDs, Titeln und Pfaden zu den Hintergrundbildern
    const categories = [
        { id: '1', title: 'Ernährungstipps', image: require('../assets/images/ernaehrung.png') },
        { id: '2', title: 'Fitnessstudio-Tipps', image: require('../assets/images/gym.png') },
        { id: '3', title: 'Motivationstipps', image: require('../assets/images/motivation.png') },
        { id: '4', title: 'Regeneration und Erholung', image: require('../assets/images/relax.png') }
    ];

    // Datenobjekt mit Tipps, gruppiert nach Kategorie-IDs
    const tipsData: { [key in CategoryId]: string[] } = {
        '1': [
            'Trinke ausreichend Wasser.',
            'Iss mehr Protein.',
            'Vermeide verarbeitete Lebensmittel.',
            'Plane deine Mahlzeiten im Voraus.',
            'Esse bunt, um alle notwendigen Nährstoffe zu erhalten.',
            'Reduziere Zucker, besonders in gesüßten Getränken und Snacks.',
            'Iss langsam und kaue gründlich, um die Verdauung zu verbessern.'
        ],
        '2': [
            'Wärme dich auf, bevor du trainierst.',
            'Achte auf die richtige Form.',
            'Steigere langsam das Gewicht.',
            'Führe ein Trainingstagebuch.',
            'Fokussiere dich auf die Atmung.',
            'Dehne dich regelmäßig.',
            'Nutze freie Gewichte für ein effektiveres Training.'
        ],
        '3': [
            'Setze dir realistische Ziele.',
            'Finde einen Trainingspartner.',
            'Erstelle eine motivierende Playlist.',
            'Setze Zwischenziele, um motiviert zu bleiben.',
            'Belohne dich selbst nach Erreichen eines Ziels.',
            'Visualisiere deine Erfolge.',
            'Verfolge deinen Fortschritt mit Fotos oder Tagebüchern.'
        ],
        '4': [
            'Achte darauf, jede Nacht 7-9 Stunden Schlaf zu bekommen.',
            'Plane leichte Aktivitäten wie Spaziergänge, Yoga oder Schwimmen an Ruhetagen.',
            'Integriere regelmäßiges Dehnen und Mobilitätsübungen in deinen Alltag.',
            'Trinke ausreichend Wasser, um den Flüssigkeitsverlust durch Schwitzen auszugleichen.',
            'Iss eine ausgewogene Mahlzeit oder einen Snack innerhalb von 30-60 Minuten nach dem Training.',
            'Nutze Massagerollen, Bälle oder Besuche bei einem Masseur.',
            'Probiere Techniken wie Eisbäder, Sauna oder Wechselduschen aus.',
            'Plane regelmäßige Pausen und Regenerationstage in deinem Trainingsprogramm ein.'
        ]
    };

    // Funktion zum Verarbeiten des Klicks auf eine Kategorie
    const handleCategoryPress = (categoryId: CategoryId) => {
        setSelectedCategory(categoryId);
    };

    // Render-Funktion für einzelne Tipps in der Detailansicht
    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {selectedCategory === null ? (
                // Wenn keine Kategorie ausgewählt ist, zeige die Kategorienauswahl an
                <View>
                    <Text style={styles.title}>Wähle eine Kategorie</Text>
                    <View style={styles.categoriesContainer}>
                        {categories.map(category => (
                            // Kategoriebox mit Hintergrundbild und Titel
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
            ) : (
                // Wenn eine Kategorie ausgewählt ist, zeige die Tipps dieser Kategorie an
                <View>
                    <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
                        <Text style={styles.backButtonText}>← Zurück zu den Kategorien</Text>
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
    );
}

// Stile für die verschiedenen Komponenten der Benutzeroberfläche
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
        width: '50%',
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
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
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
        backgroundColor: '#e0e0e0',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
    },
    tipText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default tips;
