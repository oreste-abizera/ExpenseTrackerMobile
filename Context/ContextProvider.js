import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { loadTransactions, loadExpenses, loadIncomes } from "./functions";

const Context = React.createContext();
const defaultUser = { token: null, info: {} };

const syncUserToLocalStorage = (newUser) => {
  AsyncStorage.setItem("user", JSON.stringify(newUser));
};

const loadUserFromLocalStorage = async () => {
  let user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return defaultUser;
};

export function ContextProvider({ children }) {
  const [navigation, setNavigation] = React.useState("Home");
  const [incomes, setincomes] = React.useState([]);
  const [expenses, setexpenses] = React.useState([]);
  const [transactions, settransactions] = React.useState([]);
  const [user, setuser] = React.useState(defaultUser);

  const changeNavigation = (newValue) => {
    setNavigation(newValue);
  };

  React.useEffect(() => {
    loadData();
  }, [user.token]);

  async function loadData() {
    setuser(await loadUserFromLocalStorage());
    if (user.token) {
      settransactions(await loadTransactions(user.token));
      setincomes(await loadIncomes(user.token));
      setexpenses(await loadExpenses(user.token));
    }
  }

  function getTotals() {
    let expensesAmount = 0,
      incomeAmount = 0;
    for (let i = 0; i < expenses.length; i++) {
      expensesAmount += expenses[i].amount;
    }
    for (let i = 0; i < incomes.length; i++) {
      incomeAmount += incomes[i].amount;
    }
    return { income: incomeAmount, expenses: expensesAmount };
  }

  return (
    <Context.Provider value={{ user, navigation, changeNavigation, getTotals }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
