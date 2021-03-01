import React from "react";
import { Header, Icon } from "react-native-elements";
import Context from "../Context/ContextProvider";

const LeftComponent = () => {
  const { previous, changeNavigation } = React.useContext(Context);
  return (
    <Icon
      name={previous ? "arrow-left" : "bars"}
      type="font-awesome"
      color="#fff"
      size={19}
      onPress={() => {
        if (previous) {
          changeNavigation(previous);
        } else {
          alert("Press on menu icon detected.");
        }
      }}
    ></Icon>
  );
};

export default function HeaderComponent() {
  return (
    <Header
      placement="left"
      leftComponent={<LeftComponent></LeftComponent>}
      centerComponent={{ text: "Expense Tracker", style: { color: "#fff" } }}
      //   rightComponent={{ icon: "home", color: "#fff" }}
      on
    />
  );
}
