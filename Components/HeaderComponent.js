import React from "react";
import { Header, Icon } from "react-native-elements";
import Context from "../Context/ContextProvider";

const LeftComponent = () => {
  const { previous, changeNavigation, toggleDrawer } = React.useContext(
    Context
  );
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
          toggleDrawer();
        }
      }}
    ></Icon>
  );
};

const RightComponent = () => {
  const { changeNavigation } = React.useContext(Context);
  return (
    <Icon
      name="home"
      type="font-awesome"
      color="#fff"
      size={22}
      onPress={() => changeNavigation("Home")}
    ></Icon>
  );
};

export default function HeaderComponent() {
  return (
    <Header
      placement="center"
      leftComponent={<LeftComponent></LeftComponent>}
      centerComponent={{ text: "Expense Tracker", style: { color: "#fff" } }}
      rightComponent={<RightComponent></RightComponent>}
      on
    />
  );
}
