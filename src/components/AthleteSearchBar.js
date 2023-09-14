import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import {Feather} from '@expo/vector-icons';

const AthleteSearchBar = ({text, term, onTermChange }) => {
    return <View style = {styles.codebar}>
        <Feather name = "search" size = {20} color = {'#8ecfff'} style ={styles.iconStyle}/>
        <TextInput style = {styles.input}
        placeholder = {text}
        placeholderTextColor = "#8ecfff" 
        autoCapitalize = "none"
        autoCorrect = {false}
        value = {term}
        onChangeText = {(newTerm) => onTermChange(newTerm)}
        color = "#8ecfff"
        autoCapitalize = "words"
        />
        </View>
}

const styles = StyleSheet.create({
    codebar: {
        backgroundColor: 'black',
        height: 50,
        width: 400,
        borderRadius: 20,
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'white'
    },
    input : {
        flex: 1,
        marginLeft: 5
    },
    iconStyle: {
        marginTop: 12,
        marginLeft: 5
    }
});

export default AthleteSearchBar;