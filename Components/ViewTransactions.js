import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Context from "../Context/ContextProvider";

export default function ViewTransactions() {
  const { incomes, expenses, getTotals, transactions } = React.useContext(
    Context
  );

  const totals = getTotals();
  return (
    <View style={styles.container}>
      {incomes.length === 0 && expenses.length === 0 ? (
        <Text style={styles.empty}>No Transactions during selected day</Text>
      ) : (
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
              List of Transactions
            </Text>
            {transactions.map((transaction) => (
              <View key={transaction._id} style={styles.transaction}>
                <View style={styles.iconContainer}>
                  <Icon
                    name={transaction.category.icon}
                    color={transaction.category.color}
                    type="font-awesome"
                  ></Icon>
                </View>
                <Text
                  numberOfLines={1}
                  style={{ width: 250 }}
                  ellipsizeMode="tail"
                >
                  {transaction.note || transaction.category.title}
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
              </View>
            ))}
          </View>
        </View>
      )}
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
