import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import firebase from '../../firebase/config';
import { withNavigation } from "react-navigation";


const AthleteBar = ({ item, navigation }) => {
    return (
         <TouchableOpacity style = {styles.viewStyle}
         onPress = {() => {
            navigation.navigate('AthleteInfo', {athlete: item})
         }}
         >
            <Text style = {styles.textStyle}> {item.name} </Text>
         </TouchableOpacity>
        )
    
};

const styles = StyleSheet.create({
    viewStyle: {
        borderColor: 'white',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 60,
        borderRadius: 50,
        marginTop: 5

    },
    textStyle: {
        color: '#8ecfff',
        fontSize: 20,
        marginVertical: 15,
        marginLeft: 5
        
    },
    opacityStyle: {
        flex: 1
    }

});

export default withNavigation(AthleteBar);