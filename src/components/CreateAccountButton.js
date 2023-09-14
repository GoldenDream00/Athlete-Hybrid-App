import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const CreateAccountButton = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("CoachOrAthlete")}>
        <Text style={styles.textStyle}>Create Account </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#707070",
    fontSize: 25,
    marginTop: 5,
    fontFamily: "goodTimes"
  },
});

export default withNavigation(CreateAccountButton);
