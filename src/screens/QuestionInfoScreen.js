import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

const QuestionInfoScreen = ({navigation }) => {
    const question = navigation.getParam('question');
    delete question['time'];
    delete question['id'];
    let questionArray = [];
    Object.keys(question).forEach((field) => {
        const questionData = {
            question: field,
            answer: question[field]
        }
        questionArray.push(questionData);
    })
    return (
    <View style = {styles.viewStyle}>
        <Text style={styles.textStyle}>Answers</Text>
        <View style = {styles.containerStyle}>
            <FlatList style = {styles.flatListStyle}
            data = {questionArray}
            renderItem = {({ item }) => {
                return <View style ={styles.view2style}>
                <Text style = {styles.answerStyle}>{item.question}</Text> 
                <Text style = {styles.answer2Style}> {item.answer}</Text>
                </View>
            }}
            keyExtractor = {(item) => item.question}
            />
        </View>
    </View>
    );
};

QuestionInfoScreen.navigationOptions  = {
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
    fontSize: 30,
    color: "white",
    fontFamily: "goodTimes"
  },
  viewStyle: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'

  },
  containerStyle: {
    flexDirection: 'column',
    flex: 1,
  },
   flatListStyle: {
    flex: 1,
    marginTop: "3%"
  },
  answerStyle: {
    fontSize: 20,
    color: "#8ecfff",
    fontFamily: "goodTimes",
    marginVertical: "5%"
  },
  view2style: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    flex: 1,
    flexDirection: "column",
    alignItems: 'center'
  },
  answer2Style: {
    fontSize: 40,
    color: "white",
    fontFamily: "goodTimes",
    marginBottom: '10%'

  }
});

export default QuestionInfoScreen;