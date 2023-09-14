import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import LoginBar from "../components/LoginBar";
import Spacer from "../components/Spacer";

const AthleteJoinCodeScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>Enter Team Join Code</Text>
        <Spacer space={"10%"} />
        <LoginBar
          text="Athlete Code"
          term={term}
          onTermChange={(newTerm) => setTerm(newTerm)}
        />
        <Spacer space={40} />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("AthleteRegistration")}
        >
          <Text style={styles.opacityStyle}>Join Team</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

AthleteJoinCodeScreen.navigationOptions = {
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
    fontSize: 25,
    color: "white",
    marginTop: "30%",
    fontFamily: "goodTimes",
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  opacityStyle: {
    color: "#8ecfff",
    fontSize: 25,
    fontFamily: "goodTimes"
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
});

export default AthleteJoinCodeScreen;
