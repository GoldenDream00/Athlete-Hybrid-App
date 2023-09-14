import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";


const CoachQuestionsInput = ({text, term, onTermChange}) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={text} 
        value={term}
        multiline={true}
        onChangeText={newTerm => onTermChange(newTerm)} // Resets state variable to new search
        //onEndEditing={() => onTermSubmit()} //Once user clicks search or is done typing
        //Thes functions are called when text changes or editing is ended
        />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
      marginTop: 15,
      marginBottom: 10,
      backgroundColor: '#F0EEEE',
      height: 60,
      borderRadius: 5,
      borderColor: "red",
      marginHorizontal: 5,
      flexDirection: 'row'
  },
  inputStyle: {
      flex: 1, //Tells this element to take up as much remaining space as possible
      fontSize: 18,
      marginHorizontal: 10

  },
  iconStyle: {
      fontSize: 35 , // Determines size of icon
      alignSelf: 'center',
      marginHorizontal: 15
  }
});

export default CoachQuestionsInput;