import { Ionicons } from "@expo/vector-icons";

const Icon = ({ iconName, size, color }) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default Icon;
