import axios from "axios";
import url from "../utils/url";
import AsyncStorage from "@react-native-community/async-storage";

const syncTransactionsToAsyncStorage = async (newtransactions) => {
  await AsyncStorage.setItem("transactions", JSON.stringify(newtransactions));
};

const loadTransactionsFromAsyncStorage = async () => {
  let transactions = await AsyncStorage.getItem("transactions");
  if (transactions) {
    return JSON.parse(transactions);
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

export async function loadExpenses(token) {
  let response = await axios
    .get(`${url}/api/transactions/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  if (!response) {
    return [];
  }
  if (response.data) {
    return response.data.data;
  }
  return [];
}

export async function loadIncomes(token) {
  let response = await axios
    .get(`${url}/api/transactions/income`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => console.log("Error" + err));

  if (!response) {
    return [];
  }
  if (response.data) {
    return response.data.data;
  }
  return [];
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
