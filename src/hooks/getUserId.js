import React from 'react';
import {firebase} from '../../firebase/config';
import { Alert } from 'react-native';



export const getUserId = () => {
    const user = firebase.auth().currentUser;
    const teamRef = firebase.firestore().collection('teams');
    teamRef.where("mainCoachID", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.id)
          return doc.id;
      })
    }).catch((error) => {
        Alert.alert(error)
    })

}

