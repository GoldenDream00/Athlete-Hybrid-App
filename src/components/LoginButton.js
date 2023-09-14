import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const LoginButton = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("AthleteQ")}>
        <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#8ecfff",
    fontSize: 40,
    marginTop: 20,
    fontFamily: "goodTimes"
  },
});

export default withNavigation(LoginButton);
