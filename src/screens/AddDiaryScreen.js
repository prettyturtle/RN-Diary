import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import Header from "../components/Header"
import { NAVIGATION_NAME, popScreen } from "../Constant"

export const AddDiaryScreen = () => {
  const navigation = useNavigation()

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header isModal>
        <Header.LeftGroup>
          <Header.Button
            iconName={"close"}
            onPress={onPressBack}
          />
        </Header.LeftGroup>
        <Header.CenterGroup>
          <Header.Title title={NAVIGATION_NAME.ADD_DIARY} />
        </Header.CenterGroup>
      </Header>
    </View>
  )
}
