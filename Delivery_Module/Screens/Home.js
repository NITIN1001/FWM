import { View, SafeAreaView, Text, Image, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { database } from "firebase";
import React from "react";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

let itemsRef = database().ref("/address");
let userprofile = database().ref("/profile");
let assignRef = database().ref("/Assigned");

function Home() {
  const user = firebase.auth().currentUser;

  const [itemsArray, setItemsArray] = React.useState([]);
  React.useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);

  const [assignArray, setassignArray] = React.useState([]);
  React.useEffect(() => {
    assignRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setassignArray(items);
    });
  }, []);

  const [pin, setPin] = useState({
    latitude: 12.8406,
    longitude: 80.1534,
  });

  const [userArray, setuserArray] = React.useState([]);
  React.useEffect(() => {
    userprofile.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setuserArray(items);
    });
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  return (
    <View>
      {itemsArray.length > 0 ? (
        <View>
          {itemsArray.map((item, index) => {
            const list = [];
            const list1 = [];

            assignArray.map((agent) => {
              list.push(agent.deliveryagent_mail);
              list1.push(agent.user_mail);
            });

            for (var i = 0; i < list.length; i++) {
              if (item.mail === list1[i] && user.email === list[i]) {
                return (
                  <View key={index}>
                    <MapView
                      style={{ height: "80%" }}
                      initialRegion={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.0002,
                      }}
                      sshowsUserLocation={true}
                      followsUserLocation={true}
                      zoomEnabled={true}
                    >
                      <Marker coordinate={pin} draggable={true}></Marker>
                    </MapView>
                    {userArray.map((us, index) => {
                      if (us.mail === list1[i]) {
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
                                color: "dodgerblue",
                                alignSelf: "center",
                              }}
                            >
                              Customer Details
                              <View>
                                <Image
                                  source={require("../Myassets/user.png")}
                                  style={{
                                    resizeMode: "contain",
                                    height: 30,
                                    width: 50,
                                  }}
                                ></Image>
                              </View>
                            </Text>

                            <Text style={{ fontSize: 18, top: 10 }}>
                              Name: {us.name}
                            </Text>
                            <Text style={{ fontSize: 18, top: 10 }}>
                              Mobile Number: {us.phno}
                            </Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              }
            }
          })}
        </View>
      ) : (
        <View>
          <Text>No Orders Available</Text>
        </View>
      )}
    </View>
  );
}
export default Home;
