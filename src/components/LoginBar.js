import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const LoginBar = ({ text, term, onTermChange, secure }) => {
  return (
    <View style={styles.signinStyle}>
      <TextInput
        style={styles.inputStyle}
        placeholder={text}
        autoCapitalize="none"
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
    backgroundColor: "black",
    height: 50,
    width: "90%",
    borderRadius: 5,
    marginTop: 10,
    flexDirection: "row",
    borderBottomWidth: 4,
    borderBottomColor: "#8ecfff",
  },
  inputStyle: {
    flex: 1,
    marginLeft: 5,
    color: "#8ecfff",
    fontSize: 25,
    padding: 0
  },
});

export default LoginBar;
