import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { firebase } from '../../firebase/config';
import QuestionBar from '../components/QuestionBar';


const AthleteInfoScreen = ({navigation}) => {
    const [responses, setResponses] = useState([]);
    const teamRef = firebase.firestore().collection('teams');
    const user = firebase.auth().currentUser;
    const athlete = navigation.getParam('athlete');

    const getResponses = () => {
        teamRef.where("mainCoachID", "==", user.uid)
        .get()
        .then((query) => {
            query.forEach((document) => {
                const responseRef = teamRef.doc(document.id).collection('athletes').doc(athlete.id).collection('responses')
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
            })
        }).catch((error) => {
            Alert.alert(error.message);
        })
    }


    useEffect(() => {
        getResponses()
    }, []);

    return (
        <View style = {styles.viewStyle}>
            <Text style = {styles.textStyle}>{athlete.name}</Text>
            <Text style = {styles.emailStyle}>{athlete.email}</Text>
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
    )

};

AthleteInfoScreen.navigationOptions  = {
    headerStyle: {
      backgroundColor: "black",
      shadowColor: 'transparent'
    },
    headerTintColor: "#8ecfff",
    headerBackTitle: "Back",
    title: ""
  };

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    textStyle: {
        color: '#8ecfff',
        fontSize: 30,
        fontFamily: "goodTimes"
    },
    emailStyle : {
        color: 'white',
        fontSize: 13,
        fontFamily: "goodTimes",
        marginTop: "2%"
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

export default AthleteInfoScreen;