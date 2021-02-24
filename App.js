import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView>
          <HeaderComponent></HeaderComponent>
          <StatusBar style="auto" />
        </ScrollView>
        <View>
          <FooterComponent></FooterComponent>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
});
