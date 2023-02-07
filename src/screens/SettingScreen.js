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
import Icon from "../components/Icon"

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

  const onPressAddPassword = () => {
    navigation.push(NAVIGATION_NAME.ADD_PASSWORD)
  }
  const onPressClearPassword = async () => {
    const userDB = `/users/${userInfo.uid}`
    await database().ref(userDB).update({
      password: "",
    })
    setUserInfo({
      password: "",
    })
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
        <Spacer spacing={20} />
        <View
          style={{
            height: 0.4,
            backgroundColor: "lightgrey",
            marginHorizontal: 16,
          }}
        />
        <Spacer spacing={20} />
        <Button onPress={onPressAddPassword}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
              paddingHorizontal: 24,
            }}
          >
            <Label
              fontSize={16}
              text={
                userInfo.password !== "" ? "비밀번호 수정" : "비밀번호 추가"
              }
            />
            <Icon
              iconName="chevron-forward-outline"
              size={16}
            />
          </View>
        </Button>
        {userInfo.password !== "" && (
          <Button onPress={onPressClearPassword}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 24,
              }}
            >
              <Label
                fontSize={16}
                text="비밀번호 초기화"
              />
            </View>
          </Button>
        )}
      </View>
    </View>
  )
}
