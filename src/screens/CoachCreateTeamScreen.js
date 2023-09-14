import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const CoachCreateTeamScreen = ({navigation}) => {
  return (
    <View>
      <Text style={styles.textStyle}>CoachCreateTeamScreen</Text>
      <Button title="Create Team" onPress={() => navigation.navigate("coachFlow")} />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default CoachCreateTeamScreen;
