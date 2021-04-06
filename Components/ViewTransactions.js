import React from "react";
import { Text, View, Alert } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

export default function ViewTransactions({ selectedDate }) {
  const { getTotals, transactions } = React.useContext(Context);

  async function removeTransaction(id) {
    await Alert.alert(
      "Confirmation",
      "Do you want to remove this transaction?",
      [
        {
          text: "Yes",
          onPress: () => {
            console.log("removing transaction: " + id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  function sameDay(d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  let displayTransactions = [];
  if (selectedDate) {
    displayTransactions = transactions.filter((transaction) =>
      sameDay(transaction.date, selectedDate)
    );
  }

  let incomes = displayTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  let expenses = displayTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totals = getTotals(incomes, expenses);
  return (
    <View style={styles.container}>
      <View style={styles.totals}>
        <View
          style={[
            styles.totalsItem,
            { backgroundColor: "rgba(131, 167, 234, 1)" },
          ]}
        >
          <Text>Income</Text>
          <Text>{totals.income}Rwf</Text>
        </View>
        <View style={[styles.totalsItem, { backgroundColor: "#e81f3d" }]}>
          <Text>Expenses</Text>
          <Text>{0 - totals.expenses}Rwf</Text>
        </View>

        <View style={styles.transactions}>
          <Text style={{ marginVertical: 10, fontWeight: "600" }}>
            {displayTransactions.length === 0
              ? "No transactions done in the selected day"
              : "List of Transactions"}
          </Text>
          {displayTransactions.map((transaction) => (
            <View key={transaction._id} style={styles.transaction}>
              <View style={styles.iconContainer}>
                <Icon
                  name={transaction.category?.icon}
                  color={transaction.category?.color}
                  type="font-awesome"
                ></Icon>
              </View>
              <Text
                numberOfLines={1}
                style={{ width: 250 }}
                ellipsizeMode="tail"
              >
                {transaction.note || transaction.category?.title}
              </Text>
              <Text
                style={{
                  color: transaction.type === "expense" ? "red" : "green",
                }}
              >
                {transaction.type === "expense"
                  ? 0 - transaction.amount
                  : transaction.amount}
                Rwf
              </Text>
              <Icon
                name="remove"
                type="font-awesome"
                color="rgb(32, 137, 220)"
                size={22}
                onPress={() => removeTransaction(transaction._id)}
              ></Icon>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  empty: {
    marginTop: 10,
  },
  totals: {
    width: "100%",
    alignItems: "center",
  },
  totalsItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    padding: 10,
    marginVertical: 5,
  },
  transactions: {
    width: "95%",
    marginTop: "1rem",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "#ffffff",
  },
  transaction: {
    marginVertical: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#e5fcde",
    padding: "0.5rem",
    borderRadius: 50,
    height: "3rem",
    width: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
