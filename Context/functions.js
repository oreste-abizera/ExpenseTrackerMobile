import axios from "axios";
import url from "../utils/url";
import AsyncStorage from "@react-native-community/async-storage";
import { TRANSACTIONS, EXPENSES, INCOMES } from "./AsyncStorageVariables";

const syncTransactionsToAsyncStorage = async (newtransactions) => {
  await AsyncStorage.setItem(TRANSACTIONS, JSON.stringify(newtransactions));
};

const loadTransactionsFromAsyncStorage = async () => {
  let transactions = await AsyncStorage.getItem(TRANSACTIONS);
  if (transactions) {
    return JSON.parse(transactions);
  }
  return [];
};

const syncExpensesToAsyncStorage = async (newExpenses) => {
  await AsyncStorage.setItem(EXPENSES, JSON.stringify(newExpenses));
};

const loadExpensesFromAsyncStorage = async () => {
  let expenses = await AsyncStorage.getItem(EXPENSES);
  if (expenses) {
    return JSON.parse(expenses);
  }
  return [];
};

const syncIncomesToAsyncStorage = async (newIncomes) => {
  await AsyncStorage.setItem(INCOMES, JSON.stringify(newIncomes));
};

const loadIncomesFromAsyncStorage = async () => {
  let incomes = await AsyncStorage.getItem(INCOMES);
  if (incomes) {
    return JSON.parse(incomes);
  }
  return [];
};

export async function loadTransactions(token) {
  let response = await axios
    .get(`${url}/api/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  let data = [];
  if (response) {
    if (response.data) {
      data = response.data.data;
    }
  }

  if (data.length === 0) {
    data = await loadTransactionsFromAsyncStorage();
  } else {
    await syncTransactionsToAsyncStorage(data);
  }
  return data;
}

export async function deleteTransaction(token, id) {
  let response = await axios
    .delete(`${url}/api/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  if (response) {
    if (response.data) {
      return response.data.success || false;
    }
  }
  return false;
}

export async function loadExpenses(token) {
  let response = await axios
    .get(`${url}/api/transactions/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  let data = [];
  if (response) {
    if (response.data) {
      data = response.data.data;
    }
  }

  if (data.length === 0) {
    data = await loadExpensesFromAsyncStorage();
  } else {
    await syncExpensesToAsyncStorage(data);
  }
  return data;
}

export async function loadIncomes(token) {
  let response = await axios
    .get(`${url}/api/transactions/income`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  let data = [];
  if (response) {
    if (response.data) {
      data = response.data.data;
    }
  }

  if (data.length === 0) {
    data = await loadIncomesFromAsyncStorage();
  } else {
    await syncIncomesToAsyncStorage(data);
  }
  return data;
}

export async function loadCategories() {
  let response = await axios
    .get(`${url}/api/categories`)
    .catch((err) => console.log("Error" + err));

  if (!response) {
    return [];
  }
  if (response.data) {
    return response.data.data;
  }

  return [];
}

export {
  loadIncomesFromAsyncStorage,
  loadExpensesFromAsyncStorage,
  loadTransactionsFromAsyncStorage,
};
