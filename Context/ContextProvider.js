import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  loadTransactions,
  loadExpenses,
  loadIncomes,
  loadCategories,
} from "./functions";
import { Platform } from "react-native";

const Context = React.createContext();
const defaultUser = { token: null, info: {} };
// const defaultUser = {
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzg5ZDlmYjhkNDZmNDA0MDNmODA4NSIsImlhdCI6MTYxNDUwMzI2NSwiZXhwIjoxNjE3MDk1MjY1fQ.CTn-MgrOh5dg1QdyxqDOuxifZ3ozlJ6xz_XnqGibvgU",
//   info: {
//     _id: "60389d9fb8d46f40403f8085",
//     names: "John Doe",
//     email: "admin@admin.com",
//     phone: "0782123435",
//     password: "$2a$10$8c9h9wbftwyWHjozSCUZ6Ofk85P.j0Kqpkx44Zq.N7P85BQ90Q55K",
//     __v: 0,
//   },
// };

const syncUserToAsyncStorage = (newUser) => {
  AsyncStorage.setItem("user", JSON.stringify(newUser));
};

const loadUserFromAsyncStorage = async () => {
  let user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return defaultUser;
};

export function ContextProvider({ children }) {
  const [navigation, setNavigation] = React.useState("Login");
  const [incomes, setincomes] = React.useState([]);
  const [expenses, setexpenses] = React.useState([]);
  const [transactions, settransactions] = React.useState([]);
  const [categories, setcategories] = React.useState([]);
  const [user, setuser] = React.useState(defaultUser);
  const [previous, setprevious] = React.useState("");
  const [load, setload] = React.useState(false);
  const [add, setadd] = React.useState("expense");
  const [drawerOpen, setdrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setdrawerOpen(!drawerOpen);
  };

  const changeAdd = (newValue) => {
    setadd(newValue);
  };
  const changeNavigation = (newValue) => {
    setprevious(newValue === "Home" || "Login" || "Register" ? "" : navigation);
    setNavigation(newValue);
  };

  const loginUser = (response) => {
    const newUser = {
      token: response.token,
      info: response.data,
    };
    setuser(newUser);
    syncUserToAsyncStorage(newUser);
    return true;
  };

  const logout = () => {
    setuser(defaultUser);
    syncUserToAsyncStorage(defaultUser);
  };

  React.useEffect(() => {
    loadData();
  }, [user.token, load]);

  async function loadData() {
    setuser(await loadUserFromAsyncStorage());
    if (user.token) {
      settransactions(await loadTransactions(user.token));
      setincomes(await loadIncomes(user.token));
      setexpenses(await loadExpenses(user.token));
      setcategories(await loadCategories());
    } else if (Platform.OS === "android") {
      syncUserToAsyncStorage(defaultUser);
      setuser(defaultUser);
    }
  }

  function getTotals(incomesP = incomes, expensesP = expenses) {
    let expensesAmount = 0,
      incomeAmount = 0;
    for (let i = 0; i < expensesP.length; i++) {
      expensesAmount += expensesP[i].amount;
    }
    for (let i = 0; i < incomesP.length; i++) {
      incomeAmount += incomesP[i].amount;
    }
    return { income: incomeAmount, expenses: expensesAmount };
  }

  const reload = () => {
    setload(!load);
  };

  return (
    <Context.Provider
      value={{
        user,
        categories,
        previous,
        navigation,
        changeNavigation,
        getTotals,
        incomes,
        expenses,
        transactions,
        reload,
        changeAdd,
        add,
        drawerOpen,
        toggleDrawer,
        loginUser,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
