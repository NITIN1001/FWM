import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "white",
    marginBottom: 10,
    fontWeight: "600",
    top: 35,
    alignSelf: "center",
    backgroundColor: "red",
    opacity: 0.8,
    fontSize: 15,
  },
});

export default ErrorMessage;
