import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import { database } from "firebase";
import firebase from "firebase/app";
import "firebase/auth";

function Profile({ navigation }) {
  const user = firebase.auth().currentUser;
  const [name, onChangename] = useState("");
  const [ph, onChangephno] = useState("");

  const handleSubmit = () => {
    addprofile(name, ph);
    navigation.navigate("Home");
  };

  let addprofile = (name, ph) => {
    database().ref("/profile").push({
      mail: user.email,
      name: name,
      phno: ph,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Image
          source={require("../Myassets/donation.png")}
          style={{
            resizeMode: "cover",
            height: "70%",
            width: "100%",
          }}
        ></Image>
      </View>
      <View
        style={{
          backgroundColor: "#4A235A",
          height: "40%",
          top: -50,
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            fontSize: 25,
            fontWeight: "bold",
            color: "#5DADE2",
            marginTop: 10,
          }}
        >
          Food Waste Management App
        </Text>
        <Text style={{ color: "white", marginLeft: 10, fontSize: 20, top: 10 }}>
          Name
        </Text>
        <TextInput
          style={{
            width: "90%",
            borderColor: "white",
            borderWidth: 2,
            marginLeft: 10,
            padding: 5,
            top: 12,
            color: "white",
            fontSize: 15,
            borderRadius: 5,
          }}
          placeholder="Enter Your Name"
          placeholderTextColor={"#B2BABB"}
          onChangeText={(text) => onChangename(text)}
        ></TextInput>
        <Text
          style={{
            color: "white",
            marginLeft: 10,
            marginBottom: 10,
            fontSize: 20,
            top: 20,
          }}
        >
          Mobile Number
        </Text>
        <TextInput
          style={{
            width: "90%",
            borderColor: "white",
            borderWidth: 2,
            marginLeft: 10,
            padding: 5,
            top: 15,
            color: "white",
            fontSize: 15,
            borderRadius: 5,
          }}
          keyboardType="numeric"
          placeholder="Enter Your Mobile Number"
          placeholderTextColor={"#B2BABB"}
          onChangeText={(text) => onChangephno(text)}
        ></TextInput>
        <View
          style={{
            width: "90%",
            top: 30,
            justifyContent: "flex-end",
            marginLeft: 10,
            height: 40,
          }}
        >
          <Button
            color={"red"}
            title="Continue"
            onPress={handleSubmit}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default Profile;
