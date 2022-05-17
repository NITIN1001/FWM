import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./Context/AuthContext";
import React from "react";
import Profile from "./screens/Profile";
import firebase from "firebase";
import Address from "./screens/Address";
import AvailableFood from "./screens/AvailableFood";
import Confirm from "./screens/Confirm";

const Stack = createStackNavigator();
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AvailableFood" component={AvailableFood} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="Confirm" component={Confirm} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
export default App;
