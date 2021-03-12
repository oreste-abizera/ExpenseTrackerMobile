const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "https://expensetracker-api-node.herokuapp.com";

export default url;
// const url = "https://expensetracker-backend.glitch.me";
