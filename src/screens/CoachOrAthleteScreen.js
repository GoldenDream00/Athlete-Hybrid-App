import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import CoachAthleteButton from "../components/CoachAthleteButton";
import Spacer from "../components/Spacer";
import { AntDesign } from "@expo/vector-icons";

const CoachOrAthleteScreen = ({ navigation }) => {
  return (
    <View style={styles.viewStyle}>
      <Spacer space={"20%"} />
      <Text style={styles.textStyle}>Sign up as</Text>
      <Text style={styles.textStyle}>Coach or Athlete</Text>
      <Spacer space={40} />
      <CoachAthleteButton text={"Coach"} navigateto={"CoachJoinCreate"} />
      <CoachAthleteButton text={"Athlete"} navigateto={"AthleteRegistration"} />

    </View>
  );
};

CoachOrAthleteScreen.navigationOptions  = {
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
    color: "white",
    fontSize: 30,
    bottom: 20,
    fontFamily: "goodTimes",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});

export default CoachOrAthleteScreen;
