import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  Modal,
  TextInput,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { database } from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

let addItem = (eml, item, qty, time) => {
  database().ref("/items").push({
    mail: eml,
    name: item,
    quantity: qty,
    c_time: time,
  });
};
let itemsRef = database().ref("/items");

const AvailableFood = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [ModalVisible, setModalVisible] = useState(false);
  const [name, onChangename] = useState("");
  const [quantity, onChangequantity] = useState("");
  const [time, setTime] = useState("00:00");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [item, setitem] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let ctime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setTime(ctime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleSubmit = () => {
    addItem(user.email, name, quantity, time);
    Alert.alert("Item saved successfully");
    setTime("00:00");
    setModalVisible(!ModalVisible);
  };

  const [itemsArray, setItemsArray] = React.useState([]);
  React.useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {itemsArray.length > 0 ? (
          <View>
            {itemsArray.map((item, index) => {
              flag = 0;
              if (item.mail == user.email) {
                flag = 1;
                return (
                  <View
                    key={index}
                    style={{
                      borderRadius: 10,
                      padding: 6,
                      borderColor: "snow",
                      borderWidth: 5,
                      top: 5,
                      marginBottom: 10,
                      backgroundColor: "snow",
                      margin: 10,
                      shadowColor: "#171717",
                      shadowOffset: { width: -2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 3,
                        fontFamily: "notoserif",
                        color: "#696969",
                      }}
                    >
                      <View>
                        <Image
                          source={require("../Myassets/food.png")}
                          style={{
                            resizeMode: "contain",
                            height: 30,
                            width: 50,
                          }}
                        ></Image>
                      </View>
                      Food Item: {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 3,
                        color: "#696969",
                      }}
                    >
                      <View>
                        <Image
                          source={require("../Myassets/time.png")}
                          style={{
                            resizeMode: "contain",
                            height: 30,
                            width: 50,
                          }}
                        ></Image>
                      </View>
                      Cooked Time: {item.c_time}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#696969" }}>
                      <View>
                        <Image
                          source={require("../Myassets/qty.png")}
                          style={{
                            resizeMode: "contain",
                            height: 30,
                            width: 50,
                          }}
                        ></Image>
                      </View>
                      Quantity: {item.quantity}
                    </Text>
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200 }}
                      />
                    )}
                  </View>
                );
              }
            })}
          </View>
        ) : (
          <View>
            <Image
              source={require("./nofood.png")}
              style={{ alignSelf: "center", top: 100, opacity: 0.3 }}
            ></Image>
            <Text style={{ alignSelf: "center", top: "30%" }}>
              No items Added
            </Text>
          </View>
        )}
        <View
          style={{
            justifyContent: "space-evenly",
            top: "15%",
            flexDirection: "row",
            backgroundColor: "snow",
            borderRadius: 10,
            margin: 10,
            borderWidth: 5,
            borderColor: "snow",
            padding: 10,
          }}
        >
          <Button
            title="Add Food Item"
            color={"orange"}
            onPress={() => setModalVisible(true)}
          ></Button>
          <Button
            title="Continue"
            color={"red"}
            onPress={() => navigation.navigate("Address")}
          />
        </View>
      </View>

      <Modal visible={ModalVisible} transparent={true} animationType="slide">
        <View
          style={{
            alignSelf: "center",
            top: 5,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "black",
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(!ModalVisible)}
            style={{
              width: 50,
              height: 50,
              borderWidth: 10,
              borderRadius: 10,
              backgroundColor: "transparent",
              left: "82%",
              borderColor: "transparent",
              top: 10,
            }}
          >
            <Image
              source={require("./close.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "center",
                justifyContent: "center",
              }}
            ></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 40,
              alignSelf: "center",
              color: "white",
              fontFamily: "Roboto",
              fontWeight: "bold",
              top: 30,
            }}
          >
            ADD FOOD
          </Text>
          <Text
            style={{ color: "white", marginLeft: 15, top: 60, fontSize: 20 }}
          >
            Food Name
          </Text>
          <TextInput
            placeholder="Food Name"
            placeholderTextColor={"grey"}
            style={{
              width: "90%",
              borderBottomWidth: 2,
              borderBottomColor: "white",
              top: 55,
              color: "white",
              marginLeft: 15,
              fontSize: 20,
            }}
            onChangeText={(text) => onChangename(text)}
          ></TextInput>
          <Text
            style={{ color: "white", marginLeft: 15, top: 70, fontSize: 20 }}
          >
            Cooked Time
          </Text>
          <View>
            <Text
              style={{
                color: "white",
                top: 75,
                marginLeft: 15,
                fontSize: 20,
                textDecorationLine: "underline",
              }}
            >
              {time}
            </Text>
            <View style={{ top: 45, width: "16%", marginLeft: 70 }}>
              <Button onPress={showTimepicker} title="pick" color={"red"} />
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Text
            style={{ color: "white", marginLeft: 15, top: 50, fontSize: 20 }}
          >
            Quntity
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholderTextColor={"grey"}
            placeholder="Quantity"
            style={{
              width: "90%",
              borderBottomWidth: 2,
              borderBottomColor: "white",
              top: 50,
              color: "white",
              marginLeft: 15,
              fontSize: 20,
            }}
            onChangeText={(text) => onChangequantity(text)}
          ></TextInput>

          <View style={{ top: "15%", width: "90%", alignSelf: "center" }}>
            <Button title="Add Food" color={"orange"} onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
export default AvailableFood;
