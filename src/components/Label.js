import { Text } from "react-native"

const Label = ({ text, color, fontSize }) => {
  return <Text style={{ color, fontSize, textAlign: "center" }}>{text}</Text>
}

export default Label
