import Button from "./Button";
import Icon from "./Icon";

const HeaderButton = ({ iconName, onPress, position }) => {
  return (
    <Button onPress={onPress}>
      <Icon iconName={iconName} size={22} color="black" />
    </Button>
  );
};

export default HeaderButton;
