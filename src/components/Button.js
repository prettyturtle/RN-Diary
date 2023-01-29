import { TouchableOpacity } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
      hitSlop={{ left: 7, right: 7, top: 10, bottom: 10 }}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default Button;
