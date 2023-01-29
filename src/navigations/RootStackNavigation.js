import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NAVIGATION_NAME } from "../Constant"
import { AddDiaryScreen } from "../screens/AddDiaryScreen"
import { DiaryStackNavigation } from "./DiaryStackNavigation"

const Stack = createNativeStackNavigator()

export const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION_NAME.DIARY_STACK_NAVIGATION}
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name={NAVIGATION_NAME.DIARY_STACK_NAVIGATION}
        component={DiaryStackNavigation}
      />
      <Stack.Screen
        name={NAVIGATION_NAME.ADD_DIARY}
        component={AddDiaryScreen}
      />
    </Stack.Navigator>
  )
}
