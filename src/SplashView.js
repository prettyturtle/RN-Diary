import { View } from "react-native"
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { stateUserInfo } from "./states/stateUserInfo"
import { useGetDiaryList } from "./hooks/useGetDiaryList"

export const SplashView = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(false)
  const setUserInfo = useSetRecoilState(stateUserInfo)
  const runGetDiaryList = useGetDiaryList()

  const signInUserIdentify = async (idToken) => {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    const result = await auth().signInWithCredential(googleCredential)

    console.log(result)
    const userDBRefKey = `/users/${result.user.uid}`
    const userResult = await database()
      .ref(userDBRefKey)
      .once("value")
      .then((snapshot) => {
        return snapshot.val()
      })
    console.log(userResult)
    const now = new Date().toISOString()
    if (userResult === null) {
      await database().ref(userDBRefKey).set({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
        uid: result.user.uid,
        password: "",
        createdAt: now,
        lastLoginAt: now,
      })
    } else {
      await database().ref(userDBRefKey).update({
        lastLoginAt: now,
      })
    }

    const userInfo = await database()
      .ref(userDBRefKey)
      .once("value")
      .then((snapshot) => snapshot.val())

    console.log("userInfo : ", userInfo)

    setUserInfo(userInfo)
    await runGetDiaryList(userInfo)
    props.onFinishLoad()
  }
  const onPressGoogleLogin = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const { idToken } = await GoogleSignin.signIn()
    signInUserIdentify(idToken)
  }

  const userSilentLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signInSilently()
      signInUserIdentify(idToken)
    } catch (error) {
      setShowLoginButton(true)
    }
  }

  useEffect(() => {
    userSilentLogin()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}
    </View>
  )
}
