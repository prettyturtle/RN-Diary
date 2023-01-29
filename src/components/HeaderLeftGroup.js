import { View } from "react-native";

const HeaderLeftGroup = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {props.children}
    </View>
  );
};

export default HeaderLeftGroup;
