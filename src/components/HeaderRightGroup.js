import { View } from "react-native";

const HeaderRightGroup = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {props.children}
    </View>
  );
};

export default HeaderRightGroup;
