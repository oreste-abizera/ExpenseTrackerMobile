import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FooterComponent from "./Components/FooterComponent";
import HeaderComponent from "./Components/HeaderComponent";
import EStyleSheet from "react-native-extended-stylesheet";
import { ContextProvider } from "./Context/ContextProvider";
import Routes from "./Screens/Routes";
import Loader from "./Components/Loader";

EStyleSheet.build({
  $textColor: "#0275d8",
});

export default function App() {
  const [loading, setloading] = React.useState(true);
  if (!loading) {
    console.log(`Expense Tracker App started......`);
  }

  React.useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <HeaderComponent></HeaderComponent>
              <ScrollView>
                <Routes></Routes>
                {/* <NotificationsScreen></NotificationsScreen> */}
                <StatusBar style="auto" />
              </ScrollView>
              <View>
                <FooterComponent></FooterComponent>
              </View>
            </>
          )}
        </View>
      </SafeAreaProvider>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
});
