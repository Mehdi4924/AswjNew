import React, { useEffect } from "react";
import Routes from "./src/Routes/Routes";
import { Settings } from "react-native-fbsdk-next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import messaging from "@react-native-firebase/messaging";
import { GetToken } from "./src/Services/GetToken";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from "@notifee/react-native";
import { persistor, store } from "./src/redux";
import { setNotificationData } from "./src/redux/actions/Action";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Settings.initializeSDK();
const App = () => {
  useEffect(() => {
    Settings.initializeSDK();
    requestUserPermission();
    sendAsyncDataToStore();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Notification handled in foreground", remoteMessage);
      onDisplayNotification(remoteMessage);
      store.dispatch(setNotificationData(remoteMessage));
    });
    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    await GetToken();
  }
  async function onDisplayNotification(remoteMessage) {
    let body = remoteMessage?.notification?.body || "New Notification";
    let title =
      remoteMessage?.notification?.title ||
      "You Have A New Notification Recieved";
    let image =
      remoteMessage?.notification?.image ||
      "http://15.185.185.85:40/assets/img/icon.png";
    let data = remoteMessage?.data;
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: "incoming_task",
      name: "Incoming Task",
      importance: AndroidImportance.HIGH,
    });
    await notifee.displayNotification({
      title: `${title}`,
      body: `${body}`,
      data: data,
      android: {
        largeIcon: `${image}`,
        channelId,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: {
          launchActivity: "default",
          id: "default",
        },
      },
      ios: {},
    });
  }
  async function sendAsyncDataToStore() {
    const a = await AsyncStorage.getItem("NotData");
    if (a) {
      const parsedData = JSON.parse(a);
      if (parsedData.length > 0) {
        parsedData.map((remoteMessage) => {
          store.dispatch(setNotificationData(remoteMessage));
        });
      }
    }
    await AsyncStorage.removeItem("NotData");
  }
  return (
    <Provider style={{ flex: 1 }} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};
export default App;
