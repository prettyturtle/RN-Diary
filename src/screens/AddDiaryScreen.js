import { useNavigation } from "@react-navigation/native"
import { useMemo, useState } from "react"
import { Image, ScrollView, useWindowDimensions, View } from "react-native"
import Button from "../components/Button"
import Header from "../components/Header"
import Label from "../components/Label"
import Spacer from "../components/Spacer"
import { NAVIGATION_NAME } from "../Constant"
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload"
import DateTimePicker from "react-native-modal-datetime-picker"
import { SingleLineInput } from "../components/SingleLineInput"
import { MultiLineInput } from "../components/MultiLineInput"
import { useCreateDiary } from "../hooks/useCreateDiary"

export const AddDiaryScreen = () => {
  const { width } = useWindowDimensions()
  const runCreateDiary = useCreateDiary()

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    }
  }, [width])

  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null)
  const runImagePickAndUpload = useImagePickAndUpload()
  const [visibleDatePicker, setVisibleDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const canSave = useMemo(() => {
    if (selectedDate === null || title === "" || content === "") {
      return false
    }
    return true
  }, [selectedDate, title, content])

  const navigation = useNavigation()

  const onPressBack = () => {
    if (navigation.canGoBack()) {
      navigation.pop()
    }
  }

  const onPressPhotoItem = async () => {
    const result = await runImagePickAndUpload()

    if (result.length > 0) {
      setSelectedPhotoUrl(result[0])
    }
  }

  const onPressCalendar = () => {
    setVisibleDatePicker(true)
  }

  const onPressSave = () => {
    if (!canSave) {
      return
    }
    runCreateDiary(selectedPhotoUrl, selectedDate, title, content)
    onPressBack()
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
      <ScrollView style={{ flex: 1 }}>
        <Button onPress={onPressPhotoItem}>
          {selectedPhotoUrl !== null ? (
            <Image
              source={{ uri: selectedPhotoUrl }}
              style={{
                width: photoSize.photoWidth,
                height: photoSize.photoHeight,
              }}
            ></Image>
          ) : (
            <View
              style={{
                backgroundColor: "lightgrey",
                width: photoSize.photoWidth,
                height: photoSize.photoHeight,
              }}
            ></View>
          )}
        </Button>
        <Spacer spacing={20} />
        <Button onPress={onPressCalendar}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Label
              fontSize={20}
              text="날짜"
            />
            <Label
              fontSize={16}
              text={
                selectedDate !== null
                  ? `${selectedDate.getFullYear()}년 ${
                      selectedDate.getMonth() + 1
                    }월 ${selectedDate.getDate()}일`
                  : "날짜를 선택해주세요"
              }
            />
          </View>
        </Button>
        <Spacer spacing={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <SingleLineInput
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력해주세요..."
          />
        </View>
        <Spacer spacing={20} />
        <View style={{ paddingHorizontal: 24 }}>
          <MultiLineInput
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력해주세요..."
          />
        </View>
        <Spacer spacing={40} />
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <Button onPress={onPressSave}>
            <View
              style={{
                paddingVertical: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: canSave ? "black" : "lightgrey",
                borderRadius: 4,
              }}
            >
              <Label
                color={canSave ? "white" : "grey"}
                fontSize={20}
                text="등록하기"
              />
            </View>
          </Button>
        </View>
      </ScrollView>

      <DateTimePicker
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          console.log(date)
          setSelectedDate(new Date(date))
          setVisibleDatePicker(false)
        }}
        onCancel={() => {
          setVisibleDatePicker(false)
        }}
      />
    </View>
  )
}
