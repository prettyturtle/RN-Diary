import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { RootApp } from "./src/RootApp"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { RecoilRoot } from "recoil"

GoogleSignin.configure()

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <RootApp />
      </RecoilRoot>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
