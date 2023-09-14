import React, {useState} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import CodeBar from '../components/CodeBar';


const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    return (
        <View>
        <Text style = {styles.textStyle}>Registration</Text>
        <CodeBar text = "Athlete Name"
        term = {name}
        onTermChange = {setName}
        />
        <CodeBar 
        text = "Athlete Age"
        term = {age}
        onTermChange = {setAge}
        />
        </View>

        

    )

};

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontSize: 30,
        fontFamily: "abnes"

    }

});

export default RegistrationForm;
