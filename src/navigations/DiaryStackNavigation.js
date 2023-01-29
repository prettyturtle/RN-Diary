import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NAVIGATION_NAME } from "../Constant"
import { DiaryDetailScreen } from "../screens/DiaryDetailScreen"
import { DiaryListScreen } from "../screens/DiaryListScreen"
import { SettingScreen } from "../screens/SettingScreen"

const Stack = createNativeStackNavigator()

export const DiaryStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION_NAME.DIARY_LIST}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NAVIGATION_NAME.DIARY_DETAIL}
        component={DiaryDetailScreen}
      />
      <Stack.Screen
        name={NAVIGATION_NAME.DIARY_LIST}
        component={DiaryListScreen}
      />
      <Stack.Screen
        name={NAVIGATION_NAME.SETTING}
        component={SettingScreen}
      />
    </Stack.Navigator>
  )
}
