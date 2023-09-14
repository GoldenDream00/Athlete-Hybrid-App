import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const CoachAthleteButton = ({ text, navigateto, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateto)}
      style={styles.buttonStyle}
      activeOpacity={0.7}
    >
      <Text style={styles.textStyle}> {text} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 100,
    width: 200,
    borderColor: "#8ecfff",
    marginBottom: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5
  },
  textStyle: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 30,
    fontFamily: "goodTimes"
  },
});

export default withNavigation(CoachAthleteButton);
