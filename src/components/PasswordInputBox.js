import { TextInput, View } from "react-native"
import Label from "./Label"
import Spacer from "./Spacer"

export const PasswordInputBox = ({ value, onChangeText, errorMessage }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alightItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <TextInput
          autoFocus
          value={value}
          onChangeText={onChangeText}
          caretHidden
          keyboardType="number-pad"
          maxLength={4}
          style={{ opacity: 0, position: "absolute" }}
        />
        {[0, 1, 2, 3].map((item) => {
          return (
            <View
              style={{
                flex: 1,
                height: 100,
                marginRight: item !== 3 ? 12 : 0,
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 2,
                borderColor: errorMessage ? "red" : "black",
              }}
            >
              {value.length > item && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: errorMessage ? "red" : "black",
                  }}
                />
              )}
            </View>
          )
        })}
      </View>
      {errorMessage && (
        <>
          <Spacer spacing={12} />
          <View style={{ flexDirection: "row" }}>
            <Spacer
              spacing={24}
              horizontal
            />
            <Label
              fontSize={12}
              color="red"
              text={errorMessage}
            />
          </View>
        </>
      )}
    </>
  )
}
