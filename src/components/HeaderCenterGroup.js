import { View } from "react-native";

const HeaderCenterGroup = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </View>
  );
};

export default HeaderCenterGroup;
