import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import HeaderButton from "./HeaderButton"
import HeaderCenterGroup from "./HeaderCenterGroup"
import HeaderLeftGroup from "./HeaderLeftGroup"
import HeaderRightGroup from "./HeaderRightGroup"
import HeaderTitle from "./HeaderTitle"
import Spacer from "./Spacer"

const Header = (props) => {
  const insets = useSafeAreaInsets()
  const backgroundColor = "#FFFBF5"

  const leftGroup = props.children.filter(
    (child) => child.type === HeaderLeftGroup,
  )
  const centerGroup = props.children.filter(
    (child) => child.type === HeaderCenterGroup,
  )
  const rightGroup = props.children.filter(
    (child) => child.type === HeaderRightGroup,
  )

  const isModal = props.isModal

  return (
    <View style={{ backgroundColor, paddingTop: isModal ? 0 : insets.top }}>
      <View
        style={{
          height: 56,
          backgroundColor,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 0.4,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Spacer
          style={{ backgroundColor: "blue" }}
          horizontal
          spacing={16}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            {leftGroup !== [] ? leftGroup[0] : <></>}
          </View>
          <View style={{ flex: 1 }}>
            {centerGroup !== [] ? centerGroup[0] : <></>}
          </View>
          <View style={{ flex: 1 }}>
            {rightGroup !== [] ? rightGroup[0] : <></>}
          </View>
        </View>
        <Spacer
          horizontal
          spacing={16}
        />
      </View>
    </View>
  )
}

Header.Title = HeaderTitle
Header.Button = HeaderButton
Header.LeftGroup = HeaderLeftGroup
Header.CenterGroup = HeaderCenterGroup
Header.RightGroup = HeaderRightGroup

export default Header
