import { useState } from "react"
import { TextInput, View } from "react-native"

export const MultiLineInput = (props) => {
  const [focused, setFocused] = useState(false)
  return (
    <View
      style={{
        alignSelf: "stretch",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 0.4,
        borderColor: focused ? "black" : "lightgrey",
      }}
    >
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={{
          ...props.style,
          fontSize: props.fontSize ?? 20,
          height: props.height ?? 200,
        }}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => {
          setFocused(false)
        }}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  )
}
