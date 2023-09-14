import React from 'react';
import { Text, Button, View } from 'react-native';
import { firebase } from '../../firebase/config';


const ByPassScreen = ({ navigation }) => {
    const user = firebase.auth().currentUser;
    if(user){
        if(user.type === "athlete"){
            navigation.navigate('athleteFlow');
        } else if(user.type === "coach"){
            navigation.navigate("coachFlow");
        }
    }else{
        navigation.navigate('Signin');
    }
    return( 
        <View>
            <Text>Loading </Text>
        </View>
    )
}

export default ByPassScreen;