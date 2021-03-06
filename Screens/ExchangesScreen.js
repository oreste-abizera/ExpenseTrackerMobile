import React from "react";
import { View, Text } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import ViewTransactions from "../Components/ViewTransactions";

export default function ExchangesScreen() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };
  const selectedDates = [
    // {
    //   date: selectedDate,
    //   lines: [
    //     {
    //       color: "green",
    //       // selectedColor: "green",
    //     },
    //   ],
    // },
  ];

  return (
    <View style={{ height: "100%" }}>
      <CalendarStrip
        selectedDate={selectedDate}
        markedDates={selectedDates}
        onDateSelected={handleSelectedDate}
        style={{ marginTop: 10, height: 130 }}
        highlightDateContainerStyle={{
          backgroundColor: "rgb(32, 137, 220)",
        }}
      ></CalendarStrip>

      <ViewTransactions></ViewTransactions>
    </View>
  );
}
