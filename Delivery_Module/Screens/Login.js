import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { auth } from "../Database/firebase";
import { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import ErrorMessage from "../Components/ErrMessage";
import React from "react";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onLogin(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      login(email, password);
      if (
        auth.currentUser.metadata.creationTime ===
        auth.currentUser.metadata.lastSignInTime
      ) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Home");
      }
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../Myassets/white.png")}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignContent: "center",
          }}
        >
          <View
            style={{
              top: 60,
              height: 100,
            }}
          >
            <Image
              source={require("../Myassets/logo.png")}
              style={{ resizeMode: "contain", height: "50%", right: 225 }}
            ></Image>
          </View>
          <View
            style={{
              width: "30%",
              left: 265,
              position: "absolute",
              top: 70,
            }}
          >
            <Button
              title="Register"
              color={"#EC7063"}
              onPress={() => navigation.navigate("Register")}
            ></Button>
          </View>
          {error ? <ErrorMessage error={error} visible={true} /> : null}
          <View style={{ height: "30%", top: 70 }}>
            <Image
              source={require("./user.png")}
              style={{
                alignSelf: "center",
                resizeMode: "contain",
                height: "70%",
              }}
            ></Image>
          </View>
          <Text
            style={{
              left: 20,
              fontSize: 20,
              fontWeight: "bold",
              top: 20,
              color: "black",
            }}
          >
            Username
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="Enter your email"
            style={{
              width: "80%",
              borderBottomWidth: 2,
              left: 20,
              borderBottomColor: "black",
              top: 15,
              color: "black",
              fontSize: 18,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ top: 10 }}>
            <Text
              style={{
                left: 20,
                fontSize: 20,
                fontWeight: "bold",
                top: 20,
                color: "black",
              }}
            >
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={"grey"}
              style={{
                width: "80%",
                borderBottomWidth: 2,
                left: 20,
                borderBottomColor: "black",
                top: 15,
                color: "black",
                fontSize: 18,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View
            style={{
              width: "80%",
              left: 20,
              top: 50,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            <Button title="Login" onPress={onLogin} disabled={loading} />
          </View>
          <Text style={{ left: 250, top: 50, color: "black" }}>Need help?</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Login;
