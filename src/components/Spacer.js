import { View } from "react-native";

const Spacer = ({ horizontal, spacing }) => {
  const style = {
    width: horizontal ? spacing : 0,
    height: horizontal ? 0 : spacing,
  };

  return <View style={style} />;
};

export default Spacer;
