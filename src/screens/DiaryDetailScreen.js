import { useNavigation, useRoute } from "@react-navigation/native"
import { useMemo } from "react"
import { Image, ScrollView, useWindowDimensions, View } from "react-native"
import Header from "../components/Header"
import Label from "../components/Label"
import Spacer from "../components/Spacer"
import { NAVIGATION_NAME } from "../Constant"

export const DiaryDetailScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const { width } = useWindowDimensions()

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    }
  }, [width])

  const date = useMemo(() => {
    return new Date(route.params.item.date)
  }, [route.params.item])

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
      <ScrollView style={{ flex: 1 }}>
        {typeof route.params.item.photoUrl !== "undefined" && (
          <Image
            source={{ uri: route.params.item.photoUrl }}
            style={{
              width: photoSize.photoWidth,
              height: photoSize.photoHeight,
            }}
          />
        )}
        <Spacer spacing={20} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 24,
            paddingVertical: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label
            fontSize={20}
            text="날짜"
          />
          <Label
            fontSize={16}
            text={`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDate()}일`}
          />
        </View>

        <Spacer spacing={40} />

        <View
          style={{
            paddingHorizontal: 24,
            alignItems: "flex-start",
          }}
        >
          <Label
            fontSize={32}
            text={route.params.item.title}
          />
          <Label
            fontSize={24}
            text={route.params.item.content}
          />
        </View>
      </ScrollView>
    </View>
  )
}
