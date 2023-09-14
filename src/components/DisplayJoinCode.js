import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const DisplayJoinCode = ({ code, type }) => {
  if (code) {
    return (
      <View style={styles.codeContainer}>
        <Text style={styles.headerText}>{type} Code</Text>
        <View style={styles.digitsContainer}>
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(0)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(1)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(2)}</Text>
          </View>
          <View style={{ height: 4, width: 10, backgroundColor: "#8ecfff" }} />
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(3)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(4)}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.digitStyle}>{code.charAt(5)}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.codeContainer}>
        <Text style={styles.headerText}>{type} Code</Text>
        <View style={styles.digitsContainer}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={{ height: 4, width: 10, backgroundColor: "#8ecfff" }} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "goodTimes",
    color: "white",
  },
  codeContainer: {
    backgroundColor: "#2F2F2F",
    padding: 3,
    borderRadius: 10,
  },
  box: {
    backgroundColor: "#707070",
    height: 70,
    width: "15%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  digitStyle: {
    color: "#8ecfff",
    fontFamily: "goodTimes",
    fontSize: 50,
    textAlign: "center",
  },
  digitsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DisplayJoinCode;
