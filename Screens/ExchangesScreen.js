import React from "react";
import { View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import ViewTransactions from "../Components/ViewTransactions";
import Context from "../Context/ContextProvider";

export default function ExchangesScreen() {
  const { transactions } = React.useContext(Context);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const markedDates = [];

  const getDay = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1 < 10 ? "0" : "";
    let day = date.getDate() < 10 ? "0" : "";
    day += date.getDate();
    month += parseInt(date.getMonth()) + 1;
    return year + "-" + month + "-" + day;
  };

  //extract dates with transactions
  let datesWithTransactions = new Set();
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    datesWithTransactions.add({
      date: getDay(transaction.date),
      type: transaction.type,
    });
  }

  datesWithTransactions = [...datesWithTransactions];
  for (const dateWithTransaction of datesWithTransactions) {
    const markedDate = {
      date: new Date(dateWithTransaction.date),
      dots: [],
    };
    let dotColor = dateWithTransaction.type === "income" ? "green" : "red";
    markedDate.dots.push({ color: dotColor });

    //check same day existence
    let found;
    for (let i = 0; i < markedDates.length; i++) {
      const dateWithTr = markedDates[i];
      if (markedDate.date.toISOString() === dateWithTr.date.toISOString()) {
        found = i;
        break;
      }
    }
    if (found !== undefined && found !== null) {
      let currentDots = markedDates[found].dots;
      let dotExist = false;
      for (const j of currentDots) {
        if (j.color === markedDate.dots[0].color) {
          dotExist = true;
        }
      }
      if (!dotExist) markedDates[found].dots.push(markedDate.dots[0]);
    } else {
      markedDates.push(markedDate);
    }
  }

  return (
    <View style={{ height: "100%" }}>
      <CalendarStrip
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelected={handleSelectedDate}
        style={{ marginTop: 10, height: 130 }}
        dateNumberStyle={{ marginTop: 5 }}
        highlightDateContainerStyle={{
          backgroundColor: "rgb(32, 137, 220)",
        }}
      ></CalendarStrip>

      <ViewTransactions selectedDate={selectedDate}></ViewTransactions>
    </View>
  );
}
