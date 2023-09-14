import React, { useReducer, useState } from "react";
import { Alert } from "react-native";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import { firebase } from '../../firebase/config';
import AuthForm from '../components/AuthForm';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spacer from '../components/Spacer';

const AthleteSettingsScreen = ({ navigation }) => {
  const [newName, setNewName] = useState('');
  const user = firebase.auth().currentUser;
  const userRef = firebase.firestore().collection("users");
  const teamRef = firebase.firestore().collection('teams');
  const currentUserRef = firebase.firestore().collection('users').doc(user.uid);


  const updateName = () => {
    user.updateProfile({
      displayName: newName
    }).then(() => {
      userRef.doc(user.uid).update({
        name: newName
      })
      currentUserRef.get()
      .then((document) => {
        const userteamId = document.data().teamId
        teamRef.doc(userteamId).collection("athletes").doc(user.uid).update({
          name: newName
        })
        setNewName('')
        console.log(newName)
      }).catch((error) => {
        Alert.alert(error.message)
      })

    }).catch((error) => {
      Alert.alert(error.message)
    })
  }

  const onLogOutPress = () => {
    firebase.auth().signOut()
    .then(() => {
      navigation.navigate("loginFlow");
    }).catch((error) => {
        Alert.alert("Logout Failed");
    })
  }

  const deleteUser = () => {
    user.delete()
    .then(() => {
      currentUserRef.get()
      .then((document) => {
        const userteamId = document.data().teamId
        teamRef.doc(userteamId).collection("athletes").doc(user.uid).delete()
        .then(() => {
          currentUserRef.delete()
          .then(() => {
            navigation.navigate("Signin")
          }).catch((error) => {
            Alert.alert(error.message)
          })
        }).catch((error) => {
          Alert.alert(error.message)
        })
      }).catch((error) => {
        Alert.alert(error.message)
      })

    }).catch((error) => {
      Alert.alert(error.message)
    })
  }
  return (
    <View style={styles.viewStyle}>
      <KeyboardAwareScrollView>
      <Text style={styles.textStyle}>Settings</Text>
      <AuthForm text = "Update Name" onTermChange= {setNewName} cap = "words" />
      <Spacer space = "5%"/>
      <View style={styles.logOutContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={updateName}>
          <Text style={styles.opacityStyle}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logOutContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={deleteUser}>
          <Text style={styles.opacityStyle}>Delete User</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logOutContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={onLogOutPress}>
          <Text style={styles.opacityStyle}>Log Out</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "white",
    fontFamily: "goodTimes",
    marginTop: "15%",
    textAlign: "center"
  },
  viewStyle: {
    paddingVertical: "7%",
    paddingHorizontal: "2%",
    backgroundColor: "black",
    flex: 1
  },
  buttonTextStyle: {
    color: "white",
    fontFamily: "goodTimes",
    fontSize: 18,
  },
  buttonStyle: {
    height: 75,
    width: 250,
    borderColor: "#8ecfff",
    marginBottom: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
  },
  opacityStyle: {
    color: "#8ecfff",
    fontSize: 25,
    fontFamily: "goodTimes",
  },
  logOutContainer: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default AthleteSettingsScreen;
