import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from './button';
import { Workout } from '@/types/workout';



type WorkoutFormProps = {
    addWorkout: (workout: Workout) => void;
};

const workoutSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),
    description: yup.string()
        .required()
        .min(8),
});

export default function WorkoutForm(props: WorkoutFormProps) {
    // @ts-ignore
    // @ts-ignore
    return (
        <View >
            <Formik
                validationSchema={workoutSchema}
                initialValues={{ title: '', description: '', key: ''}}
                onSubmit={(values: Workout, actions) => {
                    actions.resetForm();
                    props.addWorkout(values);
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <TextInput

                            placeholder='Workout Title'
                            placeholderTextColor='#888'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            style={styles.input}
                        />
                        <Text >{props.touched.title && props.errors.title}</Text>

                        <TextInput

                            multiline
                            placeholder='Description'
                            placeholderTextColor='#888'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                            style={styles.input}
                        />
                        <Text >{props.touched.description && props.errors.description}</Text>
                        <FlatButton onPress={props.handleSubmit} text='Submit' />
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16, // Seitenabstand rundherum
        padding: 16, // Optional: Innenabstand innerhalb der View
        marginTop: 30,
    },
    input: {
        marginBottom: 12, // Optional: Abstand zwischen den TextInputs
    },
});
