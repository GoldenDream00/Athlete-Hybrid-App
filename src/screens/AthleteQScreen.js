import { View, StyleSheet, Text, Animated, FlatList, Alert, TouchableOpacity} from "react-native";
import { firebase } from '../../firebase/config';
import React, {useState, useEffect} from "react";
import { AntDesign } from '@expo/vector-icons';
import { Slider } from 'react-native-elements'

//WHEN LOCK FILE GOES WRONG
//rm node_modules 
//rm lock-file
//npm cache clean
//npm install
//expo start -c  -- Not exactly sure why this is necessary but it got rid of firebase error

const AthleteQScreen = () => {
  //Getting the questions from firebase and storing them
  const [questionsDatabase, setQuestionsDatabase] = useState([])

  //State to keep track of the values of all sliders for questions
  const [sliderValues, setSliderValues] = useState({})

  //State to track whether answers have been submitted by athlete today
  const [submitted, setSubmitted] = useState("false")

  //Current user info
  const userId = firebase.auth().currentUser.uid
  const userName = firebase.auth().currentUser.displayName
  
  //Path to get the team ID
  const teamIdRef = firebase.firestore().collection('users').doc(userId)

  //Path to get the questions for specific team
  const questionRef = firebase.firestore().collection('teams')

  const getQuestions = () => {
    //1. Get current athletes team id
    //2. Go to the correct team on firebase and grab all questions

    // Global allows access to variable from any file 
    global.currentTeamId = "" 
    
    teamIdRef.get().then((doc) => {
      if (doc.exists) {
        currentTeamId = doc.data().teamId
        //console.log(currentTeamId)
      }
        }).then(() => {    
          questionRef.doc(currentTeamId).collection('questions')
            //.orderBy('createdAt', 'desc')
            .onSnapshot(
              querySnapshot => {
                  const newQuestions = []
                  const questions = {}
                  querySnapshot.forEach(doc => {
                      const question = doc.data()
                      question.id = doc.id
                      question.type = doc.questionType
                      newQuestions.push(question)

                      //adding the questions to the state that keeps track of slider values
                      questions[question.question] = 5
                  });
                  setQuestionsDatabase(newQuestions) //MAYBE just add a property to the questions database to track slider
                  setSliderValues(questions)
                  
                  //console.log("1. ")
                  //ONLY print out after it is saved again (FOR Both)???
                  //console.log(sliderValues)
                  //console.log(questionsDatabase)
              },
              error => {
                Alert.alert(error.message)
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

  const hasSubmitted = () => {
    console.log("TEAM ID ") //GETS here but apparently currentTeamId hasn't been assigned yet
    //WHY???????????
    console.log(currentTeamId)
    questionRef.doc(currentTeamId).collection('athletes').doc(userId).collection('responses')
    .orderBy('time', 'desc')
            .onSnapshot(
              querySnapshot => {
                console.log(querySnapshot[0])
              }
            )
     }
  
  useEffect(() => {
    //Getting the questions to be answered
    getQuestions()

    //Check if the user has already submitted answers today
    //hasSubmitted()
  }, [])

  //Function to render each question in the FlatList
  const renderQuestion = ({item, index}) => {
    //console.log("2. ") //Correctly prints 5
    //console.log(sliderValues[item.question])
    const id = item.id
    return (
        <View style={styles.questionContainer}>
          <View style={styles.insideQuestionContainer}>
            <Text style={styles.textStyle}>
                {index}. {item.question}
            </Text>
            
            <Text style={styles.textStyle2}>
                {sliderValues[item.question]}
                
            </Text>
          </View>
          
  
            <Slider 
              thumbStyle = {{backgroundColor: "#8ecfff", height: 25, width: 25}}
              style = {{padding: 30}}
              value={5}//value is only the START value
              
              onValueChange={(value) => {
                //NEED STATE - Allows you to print out above because it is monitoring the state
                //DO YOU need the function to set state??????
                //Seems to work!
                setSliderValues(prevState => ({
                  ...prevState,
                  [item.question]: value
                }));
                //console.log(sliderValues) //WHY DOES this print a blank object
              }}
              minimumValue={0}
              maximumValue={10}
              step={1}
            />            
        </View>
    )
  }

  //When the form is submitted
  const onSubmitPress = () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    //Recorded Values with timestamp
    const data = {...sliderValues, time:timestamp} 

    questionRef.doc(currentTeamId).collection('athletes').doc(userId).collection('responses')
        .add(data).then(
          Alert.alert("Thanks for submitting " + userName + "!")
        )
      .catch((error) => {
        Alert.alert(error.message)
      })
        
    
  }

  //const user = firebase.auth().currentUser;
  return (
    //Need a flatlist with all questions and a slider input 
    // on submit the values will be recorded and pushed to firebase

    //1. Bring in appropriate questions from firebase
    //2. Render these questions as a flatlist with an input slider
    //3. Add submit button
    <View style={styles.viewStyle}>
      <Text style={styles.titleStyle}>Your Questions</Text>

      { questionsDatabase  && (
            <FlatList 
                style={{margin: 10}}
                data={questionsDatabase}
                keyExtractor={(item) => item.id}
                renderItem={renderQuestion}
                removeClippedSubviews={true}
            />
                 
      )}
      <View style={styles.submitContainer}>
        <TouchableOpacity
            onPress={onSubmitPress}
            style={styles.buttonStyle}
            activeOpacity={0.7}
        >
            <Text style={styles.textStyle3}> Submit </Text>
        </TouchableOpacity>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 30,
    color: "white",
    fontFamily: "goodTimes",
    marginTop: "15%",
    textAlign: "center"
  },
  textStyle: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 15,
    fontFamily: "goodTimes",
    width: "90%"
  },
  textStyle2: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 15,
    fontFamily: "goodTimes",
    width: "90%"
  },
  textStyle3: {
    fontWeight: "bold",
    color: "#8ecfff",
    fontSize: 22,
    fontFamily: "goodTimes",
    width: "90%",
    textAlign: "center"
  },
  viewStyle: {
    paddingVertical: "7%",
    paddingHorizontal: "2%",
    backgroundColor: "black",
    flex: 1
  },
  questionContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  insideQuestionContainer: {
    width: "100%",  
    flexDirection: "row",  
    justifyContent: "space-between",  
    alignItems: "center"  
  },
  buttonStyle: {
    height: 60,
    width: 175,
    borderColor: "#8ecfff",
    marginBottom: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5
  },
  submitContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AthleteQScreen;
