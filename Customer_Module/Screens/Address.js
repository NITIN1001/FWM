import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Button,
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import React, { useState } from "react";
import { useEffect } from "react";
import * as Location from "expo-location";
import { database } from "firebase";
import firebase from "firebase/app";
import "firebase/auth";

let addItem = (eml, lat, lng) => {
  database().ref("/address").push({
    mail: eml,
    latitude: lat,
    longitude: lng,
    stat: 0,
  });
};

function Address({ navigation }) {
  const user = firebase.auth().currentUser;
  const [pin, setPin] = useState({
    latitude: 12.8406,
    longitude: 80.1534,
  });

  const handleSubmit = () => {
    addItem(user.email, pin.latitude, pin.longitude);
    navigation.navigate("Confirm");
  };

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );
  const [displayCurrentAddress1, setDisplayCurrentAddress1] = useState();

  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}`;
        let address1 = `${item.subregion}, ${item.region}, ${item.postalCode}, ${item.country}`;
        setDisplayCurrentAddress(address);
        setDisplayCurrentAddress1(address1);
      }
    }
  };

  return (
    <View style={{ backgroundColor: " #f2f2f2", flex: 1 }}>
      <MapView
        style={{ height: "50%" }}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.002,
          longitudeDelta: 0.0002,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
      >
        <Marker coordinate={pin} draggable={true}></Marker>
      </MapView>
      <Text
        style={{ top: 25, fontSize: 25, fontWeight: "bold", marginLeft: 10 }}
      >
        <Image
          source={require("../Myassets/location.png")}
          style={{ width: 30, height: 30, resizeMode: "contain" }}
        />
        {displayCurrentAddress}
      </Text>
      <Text style={{ top: 35, fontSize: 17, marginLeft: 10 }}>
        {displayCurrentAddress1}
      </Text>
      <Text
        style={{
          top: 50,
          backgroundColor: "#ffffe6",
          padding: 5,
          borderWidth: 2,
          borderRadius: 10,
          margin: 5,
          borderColor: "#ffff99",
          color: "#ff6666",
        }}
      >
        {" "}
        A detailed address will help our Delivery Agent reach your doorstep
        easily{" "}
      </Text>
      <TextInput
        style={{
          width: "90%",
          borderBottomWidth: 2,
          borderBottomColor: "grey",
          top: 50,
          marginLeft: 10,
        }}
        placeholder="HOUSE/FLAT/BLOCK NO."
      ></TextInput>
      <TextInput
        style={{
          width: "90%",
          borderBottomWidth: 2,
          borderBottomColor: "grey",
          top: 80,
          marginLeft: 10,
        }}
        placeholder="APARTMENT/ROAD/AREA"
      ></TextInput>
      <View style={{ width: "90%", margin: 10, top: 100 }}>
        <Button
          title="Save Address"
          color={"#5cd65c"}
          onPress={handleSubmit}
        ></Button>
      </View>
    </View>
  );
}
export default Address;
