import React from "react";
import { View, Text } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "react-native-elements";
import Context from "../Context/ContextProvider";

const styles = EStyleSheet.create({
  currentMonth: {
    backgroundColor: "#ffffff",
    padding: "1rem",
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 30,
    backgroundColor: "#d1ecf1",
    padding: "1rem",
  },
  balance__item: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  balance__item__heading: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
});

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function ThisMonthInfo() {
  const { getTotals } = React.useContext(Context);
  const { expenses, income } = getTotals();
  const expensesColor = "#e81f3d",
    incomeColor = "rgba(131, 167, 234, 1)",
    balanceColor = "#8c32a8";
  const data = [
    {
      name: "Income",
      amount: income,
      color: incomeColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expenses",
      amount: expenses,
      color: expensesColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.currentMonth}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 30,
        }}
      >
        <Icon
          name="angle-double-down"
          type="font-awesome"
          style={{ marginRight: 15 }}
        ></Icon>
        <Text>This Month</Text>
      </View>
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        // paddingLeft={'15'}
        // center={[10, 50]}
        // absolute
      />

      <View style={styles.balance}>
        <View style={[styles.balance__item, { color: incomeColor }]}>
          <Text style={[styles.balance__item__heading, { color: incomeColor }]}>
            Income
          </Text>
          <Text style={{ color: incomeColor }}>Rwf {income}</Text>
        </View>

        <View style={[styles.balance__item, { color: expensesColor }]}>
          <Text
            style={[styles.balance__item__heading, { color: expensesColor }]}
          >
            Expenses
          </Text>
          <Text style={{ color: expensesColor }}>Rwf {expenses}</Text>
        </View>

        <View style={[styles.balance__item, { color: balanceColor }]}>
          <Text
            style={[styles.balance__item__heading, { color: balanceColor }]}
          >
            Balance
          </Text>
          <Text style={{ color: balanceColor }}>Rwf {income - expenses}</Text>
        </View>
      </View>
    </View>
  );
}
