import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";
import firebase from "firebase/app";
import { database } from "firebase";
import "firebase/auth";

export default function Confirm() {
  const user = firebase.auth().currentUser;
  let itemsRef = database().ref("/Assigned");
  const [itemsArray, setItemsArray] = React.useState([]);
  React.useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);
  let flag = 0;
  function check() {
    if (flag == 0) {
      return (
        <View
          style={{
            borderRadius: 10,
            padding: 10,
            borderColor: "snow",
            borderWidth: 5,

            backgroundColor: "snow",

            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../Myassets/wait.png")}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ alignSelf: "center", top: "30%", fontSize: 20 }}>
            Waiting for Confirmation from NGO.....
          </Text>
        </View>
      );
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {itemsArray.length > 0 ? (
          <View>
            {itemsArray.map((item, index) => {
              if (item.user_mail == user.email) {
                flag = 1;
                return (
                  <View
                    key={index}
                    style={{
                      borderRadius: 10,
                      padding: 10,
                      borderColor: "snow",
                      borderWidth: 5,

                      backgroundColor: "snow",

                      shadowColor: "#171717",
                      shadowOffset: { width: -2, height: 4 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      marginBottom: 20,
                    }}
                  >
                    <View>
                      <Image
                        source={require("../Myassets/ok.png")}
                        style={{
                          alignSelf: "center",
                        }}
                      ></Image>
                      <Text style={{ fontSize: 20, alignSelf: "center" }}>
                        Delivery Agent Assigned successfully
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        alignSelf: "center",
                        color: "#1E90FF",
                      }}
                    >
                      Delivery Agent Details
                      <View>
                        <Image
                          source={require("../Myassets/deliveryman.png")}
                          style={{
                            resizeMode: "contain",
                            height: 30,
                            width: 50,
                          }}
                        ></Image>
                      </View>
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        top: 10,
                      }}
                    >
                      Name: {item.deliveryagent_name}
                    </Text>
                    <Text style={{ fontSize: 20, top: 10 }}>
                      Mobile Number: {item.deliveryagent_phno}
                    </Text>
                  </View>
                );
              }
            })}
            {check()}
          </View>
        ) : (
          <View
            style={{
              borderRadius: 10,
              padding: 10,
              borderColor: "snow",
              borderWidth: 5,

              backgroundColor: "snow",

              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              marginBottom: 20,
            }}
          >
            <Text style={{ alignSelf: "center", top: "30%" }}>
              Waiting for Confirmation from NGO.....
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});
