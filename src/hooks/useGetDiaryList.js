import { useSetRecoilState } from "recoil"
import { stateDiaryList } from "../states/stateDiaryList"
import database from "@react-native-firebase/database"

export const useGetDiaryList = () => {
  const setDiaryList = useSetRecoilState(stateDiaryList)

  return async (userInfo) => {
    const userDiaryDB = database().ref(`diary/${userInfo.uid}`)
    const diaryListResult = await userDiaryDB.once("value").then((snapshot) => {
      return snapshot.val()
    })

    const list = Object.keys(diaryListResult).map((key) => diaryListResult[key])

    setDiaryList(list)
  }
}
