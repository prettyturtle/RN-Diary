import { useNavigation } from "@react-navigation/native"
import { Image, View } from "react-native"
import Header from "../components/Header"
import { NAVIGATION_NAME } from "../Constant"
import { useRecoilState } from "recoil"
import { stateUserInfo } from "../states/stateUserInfo"
import Button from "../components/Button"
import Spacer from "../components/Spacer"
import Label from "../components/Label"
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload"
import database from "@react-native-firebase/database"

export const SettingScreen = () => {
  const navigation = useNavigation()
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo)
  const runImagePickAndUpload = useImagePickAndUpload(false)

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  const onPressProfile = async () => {
    const result = await runImagePickAndUpload()

    if (result.length >= 1) {
      const userDB = `/users/${userInfo.uid}`

      setUserInfo((prevState) => {
        return {
          ...prevState,
          profileImage: result[0],
        }
      })

      await database().ref(userDB).update({ profileImage: result[0] })
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
          <Header.Title title={NAVIGATION_NAME.SETTING} />
        </Header.CenterGroup>
      </Header>

      <View style={{ flex: 1, paddingTop: 32 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Button onPress={onPressProfile}>
            <Image
              source={{ uri: userInfo.profileImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Spacer spacing={20} />
            <Label
              text={userInfo.name}
              fontSize={20}
            />
          </Button>
        </View>
      </View>
    </View>
  )
}
