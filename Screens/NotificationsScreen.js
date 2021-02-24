import React from "react";
import { Image, View, Text, Dimensions, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  notifications: {
    minHeight: Dimensions.get("window").height,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "20rem",
    resizeMode: "contain",
  },
  heading: {
    color: "#18183F",
    fontSize: "2.3rem",
    marginVertical: "1rem",
    width: "60%",
  },
  moreInfo: {
    width: "70%",
    fontSize: "1.1rem",
    marginTop: "0.5rem",
    marginBottom: "1rem",
  },
  allowButton: {
    marginVertical: "1.5rem",
    backgroundColor: "#4F4FE8",
    paddingHorizontal: "2rem",
    paddingVertical: "1rem",
    borderRadius: 15,
  },
  allowButtonText: {
    fontSize: "1.4rem",
    textTransform: "capitalize",
    color: "white",
  },
  skipButton: {
    paddingHorizontal: "2rem",
    paddingVertical: "1rem",
    marginBottom: "0.5rem",
    borderRadius: 15,
  },
  skipButtonText: {
    fontSize: "1.2rem",
    textTransform: "capitalize",
  },
});
export default function NotificationsScreen() {
  console.log("Notifications component mounted.");
  return (
    <View style={styles.notifications}>
      <Image
        source={require("../assets/notify.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.heading}>Notifications</Text>
      <Text style={styles.moreInfo}>
        Stay Updated about new Updates, incomes and expenses and track your
        balance.
      </Text>
      <TouchableOpacity style={styles.allowButton}>
        <Text style={styles.allowButtonText}>Allow</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
