import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  loadTransactions,
  loadExpenses,
  loadIncomes,
  loadCategories,
  loadIncomesFromAsyncStorage,
  loadExpensesFromAsyncStorage,
  loadTransactionsFromAsyncStorage,
} from "./functions";

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

const syncUserToAsyncStorage = async (newUser) => {
  await AsyncStorage.setItem("user", JSON.stringify(newUser));
};

const loadUserFromAsyncStorage = async () => {
  let user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return defaultUser;
};
const syncCategoriesToAsyncStorage = async (newCategories) => {
  await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
};

const loadCategoriesFromAsyncStorage = async () => {
  let categories = await AsyncStorage.getItem("categories");
  if (categories) {
    return JSON.parse(categories);
  }
  return [];
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
  const [nextDrawerState, setnextDrawerState] = React.useState(false);

  const toggleDrawer = () => {
    if (drawerOpen) {
      setnextDrawerState(false);
      setTimeout(() => {
        setdrawerOpen(!drawerOpen);
      }, 500);
    } else {
      setnextDrawerState(true);
      setdrawerOpen(!drawerOpen);
    }
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

  const logout = async () => {
    setuser(defaultUser);
    syncUserToAsyncStorage(defaultUser);
    await AsyncStorage.clear();
  };

  React.useEffect(() => {
    loadData();
  }, [user.token, load]);

  async function loadDataFromAsyncStorage() {
    setcategories(await loadCategoriesFromAsyncStorage());
    settransactions(await loadTransactionsFromAsyncStorage());
    setincomes(await loadIncomesFromAsyncStorage());
    setexpenses(await loadExpensesFromAsyncStorage());
  }

  async function loadData() {
    await setuser(await loadUserFromAsyncStorage());
    if (user.token) {
      await loadDataFromAsyncStorage();
      settransactions(await loadTransactions(user.token));
      setincomes(await loadIncomes(user.token));
      setexpenses(await loadExpenses(user.token));

      let tempCategories = (await loadCategories()) || [];
      if (tempCategories.length === 0) {
        const storageCategories = await loadCategoriesFromAsyncStorage();
        if (storageCategories.length > 0) tempCategories = storageCategories;
      }
      await syncCategoriesToAsyncStorage(tempCategories);
      await setcategories(tempCategories);
    } else if (user !== defaultUser) {
      await setuser(defaultUser);
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
        nextDrawerState,
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
