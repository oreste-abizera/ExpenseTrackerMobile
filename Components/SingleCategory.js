import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import Context from "../Context/ContextProvider";

export default function SingleCategory({ category, styles }) {
  const { incomes, expenses, transactions, getTotals } = React.useContext(
    Context
  );
  const categoryIncomes = incomes.filter(
    (income) => income.category === category._id
  );
  const categoryExpenses = expenses.filter(
    (expense) => expense.category === category._id
  );
  const totals = getTotals(categoryIncomes, categoryExpenses);
  return (
    <View style={styles.category}>
      <View style={styles.iconContainer}>
        <Icon
          name={category.icon}
          color={category.color}
          type="font-awesome"
        ></Icon>
      </View>

      <View>
        <Text>{category.title}</Text>
        <Text>
          {categoryExpenses.length + categoryIncomes.length} transactions
        </Text>
      </View>

      <Text>{totals.income - totals.expenses}Rwf</Text>
    </View>
  );
}
