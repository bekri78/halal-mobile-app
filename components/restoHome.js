import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function RestoHome() {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
      resro
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
