import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacityBase,
  Animated,
  Button,
} from "react-native";
import Colors from "../constants/colors.js";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Photo from "../components/Photo";
import MyButton from "../components/MyButton";
import * as ImagePicker from 'expo-image-picker';

const SettingScreen = () => {
  const [isEditPressed, setIsEditPressed] = useState(false);
  const [phone, setPhone] = useState("090078601");
  const [picture, setPicture] = useState(require("../assets/dummy.png"));

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

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  let phoneComponent;
  let editButton;
  if (!isEditPressed) {
    // setPhone("090078601");
    phoneComponent = <Text style={styles.infoText}>{phone}</Text>;
    editButton = (
      <MyButton
        buttonStyle={{
          ...styles.uploadPhotoButton,
          width: widthPercentageToDP("25%"),
          height: heightPercentageToDP("5%"),
        }}
        text="Edit"
        textStyle={styles.uploadPhotoText}
        onPress={() => setIsEditPressed(true)}
      />
    );
  } else {
    phoneComponent = (
      <View style={styles.enterPhoneContainer}>
        <TextInput
          placeholder="Enter Phone Number"
          style={styles.infoText}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
    );
    editButton = (
      <MyButton
        buttonStyle={{
          ...styles.uploadPhotoButton,
          width: widthPercentageToDP("25%"),
          height: heightPercentageToDP("5%"),
          backgroundColor: Colors.primary,
        }}
        text="Update"
        textStyle={{ ...styles.uploadPhotoText, color: Colors.tertiary }}
        onPress={() => setIsEditPressed(false)}
      />
    );
  }
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Photo photo={picture} photoStyle={styles.photo} />
          {/* <TouchableOpacity style={styles.uploadPhotoButton}>
            <Text>Upload Photo</Text>
        </TouchableOpacity> */}
          <MyButton
            buttonStyle={styles.uploadPhotoButton}
            text="Change Picture"
            textStyle={styles.uploadPhotoText}
            onPress={() => handleChangePhoto()}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.infoText}>Dummy</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.infoText}>dummy@dummy.com</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Phone: </Text>
            {/* <Text style={styles.infoText}>090078601</Text> */}
            {phoneComponent}
          </View>
          <View style={styles.buttonContainer}>
            {/* <MyButton
            buttonStyle={{
              ...styles.uploadPhotoButton,
              width: widthPercentageToDP("25%"),
              height: heightPercentageToDP("5%"),
            }}
            text="Edit"
            textStyle={styles.uploadPhotoText}
            onPress={()=>setIsEditPressed(true)}
          /> */}
            {editButton}
          </View>
        </View>
        <View style={styles.logout}>
          <MyButton
            buttonStyle={{
              ...styles.uploadPhotoButton,
              width: widthPercentageToDP("25%"),
              height: heightPercentageToDP("5%"),
              backgroundColor: Colors.primary,
            }}
            text="Log Out"
            textStyle={{ ...styles.uploadPhotoText, color: Colors.tertiary }}
            onPress={() => setIsEditPressed(false)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Colors.tertiary,
  },
  photoContainer: {
    flexDirection: "row",
    marginTop: '25%',//heightPercentageToDP("15%"),
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
  infoContainer: {
    marginTop: heightPercentageToDP("5%"),
    height: heightPercentageToDP("30%"),
    width: widthPercentageToDP("90%"),
    elevation: 4,
    borderRadius: widthPercentageToDP("7%"),
    backgroundColor: Colors.tertiary,
    justifyContent: "space-evenly",
    paddingHorizontal: widthPercentageToDP("2.5%"),
    paddingVertical: widthPercentageToDP("3%"),
  },
  info: {
    width: "100%",
    height: heightPercentageToDP("5%"),
    borderBottomWidth: 1,
    alignItems: "center",
    paddingHorizontal: widthPercentageToDP("2.5%"),
    flexDirection: "row",
  },
  label: {
    fontFamily: "Helvetica",
    fontSize: heightPercentageToDP("2%"),
    color: Colors.secondary,
    fontWeight: "bold",
    width: widthPercentageToDP("16%"),
  },
  infoText: {
    fontFamily: "Helvetica",
    fontSize: heightPercentageToDP("2%"),
    color: Colors.secondary,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginTop: heightPercentageToDP("2%"),
  },
  enterPhoneContainer: {
    backgroundColor: Colors.tertiary,
    width: widthPercentageToDP("66.5%"),
    elevation: 2,
    borderRadius: widthPercentageToDP("4%"),
    paddingHorizontal: widthPercentageToDP("3%"),
  },
  logout: {
    marginTop: heightPercentageToDP("3%"),
    flexDirection: "row-reverse",
    width: widthPercentageToDP("90%"),
    paddingHorizontal: widthPercentageToDP("2.5%"),
  },
});

export default SettingScreen;
