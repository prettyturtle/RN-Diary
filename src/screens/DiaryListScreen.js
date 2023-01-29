import { useNavigation } from "@react-navigation/native"
import { FlatList, Image, useWindowDimensions, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "../components/Header"
import { NAVIGATION_NAME } from "../Constant"
import Button from "../components/Button"
import Icon from "../components/Icon"
import { useState } from "react"
import Label from "../components/Label"
import Spacer from "../components/Spacer"

export const DiaryListScreen = () => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const onPressSettings = () => {
    navigation.push(NAVIGATION_NAME.SETTING)
  }

  const onPressAdd = () => {
    navigation.push(NAVIGATION_NAME.ADD_DIARY)
  }

  const onPressDetail = (item) => {
    navigation.push(NAVIGATION_NAME.DIARY_DETAIL, { item })
  }

  const [data, setData] = useState([
    {
      id: 0,
      title: "TITLE_01",
      content: "CONTENT_01",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
      imageUrl:
        "https://fastly.picsum.photos/id/630/2560/1440.jpg?hmac=4LCCAezLuLF1k4ZUEDoa5VZHBdZWicj5qfKdrEOBi1k",
    },
    {
      id: 1,
      title: "TITLE_02",
      content: "CONTENT_02",
      createdAt: "2022-01-02",
      updatedAt: "2022-01-02",
      imageUrl:
        "https://fastly.picsum.photos/id/630/2560/1440.jpg?hmac=4LCCAezLuLF1k4ZUEDoa5VZHBdZWicj5qfKdrEOBi1k",
    },
    {
      id: 2,
      title: "TITLE_03",
      content: "CONTENT_03",
      createdAt: "2022-01-03",
      updatedAt: "2022-01-03",
      imageUrl: null,
    },
  ])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.CenterGroup>
            <Header.Title title={NAVIGATION_NAME.DIARY_LIST} />
          </Header.CenterGroup>
          <Header.RightGroup>
            <Header.Button
              iconName={"settings-outline"}
              onPress={onPressSettings}
            />
          </Header.RightGroup>
        </Header>

        <FlatList
          data={data}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
          renderItem={({ item }) => {
            return (
              <Button onPress={() => onPressDetail(item)}>
                <View style={{ paddingVertical: 12 }}>
                  {item.imageUrl !== null && (
                    <>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{
                          width: width - 24 * 2,
                          height: (width - 24 * 2) * 0.5,
                          borderRadius: 8,
                        }}
                      />
                      <Spacer spacing={4} />
                    </>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Label
                        text={item.title}
                        fontSize={18}
                      />
                      <Spacer spacing={4} />
                      <Label
                        text={item.content}
                        fontSize={12}
                      />
                    </View>
                    <Label
                      text={item.updatedAt}
                      fontSize={12}
                    />
                  </View>
                </View>
              </Button>
            )
          }}
        />
      </View>
      <View
        style={{ position: "absolute", right: 12, bottom: insets.bottom + 24 }}
      >
        <Button onPress={onPressAdd}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "brown",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              iconName={"add"}
              size={30}
              color={"white"}
            />
          </View>
        </Button>
      </View>
    </View>
  )
}
