import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { useRecoilValue } from "recoil"
import Header from "../components/Header"
import { PasswordInputBox } from "../components/PasswordInputBox"
import { stateUserInfo } from "../states/stateUserInfo"
import database from "@react-native-firebase/database"

export const AddPasswordScreen = () => {
  const [firstInput, setFirstInput] = useState("")
  const [secondInput, setSecondInput] = useState("")
  const [isInputFirst, setIsInputFirst] = useState(true)
  const userInfo = useRecoilValue(stateUserInfo)

  const navigation = useNavigation()
  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  const onCompleteInputPassword = async () => {
    if (firstInput !== secondInput) {
      return
    }

    const userDB = `/users/${userInfo.uid}`

    await database().ref(userDB).update({
      password: firstInput,
    })

    onPressBack()
  }

  useEffect(() => {
    if (firstInput.length < 4) {
      return
    }
    if (secondInput.length < 4) {
      return
    }
    if (firstInput === secondInput) {
      //저장하기
      onCompleteInputPassword()
    }
  }, [firstInput, secondInput])

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.LeftGroup>
          <Header.Button
            iconName="arrow-back"
            onPress={onPressBack}
          />
        </Header.LeftGroup>
        <Header.CenterGroup>
          <Header.Title title="비밀번호 추가" />
        </Header.CenterGroup>
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <PasswordInputBox
          value={isInputFirst ? firstInput : secondInput}
          onChangeText={(text) => {
            if (isInputFirst) {
              setFirstInput(text)
              if (text.length === 4) {
                setIsInputFirst(false)
              }
            } else {
              setSecondInput(text)
            }
          }}
        />
      </View>
    </View>
  )
}
