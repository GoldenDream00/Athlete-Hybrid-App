import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const AuthForm = ({ text, term, onTermChange, secure, cap="none" }) => {
  return (
    <View style={styles.signinStyle}>
      <Text style={{ color: "#8ecfff", fontSize: 20, fontFamily: "goodTimes" }}>
        {text}:
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={text}
        autoCapitalize={cap}
        autoCorrect={false}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        secureTextEntry={secure}
        placeholderTextColor="#707070"
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signinStyle: {
    height: 50,
    width: "90%",
    marginTop: "10%",
    alignSelf: "center",
  },
  inputStyle: {
    backgroundColor: "black",
    flex: 1,
    color: "#8ecfff",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 10,
    borderRadius: 5,
    borderBottomWidth: 4,
    borderBottomColor: "#8ecfff",
  },
});

export default AuthForm;
