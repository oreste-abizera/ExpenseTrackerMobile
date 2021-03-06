import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Context from "../Context/ContextProvider";

export default function ViewTransactions() {
  const { incomes, expenses, getTotals } = React.useContext(Context);

  const totals = getTotals();
  return (
    <View style={styles.container}>
      <Text style={styles.empty}>No Transactions during selected day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  empty: {
    marginTop: 10,
  },
});
