import React, { useState } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Font from "expo-font";

import AppLoading from "expo-app-loading";
//import { CoachProvider } from "./src/context/CoachContext";

import SigninScreen from "./src/screens/SigninScreen";
import CoachOrAthleteScreen from "./src/screens/CoachOrAthleteScreen";
import CoachJoinCreateScreen from "./src/screens/CoachJoinCreateScreen";
import AthleteJoinCodeScreen from "./src/screens/AthleteJoinCodeScreen";
import CoachCreateTeamScreen from "./src/screens/CoachCreateTeamScreen";
import CoachJoinCodeScreen from "./src/screens/CoachJoinCodeScreen";
import AthleteRegistrationScreen from "./src/screens/AthleteRegistrationScreen";
import CoachRegistrationScreen from "./src/screens/CoachRegistrationScreen";
import AthleteQScreen from "./src/screens/AthleteQScreen";
import AthleteDataScreen from "./src/screens/AthleteDataScreen";
import AthleteSettingsScreen from "./src/screens/AthleteSettingsScreen";
import CoachQScreen from "./src/screens/CoachQScreen";
import TeamDataScreen from "./src/screens/TeamDataScreen";
import CoachSettingsScreen from "./src/screens/CoachSettingsScreen";
import ByPassScreen from "./src/screens/ByPassScreen";
import AthleteInfoScreen from "./src/screens/AthleteInfoScreen";
import QuestionInfoScreen from './src/screens/QuestionInfoScreen';

const fetchFont = () => {
  return Font.loadAsync({
    abnes: require("./assets/fonts/abnes.ttf"),
    goodTimes: require("./assets/fonts/good-times-rg.ttf"),
    papyrus: require("./assets/fonts/papyrus.ttf"),
  });
};

const switchNavigator = createSwitchNavigator({
  ByPass: ByPassScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    CoachOrAthlete: CoachOrAthleteScreen,
    CoachJoinCreate: CoachJoinCreateScreen,
    AthleteJoinCode: AthleteJoinCodeScreen,
    CoachJoinCode: CoachJoinCodeScreen,
    CoachRegistration: CoachRegistrationScreen,
    CoachCreateTeam: CoachCreateTeamScreen,
    AthleteRegistration: AthleteRegistrationScreen,
  }),
  athleteFlow: createBottomTabNavigator({
    "My Data": createStackNavigator({
      Data: AthleteDataScreen,
      QuestionInfo: QuestionInfoScreen
    }),
    Questions : AthleteQScreen,
    Settings: AthleteSettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      activeBackgroundColor: "#8ecfff",
      inactiveBackgroundColor: "black",
      showIcon: false,
      flex: 1,

      tabStyle: {
        flexDirection: "column",
        justifyContent: "center", //centers the content vertically
      },
      labelStyle: {
        fontSize: 13,
        fontFamily: "goodTimes",
        fontWeight: "bold",
        alignItems: "center", //Centers the text horizontally
      },

    }

  }
  ),
  coachFlow: createBottomTabNavigator(
    {
      
      "Team Data": createStackNavigator({
        TeamData: TeamDataScreen,
        AthleteInfo: AthleteInfoScreen,
        QuestionInfo: QuestionInfoScreen
      }),
      Questions: CoachQScreen,
      Settings: CoachSettingsScreen,
    },
    {
      //CHANGE TO CUSTOM TAB NAVIGATOR??? https://reactnavigation.org/docs/bottom-tab-navigator/
      //Styling
      // Documentation - https://reactnavigation.org/docs/bottom-tab-navigator/
      tabBarOptions: {
        activeTintColor: "black",
        activeBackgroundColor: "#8ecfff",
        inactiveBackgroundColor: "black",
        showIcon: false,

        tabStyle: {
          flexDirection: "column",
          justifyContent: "center", //centers the content vertically
        },

        labelStyle: {
          fontSize: 13,
          fontFamily: "goodTimes",
          fontWeight: "bold",
          alignItems: "center", //Centers the text horizontally
        },

        /*
      tabStyle: {
        backgroundColor: "gray",
        flexDirection: "column", 
        activeTintColor: "white",
        inactiveTintColor: "#8ecfff",
           
      } ,

      labelStyle: {
        fontSize: 20,
        fontFamily: "goodTimes",
        fontWeight: "bold"
      }
      */
      },
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("ERROR")}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    //<CoachProvider>
      <App />
    //</CoachProvider>
  );
};
