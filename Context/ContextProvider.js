import React from "react";
const Context = React.createContext();

export function ContextProvider({ children }) {
  const [navigation, setNavigation] = React.useState("Home");
  const changeNavigation = (newValue) => {
    setNavigation(newValue);
  };
  return (
    <Context.Provider value={{ navigation, changeNavigation }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
