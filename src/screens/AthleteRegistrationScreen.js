import React, {useState} from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, Alert } from "react-native";
import Spacer from '../components/Spacer';
import AuthForm from '../components/AuthForm';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";

const AthleteRegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teamCode, setTeamCode] = useState('');

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.");
      return;
    }
    if(name == ''){
      Alert.alert("Please Enter a name!");
      return;
    }
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const user = response.user;
        user.updateProfile({
          displayName: name
        });
        const data = {
          id: uid,
          email,
          name,
          type: "athlete"
        };
        const Team = firebase.firestore().collection("teams");
        Team.where("signUpCode", "==", teamCode)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            Team.doc(doc.id)
            .collection("athletes")
            .doc(uid)
            .set(data)
            .then(() => {
              const userRef = firebase.firestore().collection("users");
                userRef
                  .doc(uid)
                  .set({ teamId: doc.id, type: "athlete", name})
                  .then(() => {
                    navigation.navigate("Questions");
                  })
                  .catch((error) => {
                    alert(error);
                  });
            }).catch((error) => {
              alert(error);
            });
          })

        }).catch((error) => {
          console.log("1");
          alert(error);
        })

      }).catch((error) => {
        console.log("here");
        alert(error);
      });
        
  };
  return (
      <View style = {styles.viewStyle}>
        <KeyboardAwareScrollView>
        <Text style = {styles.textStyle}>Athlete Registration</Text>
        <AuthForm text = "Full Name" onTermChange= {setName} cap = "words"/>
        <AuthForm text = "Email" onTermChange = {setEmail} />
        <AuthForm text = "Password" onTermChange = {setPassword} secure = {true}/>
        <AuthForm text = "Confirm Password" onTermChange = {setConfirmPassword} secure = {true}/>
        <AuthForm text = "Team Code" onTermChange = {setTeamCode}/>
        <Spacer space={"7%"} />
        <View style = {styles.buttonContainer}>
          <TouchableOpacity onPress = {onRegisterPress}
            style = {styles.buttonStyle}>
            <Text style = {styles.opacityStyle}>Register</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
      </View>
   
  )
};

AthleteRegistrationScreen.navigationOptions = {
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
    fontFamily: "goodTimes",
    textAlign: "center",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "black"
  },
  opacityStyle: {
    color: '#8ecfff',
    fontSize: 25
  },
  buttonStyle: {
    height: 75,
    width: 150,
    borderColor: "#8ecfff",
    marginBottom: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5
  },
  buttonContainer: {
    alignItems: 'center'
  }
});

export default AthleteRegistrationScreen;
