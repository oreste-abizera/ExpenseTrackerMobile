import axios from "axios";
import url from "../utils/url";

export async function loadTransactions(token) {
  let response = await axios.get(`${url}/api/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data.data;
  }
}

export async function loadExpenses(token) {
  let response = await axios.get(`${url}/api/transactions/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data.data;
  }
}

export async function loadIncomes(token) {
  let response = await axios.get(`${url}/api/transactions/income`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    return response.data.data;
  }
}
