import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import ExerciseComponent from '../components/ExerciseComponent';
import {LikedWorkoutsContext} from "@/context/LikedWorkoutsContext";
import styles from "@/styles/exercise";

const about: React.FC = () => {

        return (
            <View style={[styles.container, styles.center]}>
                <Text>wir sind cool.</Text>
            </View>
        );
    }

    export default about;
