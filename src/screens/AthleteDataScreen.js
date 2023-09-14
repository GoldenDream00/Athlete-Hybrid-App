import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { firebase } from '../../firebase/config';
import QuestionBar from '../components/QuestionBar';

const AthleteDataScreen = ({navigation }) => {
  const [responses, setResponses] = useState([]);
  const teamRef = firebase.firestore().collection('teams');
  const userRef = firebase.firestore().collection('users');
  const user = firebase.auth().currentUser;


  const getResponses = () => {
    userRef.doc(user.uid).get()
    .then((document) => {
      const teamRefId = document.data().teamId;
      const responseRef = teamRef.doc(teamRefId).collection('athletes').doc(user.uid).collection('responses')
      responseRef.orderBy('time', 'desc')
      .get()
      .then((querySnapshot) => {
        let responseArray = []
        querySnapshot.forEach((response) => {
          responseRef.doc(response.id).get()
          .then((athleteResponse) => {
            const info = {...athleteResponse.data(), id: response.id}
            responseArray.push(info);
          }).then(() => {
            setResponses(responseArray);
          }).catch((error) => {
            Alert.alert(error.message);
          })
        })
      }).catch((error) => {
        Alert.alert(error.message);
      })

    }).catch((error) => {
      Alert.alert(error.message);
    })

  }
  


  useEffect(() => {
    getResponses()
  }, [])

  return (
    <View style = {styles.viewStyle}>
      <Text style ={styles.textStyle}>My Data</Text>
      <View style = {styles.containerStyle}>
        <FlatList style = {styles.flatListStyle}
        data = {responses}
        renderItem = {({ item }) => {
            return <QuestionBar item = {item} />     
        }}
        keyExtractor = {(item) => item.id}
        />
        </View>
    </View>
  );
};

AthleteDataScreen.navigationOptions  = {
  headerStyle: {
    backgroundColor: "black",
    shadowColor: 'transparent'
  },
  headerTintColor: "#8ecfff",
  headerBackTitle: "Back",
  title: ""
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "white",
    fontFamily: "goodTimes"
  },
  viewStyle: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center'
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: "3%"
  },
  flatListStyle: {
    flex: 1,
},
});



export default AthleteDataScreen;
