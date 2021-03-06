import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/colors.js";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./SettingsScreen";
import RequestHistoryScreen from "./RequestHistoryScreen";
import EMSMemberListScreen from "./EMSMemberListScreen";

// This screen is just a container screen for Administrator.
// It has tabs at the bottom thorugh which the Administrator can view other screens available to him.
const AdministratorScreen = ({ route, navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          //Define tab icons.
          if (route.name === "RequestHistoryScreen") {
            return (
              <Entypo
                name="list"
                size={widthPercentageToDP("10%")}
                color={Colors.secondary}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <Ionicons
                name="md-settings"
                size={widthPercentageToDP("8%")}
                color={Colors.secondary}
              />
            );
          } else if (route.name === "EMSMemberListScreen") {
            return (
              <Ionicons
                name="ios-person"
                size={widthPercentageToDP("10%")}
                color={Colors.secondary}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: Colors.tertiary },
        inactiveBackgroundColor: Colors.tertiary,
        tabStyle: { elevation: 4, borderRadius: 10 },
        activeBackgroundColor: Colors.selected,
      }}
    >
      <Tab.Screen
        name="RequestHistoryScreen"
        component={RequestHistoryScreen}
      />
      <Tab.Screen name="EMSMemberListScreen" component={EMSMemberListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiary,
  },
});

export default AdministratorScreen;
