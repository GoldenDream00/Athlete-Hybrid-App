import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  Switch,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../firebase/config";
import DisplayJoinCode from "../components/DisplayJoinCode";

const CoachSettingsScreen = ({ navigation }) => {
  const [isAthleteCode, changeAthleteCode] = useState(false);
  const [isCoachCode, changeCoachCode] = useState(false);
  const [signUpCode, setSignUpCode] = useState("");
  const [coachCode, setCoachCode] = useState("");
  const [teamName, setTeamName] = useState("...");

  const uid = firebase.auth().currentUser.uid;
  const userRef = firebase.firestore().collection("users").doc(uid);
  var teamId;
  

  userRef
    .get()
    .then((user) => {
      teamId = user.data().teamId;
    })
    .then(() => {
      let teamRef = firebase.firestore().collection("teams").doc(teamId);
      teamRef
        .get()
        .then((team) => {
          setCoachCode(team.data().coachCode);
          setSignUpCode(team.data().signUpCode);
          if (signUpCode) changeAthleteCode(true);
          if (coachCode) changeCoachCode(true);
          setTeamName(team.data().teamName);
        })
        .catch((error) => {
          Alert.alert(error.message);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    })
    .catch((error) => {
      Alert.alert(error.message);
    });

  

  var toggleAthlete = () => {
    let teamRef = firebase.firestore().collection("teams").doc(teamId);
    if (isAthleteCode) {
      teamRef
        .update({
          signUpCode: "",
        })
        .then(() => {
          setSignUpCode("");
          changeAthleteCode(false);
        })
        .catch((error) => {
          Alert.alert("Whoa, slow down!");
        });
    } else {
      const newJoinCode = randomNumberGenerator();
      teamRef
        .update({ signUpCode: newJoinCode })
        .then(() => {
          changeAthleteCode(true);
          setSignUpCode(newJoinCode);
        })
        .catch((error) => {
          Alert.alert("Whoa, slow down!");
        });
    }
  };
  const toggleCoach = () => {
    let teamRef = firebase.firestore().collection("teams").doc(teamId);
    if (isCoachCode) {
      teamRef
        .update({
          coachCode: "",
        })
        .then(() => {
          setCoachCode("");
          changeCoachCode(false);
        })
        .catch((error) => {
          Alert.alert("Whoa, slow down!");
        });
    } else {
      const newJoinCode = randomNumberGenerator();
      teamRef
        .update({ coachCode: newJoinCode })
        .then(() => {
          changeCoachCode(true);
          setCoachCode(newJoinCode);
        })
        .catch((error) => {
          Alert.alert("Whoa, slow down!");
        });
    }
  };

  const randomNumberGenerator = () => {
    let newCode = "";
    for (let i = 0; i < 6; i++) {
      newCode += Math.floor(Math.random() * 10);
    }
    return newCode;
  };

  const onLogOutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("loginFlow");
      })
      .catch((error) => {
        Alert.alert("Logout Failed");
      });
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.headerStyle}>Settings</Text>
      <Text style={styles.teamNameStyle}>{teamName}</Text>
      <View style={{ marginBottom: "5%" }}>
        <DisplayJoinCode code={signUpCode} type="Athlete" />
        <View style={styles.joinCodeButton}>
          <Text style={styles.buttonTextStyle}>Add Athletes</Text>
          <Switch
            trackColor={{ false: "red", true: "#8ecfff" }}
            thumbColor="white"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleAthlete}
            value={isAthleteCode}
          />
        </View>
      </View>
      <View>
        <DisplayJoinCode code={coachCode} type="Coach" />
        <View style={styles.joinCodeButton}>
          <Text style={styles.buttonTextStyle}>Add Coaches</Text>
          <Switch
            trackColor={{ false: "red", true: "#8ecfff" }}
            thumbColor="white"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleCoach}
            value={isCoachCode}
          />
        </View>
      </View>
      <View style={styles.logOutContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={onLogOutPress}>
          <Text style={styles.opacityStyle}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  joinCodeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1%",
  },
  headerStyle: {
    fontSize: 30,
    color: "#8ecfff",
    fontFamily: "goodTimes",
    marginTop: "5%",
    textAlign: "center",
  },
  teamNameStyle: {
    fontSize: 20,
    color: "white",
    fontFamily: "goodTimes",
    marginBottom: "10%",
    textAlign: "center",
  },
  viewStyle: {
    paddingVertical: "7%",
    paddingHorizontal: "2%",
    backgroundColor: "black",
    flex: 1,
  },
  buttonTextStyle: {
    color: "white",
    fontFamily: "goodTimes",
    fontSize: 18,
  },
  buttonStyle: {
    height: 75,
    width: 200,
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

export default CoachSettingsScreen;
