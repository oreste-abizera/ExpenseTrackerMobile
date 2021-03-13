import axios from "axios";
import url from "../utils/url";

export async function loadTransactions(token) {
  let response = await axios
    .get(`${url}/api/transactions`, {
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
