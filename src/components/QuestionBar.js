import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '../../firebase/config';
import { withNavigation } from "react-navigation";


const QuestionBar = ({ item, navigation }) => {
    const time = item.time.toDate().toString();
    const index = time.indexOf("GMT");
    const componentTime = time.slice(0, index);
    return (
         <TouchableOpacity style = {styles.viewStyle}
         onPress = {() => {
            navigation.navigate('QuestionInfo', {question: item})
         }}
         >
            <Text style = {styles.textStyle}> {componentTime} </Text>
         </TouchableOpacity>
        )
    
};

const styles = StyleSheet.create({
    viewStyle: {
        borderColor: 'white',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: 80,
        marginTop: "5%"

    },
    textStyle: {
        color: '#8ecfff',
        fontSize: 25,
        marginVertical: 25
        
    },
    opacityStyle: {
        flex: 1
    }

});
export default withNavigation(QuestionBar);