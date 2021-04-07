import React from "react";
import { Constants } from "expo";
import {
  Platform,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Notifications from "expo-notifications";
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Context from "../Context/ContextProvider";
import { NOTIFICATIONSALLOW } from "../Context/AsyncStorageVariables";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

export default function NotificationsScreen() {
  const { changeNavigation } = React.useContext(Context);
  const [allowedNotifications, setallowedNotifications] = useState(false);

  React.useEffect(() => {
    async function loadStatus() {
      let response = await AsyncStorage.getItem(NOTIFICATIONSALLOW);
      if (response) {
        await setallowedNotifications(JSON.parse(response));
      }
    }
    loadStatus();
  });
  const triggerNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "granted") {
      setallowedNotifications(true);
      await AsyncStorage.setItem(NOTIFICATIONSALLOW, JSON.stringify(true));
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Nice One 🎉🎉",
          body: "Notifications are now Enabled.",
        },
        trigger: {
          seconds: 1,
        },
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder 🔑🔑",
          body: "Good Afternoon, Have you recorded all of your transactions",
        },
        trigger: {
          hour: 12,
          minute: 1,
          repeats: true,
        },
      });

      console.log("Notifications will be sent");
    }
  };

  const disableNotifications = async () => {
    setallowedNotifications(false);
    await AsyncStorage.setItem(NOTIFICATIONSALLOW, JSON.stringify(false));
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "OOps!",
        body: "Notifications are now Disabled.",
      },
      trigger: {
        seconds: 1,
      },
    });
  };
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
      {allowedNotifications ? (
        <Text
          style={{ textDecorationLine: "underline", marginTop: 50 }}
          onPress={disableNotifications}
        >
          Unsubscribe
        </Text>
      ) : (
        <>
          <TouchableOpacity
            style={styles.allowButton}
            onPress={triggerNotification}
          >
            <Text style={styles.allowButtonText}>Allow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => changeNavigation("Home")}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

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
