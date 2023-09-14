import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const CodeBar = ({text, term, onTermChange}) => {
    return <View style = {styles.codebar}>
        <TextInput style = {styles.input}
        placeholder = {text}
        placeholderTextColor = "#8ecfff" 
        autoCapitalize = "none"
        autoCorrect = {false}
        value = {term}
        onChangeText = {(newTerm) => onTermChange(newTerm)}
        color = "#8ecfff"
        />
        </View>
}

const styles = StyleSheet.create({
    codebar: {
        backgroundColor: 'black',
        height: 50,
        width: 300,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        borderBottomWidth: 4,
        borderBottomColor: "#8ecfff"
    },
    input : {
        flex: 1,
        marginLeft: 5
    }
});

export default CodeBar;
