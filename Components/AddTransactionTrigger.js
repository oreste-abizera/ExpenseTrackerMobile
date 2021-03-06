import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

export default function AddTransactionTrigger() {
  const { changeNavigation, changeAdd } = React.useContext(Context);
  return (
    <View style={styles.addTrigger}>
      <Text style={styles.addTriggerHeading}>Add Transaction</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            changeAdd("income");
            changeNavigation("Add");
          }}
        >
          <Text style={{ color: "#ffffff" }}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeAdd("expense");
            changeNavigation("Add");
          }}
          style={styles.btn}
        >
          <Text style={{ color: "#ffffff" }}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  addTrigger: {
    marginVertical: "1rem",
    padding: "1rem",
    backgroundColor: "white",
  },
  addTriggerHeading: {
    fontWeight: "bold",
    marginVertical: "1rem",
  },
  buttons: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "45%",
    backgroundColor: "rgb(32, 137, 220)",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.8rem",
  },
});
