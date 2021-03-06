import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  AsyncStorage
} from "react-native";
import Colors from "../constants/colors.js";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import MyButton from "../components/MyButton";
import Photo from "../components/Photo";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
import { signup } from "../components/dbComm";
import { CommonActions } from "@react-navigation/native";

// This is the sign up screen. It is only available to requester.
const SignupScreen = ({ route, navigation }) => {
  const [isNextPressed, setIsNextPressed] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [picture, setPicture] = useState(require("../assets/dummy.png"));
  const [isSigningUp, setIsSigningUp] = useState(false);
  let content;

  const loginPressHandler = () => {
    console.log("login Pressed");
    navigation.goBack();
  };

  const nextPressHandler = () => {
    if (newPassword !== newConfirmPassword) {
      Alert.alert("Password do not match", "", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else if (newPassword.length < 6) {
      Alert.alert("Password length should be atleast six", "", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else {
      setIsNextPressed(true);
    }
  };
  const handleChangePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setPicture({ uri: result.uri });
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  const signupHandler = async () => {
    console.log("Sign Up Finish Pressed.");
    if (newPhone.length !== 11 || newPhone.match(/[0-9]/g).length !== 11) {
      Alert.alert("Please enter a valid phone number", "", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    } else {
      let userProfile = {
        email: newEmail || "",
        user_type: "requester",
        phone: newPhone,
        name: newName,
      };

      setIsSigningUp(true);
      let isValid = await signup(userProfile, newPassword, picture.uri);
      setIsSigningUp(false);

      if (isValid) {
        // navigate to requester screen if validated
        try {
          // save user state for persistant login
          await AsyncStorage.setItem("userId", newEmail);
          await AsyncStorage.setItem("userProfile", "Requester");
        } catch (error) {
          // Error setting data
          console.log("error setting data");
          console.log(error.message);
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "RequesterScreen" }],
          })
        );
      } else {
        Alert.alert("Error: Email provided already in use or Incorrect ", "", [
          {
            text: "Okay",
            style: "cancel",
          },
        ]);
      }
    }
  };

  // The below condition brings up a signing you up overlay when user information
  // is being processed by database.
  let signingUpOverlay;
  if (isSigningUp) {
    signingUpOverlay = (
      <View style={styles.signingUpOverlayContainer}>
        <Progress.Bar indeterminate width={200} color={Colors.secondary} />
        <Text style={{ ...styles.signupText, paddingTop: "2%" }}>
          Signing You Up...
        </Text>
      </View>
    );
  }

  // There are two steps in signup. The below condition
  // changes the screen content for both steps.
  if (!isNextPressed) {
    content = (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title1}>Welcome</Text>
            <Text style={styles.title2}>Sign Up</Text>
          </View>
          <View style={styles.addMemberContaniner}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                onChangeText={(text) => setNewName(text)}
                defaultValue={newName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                onChangeText={(text) => setNewEmail(text)}
                autoCapitalize="none"
                defaultValue={newEmail}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password (atleast 6 characters)"
                onChangeText={(text) => setNewPassword(text)}
                autoCapitalize="none"
                defaultValue={newPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                onChangeText={(text) => setNewConfirmPassword(text)}
                autoCapitalize="none"
                defaultValue={newConfirmPassword}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.buttonContainer2}>
            <MyButton onPress={() => nextPressHandler()} text="Next" />
          </View>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => loginPressHandler()}
          >
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    content = (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Photo photo={picture} photoStyle={styles.photo} />
          <MyButton
            buttonStyle={styles.uploadPhotoButton}
            text="Upload Picture"
            textStyle={styles.uploadPhotoText}
            onPress={() => handleChangePhoto()}
          />
        </View>
        <View
          style={{
            ...styles.addMemberContaniner,
            height: heightPercentageToDP("15%"),
          }}
        >
          <View style={{ ...styles.inputContainer, height: "45%" }}>
            <TextInput
              placeholder="Phone (e.g 03213456789)"
              onChangeText={(text) => setNewPhone(text)}
              defaultValue={newPhone}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.buttonContainer2}>
          <MyButton onPress={() => signupHandler()} text="Sign Up" />
        </View>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => setIsNextPressed(false)}
        >
          <Text style={styles.signupText}>Back</Text>
        </TouchableOpacity>
        {signingUpOverlay}
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{content}</View>;
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.tertiary,
  },
  titleContainer: {
    width: widthPercentageToDP("90%"),
    marginTop: "5%",
  },
  title1: {
    fontSize: 40,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: Colors.secondary,
  },
  title2: {
    fontSize: 30,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: Colors.primary,
  },
  addMemberContaniner: {
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("50%"),
    justifyContent: "space-evenly",
    backgroundColor: Colors.tertiary,
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
    height: "12%",
    backgroundColor: Colors.tertiary,
    borderRadius: widthPercentageToDP("5%"),
    elevation: 4,
    justifyContent: "center",
    paddingLeft: heightPercentageToDP("3%"),
  },
  buttonContainer2: {
    marginTop: "3%",
    marginBottom: "3%",
  },
  signupText: {
    fontFamily: "Helvetica",
    fontSize: 20,
    color: Colors.secondary,
  },
  photoContainer: {
    flexDirection: "row",
    marginTop: "25%",
    alignItems: "center",
    width: widthPercentageToDP("85%"),
    justifyContent: "space-between",
  },
  uploadPhotoButton: {
    width: widthPercentageToDP("37%"),
    height: heightPercentageToDP("6%"),
    backgroundColor: Colors.tertiary,
  },
  photo: {
    width: widthPercentageToDP("40%"),
    height: widthPercentageToDP("40%"),
  },
  uploadPhotoText: {
    fontFamily: "Helvetica",
    fontSize: heightPercentageToDP("2%"),
    color: Colors.secondary,
  },
  signingUpOverlayContainer: {
    elevation: 10,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.tertiary,
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignupScreen;
