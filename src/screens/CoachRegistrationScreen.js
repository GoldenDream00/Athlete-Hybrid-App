import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";
import { firebase } from "../../firebase/config";
//import AsyncStorage from '@react-native-community/async-storage';

const CoachRegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [teamName, setTeamName] = useState("");

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const user = response.user;
        // user.updateProfile({
        //   displayName: name
        // });
        const data = {
          id: uid,
          email,
          name,
          type: "coach"
        };
        const newTeam = firebase.firestore().collection("teams");
        newTeam
          .add({
            teamName: teamName,
            mainCoachID: uid,
            signUpCode: "",
            coachCode: "",
          })
          .then((docRef) => {
            newTeam
              .doc(docRef.id)
              .collection("associateCoaches")
              .doc(uid)
              .set(data)
              .then(() => {
                const userRef = firebase.firestore().collection("users");
                userRef
                  .doc(uid)
                  .set({ teamId: docRef.id, type: "coach", name})
                  .then(() => {
                    navigation.navigate("coachFlow");
                  })
                  .catch((error) => {
                    alert(error);
                  });
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.screenStyle}>
      <KeyboardAwareScrollView>
        <Text style={styles.textStyle}>Coach/Team Registration</Text>
        <AuthForm text="Full Name" onTermChange={setName} cap="words" />
        <AuthForm text="Email" onTermChange={setEmail} />
        <AuthForm text="Password" onTermChange={setPassword} secure={true} />
        <AuthForm
          text="Confirm Password"
          onTermChange={setConfirmPassword}
          secure={true}
        />
        <AuthForm text="Team Name" onTermChange={setTeamName} />
        <Spacer space={"7%"} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onRegisterPress}
            style={styles.buttonStyle}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonTextStyle}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

CoachRegistrationScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: "black",
    shadowColor: "transparent",
  },
  headerTintColor: "#8ecfff",
  headerBackTitle: "Back",
  title: "",
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "white",
    fontFamily: "goodTimes",
    textAlign: "center",
  },
  screenStyle: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonStyle: {
    height: 100,
    width: 200,
    borderColor: "#8ecfff",
    marginBottom: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 30,
    fontFamily: "goodTimes",
  },
});

export default CoachRegistrationScreen;
