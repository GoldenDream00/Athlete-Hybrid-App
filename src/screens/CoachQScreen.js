import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert,
  Vibration} from "react-native";
import CoachQuestionsInput from "../components/CoachQuestionsInput";
import  { firebase } from "../../firebase/config";
import { Keyboard } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import DropdownSelector from "../components/DropdownSelector";

const CoachQScreen = (props) => {
  //Creating a variable term to track state of the search bar
  const [questionText, setQuestionText] = useState('')
  const [questionsDatabase, setQuestionsDatabase] = useState([])

  //State for valid question and question type
  const [opacity, setOpacity] = useState(0);

  //State for the dropdown picker
  const [selectedValue, setSelectedValue] = useState("");

  const userId = firebase.auth().currentUser.uid
  
  const teamIdRef = firebase.firestore().collection('users').doc(userId)
  //console.log("Team Id: " + firebase.firestore().collection('users').doc(userId).get().teamId)
  //Getting the teamId of the current user NOT SURE if we want this in a hook or not

  //global.currentTeamId = "start"
  //GLOBAL IS CHANGING but when the screen updates so does the global var and useEffect doesn't run
  //var [currentTeamId, setTeamId] = useState("");

  const questionRef = firebase.firestore().collection('teams')
  
  //Helper function to run only at the start of running the page
  const getQuestions = () => {
    global.currentTeamId = "start" //THE KEY!! Not sure why var doesn't work
    // Global allows access to variable from any file 
    
    teamIdRef.get().then((doc) => {
      if (doc.exists) {
        currentTeamId = doc.data().teamId      

        //State does not return a promise so .then() is not waiting on it
        //The state gets set correctly but not in time
      
        }
        }).then(() => {    
          questionRef.doc(currentTeamId).collection('questions')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
              querySnapshot => {
                  const newQuestions = []
                  querySnapshot.forEach(doc => {
                      const question = doc.data()
                      question.id = doc.id
                      question.type = doc.questionType
                      newQuestions.push(question)
                  });
                  setQuestionsDatabase(newQuestions)
              },
              error => {
                  console.log(error)
              }
            )
        })
        .catch((error) => {
          Alert.alert(error.message)
        })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }
  useEffect(() => {
    getQuestions()
  }, [])

  const onQuestionAddPress = () => {
    if (questionText && questionText.length > 0 && selectedValue != "") {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      //Type of Question
      const questionType = selectedValue;
      const data = {
        question: questionText,
        questionType,
        //authorID: userID,
        createdAt: timestamp,
      };

      questionRef.doc(currentTeamId).collection('questions')
        .add(data)
        .then(_doc => {
          setQuestionText('')
          setSelectedValue('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        })
    }
    else{
        setOpacity(1);
        Vibration.vibrate();
        const timer = setTimeout(() => {
          setOpacity(0);
        }, 2000);
        return () => clearTimeout(timer);
      
    }
  }
      

  const onDeletePress = (id) => {
    questionRef.doc(currentTeamId).collection('questions')
    .doc(id).delete().catch((error) => {
      Alert.alert(error.message)
    });
  }


  const renderQuestion = ({item, index}) => {
    const id = item.id
    return (
        <View style={styles.questionContainer}>
            <Text style={styles.textStyle}>
                {index}. {item.question}   ---   ({item.questionType})
            </Text>
            
            <TouchableOpacity
              onPress={() => onDeletePress(id)} 

            > 
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>

        </View>
    )
  }

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.titleTextStyle}>Team Questions</Text>
      <CoachQuestionsInput text="Enter a question..." term={questionText} onTermChange={setQuestionText} />
      
      <DropdownSelector currentValue={selectedValue} onValueChange={setSelectedValue} />

      <TouchableOpacity
        onPress={onQuestionAddPress}
        style={styles.buttonStyle}
        activeOpacity={0.7}
        >
        <Text style={styles.textStyle}> Add Question </Text>
      </TouchableOpacity>

      <View style={{opacity: opacity}}>
          <Text style={styles.toastStyle}>
            Enter a valid question and question type
          </Text>
      </View>

      <Text style={styles.titleTextStyle2} >Current Questions</Text>
      { questionsDatabase && (
                
            <FlatList 
                style={{margin: 10}}
                data={questionsDatabase}
                keyExtractor={(item) => item.id}
                renderItem={renderQuestion}
                removeClippedSubviews={true}
            />
                 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    paddingVertical: "7%",
    paddingHorizontal: "2%",
    backgroundColor: "black",
    flex: 1,
  },
  buttonStyle: {
    height: 40,
    width: 175,
    borderColor: "#8ecfff",
    marginBottom: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5
  },
  textStyle: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 15,
    fontFamily: "goodTimes",
    width: "90%"
  },
  titleTextStyle: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 30,
    fontFamily: "goodTimes",
    marginTop: 10
  },
  titleTextStyle2: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 25,
    fontFamily:
    "goodTimes"
  },
  listContainer: {
    padding: 10,
},
  questionContainer: {
  marginTop: 16,
  borderBottomColor: '#cccccc',
  borderBottomWidth: 1,
  paddingBottom: 16,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: "center"
},
toastStyle: {
  color: "red",
  margin: 3,
  fontSize: 17,
},
});

export default CoachQScreen;
