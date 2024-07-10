import { Button, TextInput, View, Text } from 'react-native';
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
                    <View>
                        <TextInput

                            placeholder='Workout Title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                        />
                        <Text >{props.touched.title && props.errors.title}</Text>

                        <TextInput

                            multiline
                            placeholder='Description'
                            onChangeText={props.handleChange('description')}
                            value={props.values.description}
                        />
                        <Text >{props.touched.description && props.errors.description}</Text>
                        <FlatButton onPress={props.handleSubmit} text='Submit' />
                    </View>
                )}
            </Formik>
        </View>
    );
}
