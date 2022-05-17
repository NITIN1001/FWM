import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AvailableFood from "./AvailableFood";
import Address from "./Address";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import React from "react";
import { auth } from "../Database/firebase";

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require("./navbar.png")}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function Home({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
        headerStyle: {
          backgroundColor: "dodgerblue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                props.navigation.push("Login");
                auth.signOut();
              }}
              icon={() => (
                <Image
                  style={{ height: 30, width: 25, marginLeft: 10 }}
                  source={require("../Myassets/logout.png")}
                />
              )}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="AvailableFood"
        options={{
          drawerLabel: "Available Food",
          drawerIcon: ({ focused }) => (
            <Image
              source={require("./food.png")}
              style={[
                focused ? styles.drawerActive : styles.drawerInActive,
                { height: 30, width: 25, marginLeft: 10 },
              ]}
            />
          ),
        }}
        component={AvailableFood}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
export default Home;
