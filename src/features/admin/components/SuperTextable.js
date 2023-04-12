import { Text, StyleSheet } from 'react-native';

export default function SuperTextable(props) {
    return (
        <Text>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        //todo
    }
})