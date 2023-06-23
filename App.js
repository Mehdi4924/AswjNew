import React, { useEffect } from "react";
import Routes from "./src/Routes/Routes";
import { Settings } from "react-native-fbsdk-next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import messaging from "@react-native-firebase/messaging";
import { GetToken } from "./src/Services/GetToken";

// Settings.initializeSDK();
const App = () => {
  useEffect(() => {
    Settings.initializeSDK();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Notification handled in foreground", remoteMessage);
      // onDisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    await GetToken();
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
    </GestureHandlerRootView>
  );
};
export default App;
