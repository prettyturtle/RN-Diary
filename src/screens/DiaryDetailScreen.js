import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import Header from "../components/Header"
import { NAVIGATION_NAME } from "../Constant"

export const DiaryDetailScreen = () => {
  const navigation = useNavigation()

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.LeftGroup>
          <Header.Button
            iconName={"arrow-back"}
            onPress={onPressBack}
          />
        </Header.LeftGroup>
        <Header.CenterGroup>
          <Header.Title title={NAVIGATION_NAME.DIARY_DETAIL} />
        </Header.CenterGroup>
      </Header>
    </View>
  )
}
