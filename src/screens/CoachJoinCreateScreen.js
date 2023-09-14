import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import CoachAthleteButton from '../components/CoachAthleteButton';
import Spacer from '../components/Spacer'

const CoachJoinCreateScreen = ({navigation}) => {
  return (
    <View style = {styles.viewStyle}>
      <Spacer space={"20%"} />
      <Text style={styles.textStyle}>Join Or</Text>
      <Text style={styles.textStyle}>Create</Text>
      <Spacer space={40} />
      <CoachAthleteButton text={"Join"} navigateto={"CoachJoinCode"} />
      <CoachAthleteButton text={"Create"} navigateto={"CoachRegistration"} />
    </View>
  );
};

CoachJoinCreateScreen.navigationOptions  = {
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
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center'
  }
});

export default CoachJoinCreateScreen;
