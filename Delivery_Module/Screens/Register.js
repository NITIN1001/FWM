import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
} from "react-native";
import React from "react";
import { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import ErrorMessage from "../Components/ErrMessage";

function Register({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Confirmpassword, setConfirmPassword] = useState();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleSignup = async () => {
    if (password !== Confirmpassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigation.navigate("Login");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("./back.png")} style={{ flex: 1 }}>
        <View
          style={{
            top: 50,
            height: 100,
          }}
        >
          <Image
            source={require("./logo.png")}
            style={{ resizeMode: "contain", height: "50%", right: 100 }}
          ></Image>
        </View>
        <View
          style={{
            width: "80%",
            backgroundColor: "black",
            top: 50,
            alignSelf: "center",
            opacity: 0.85,
            height: "70%",
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 25,
              top: 20,
            }}
          >
            SignUp
          </Text>
          {error ? <ErrorMessage error={error} visible={true} /> : null}
          <Text
            style={{
              color: "white",
              left: 20,
              fontSize: 20,
              fontWeight: "bold",
              top: 30,
            }}
          >
            Email
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"grey"}
            style={{
              width: "80%",
              borderBottomWidth: 2,
              left: 20,
              borderBottomColor: "white",
              top: 25,
              color: "white",
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <Text
            style={{
              color: "white",
              left: 20,
              fontSize: 20,
              fontWeight: "bold",
              top: 40,
            }}
          >
            Password
          </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"grey"}
            style={{
              width: "80%",
              borderBottomWidth: 2,
              left: 20,
              borderBottomColor: "white",
              top: 35,
              color: "white",
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <Text
            style={{
              color: "white",
              left: 20,
              fontSize: 20,
              fontWeight: "bold",
              top: 50,
            }}
          >
            Confirm Password
          </Text>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor={"grey"}
            style={{
              width: "80%",
              borderBottomWidth: 2,
              left: 20,
              borderBottomColor: "white",
              top: 45,
              color: "white",
            }}
            value={Confirmpassword}
            onChangeText={(text) => setConfirmPassword(text)}
          ></TextInput>
          <View
            style={{
              width: "80%",
              left: 20,
              top: 80,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            <Button
              title="SignUp"
              onPress={onHandleSignup}
              disabled={loading}
            ></Button>
          </View>
          <Text style={{ color: "white", top: 85, alignSelf: "center" }}>
            Already have an account?{" "}
            <Text
              style={{ color: "red", textDecorationLine: "underline" }}
              onPress={() => navigation.navigate("Login")}
            >
              login
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Register;
