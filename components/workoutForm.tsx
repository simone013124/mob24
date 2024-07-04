import { Button, TextInput, View, Text } from 'react-native';
//import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from './button';

export type Workout = {
    title: string,
    duration: number,
    description: string,
    key: string
};

type WorkoutFormProps = {
    addWorkout: (workout: Workout) => void;
};

const workoutSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),
    duration: yup.number()
        .required()
        .positive()
        .integer(),
    description: yup.string()
        .required()
        .min(8),
});

export default function WorkoutForm(props: WorkoutFormProps) {
    return (
        <View >
            <Formik
                validationSchema={workoutSchema}
                initialValues={{ title: '', duration: '', description: '', key: ''}}
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

                            placeholder='Duration (minutes)'
                            onChangeText={props.handleChange('duration')}
                            value={props.values.duration.toString()}
                            keyboardType='numeric'
                        />
                        <Text >{props.touched.duration && props.errors.duration}</Text>
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
