import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Vibration,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CreateAccountButton from "../components/CreateAccountButton";
import LoginBar from "../components/LoginBar";
import LoginButton from "../components/LoginButton";
import Spacer from "../components/Spacer";
import { firebase } from "../../firebase/config";
import Animated from "react-native-reanimated";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opacity, setOpacity] = useState(0);

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              Alert.alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            if (user["type"] === "coach") {
              navigation.navigate("coachFlow");
            } else {
              navigation.navigate("athleteFlow");
            }
          })
          .catch((error) => {
            Alert.alert(error);
          });
      })
      .catch((exception) => {
        setOpacity(1);
        Vibration.vibrate();
        const timer = setTimeout(() => {
          setOpacity(0);
        }, 2000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.viewStyle}>
        <Spacer space={40} />
        <Text style={styles.kumoStyle}>KUMO</Text>
        <View style={styles.underlineStyle} />
        <Text style={styles.metricStyle}>Metrics</Text>
        <Spacer space={"5%"} />
        <LoginBar
          text={"Email"}
          term={email}
          onTermChange={setEmail}
          secure={false}
        />
        <LoginBar
          text={"Password"}
          term={password}
          onTermChange={setPassword}
          secure={true}
        />
        <View style={{opacity: opacity}}>
          <Text style={styles.toastStyle}>
            Incorrect email/password combination
          </Text>
        </View>
        <Spacer space={"4%"} />
        <TouchableOpacity onPress={() => onLoginPress()}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
        <Spacer space={10} />
        <CreateAccountButton />
      </View>
    </TouchableWithoutFeedback>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
  },
  kumoStyle: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#8ecfff",
    marginTop: 150,
    fontFamily: "abnes",
  },
  metricStyle: {
    fontSize: 30,
    color: "#707070",
    bottom: 20,
    marginLeft: 100,
    fontWeight: "bold",
    fontFamily: "abnes",
    padding: 10,
  },
  login: {
    alignSelf: "flex-start",
    left: 50,
  },
  textStyle: {
    color: "#8ecfff",
    fontSize: 40,
    marginTop: 20,
    fontFamily: "goodTimes",
  },
  toastStyle: {
    color: "red",
    margin: 10,
    fontSize: 17,
  },
});

export default SigninScreen;
