/**
 * @format
 */
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";
import { name as appName } from "./app.json";
import TrackPlayer, { Event, State } from "react-native-track-player";
import messaging from "@react-native-firebase/messaging";
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./src/Routes/RootNavigation";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  onDisplayNotification(remoteMessage);
  sendToAsync(remoteMessage);
});
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
async function sendToAsync(remoteMessage) {
  let a = await AsyncStorage.getItem("NotData");
  if (a) {
    let b = JSON.parse(a);
    await AsyncStorage.setItem(
      "NotData",
      JSON.stringify([...b, { ...remoteMessage, read: true }])
    );
  } else {
    let ab = [remoteMessage];
    await AsyncStorage.setItem("NotData", JSON.stringify(ab));
  }
}
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  if (type === EventType.PRESS) {
    console.log("background event", notification, pressAction);
    console.log("notification press in bavkground", notification);
    if (notification.data.notType == "Event") {
      navigate("Home", { screen: "Events" });
    } else if (notification.data.notType == "Dua") {
      navigate("Home", { screen: "Duas" });
    } else if (notification.data.notType == "Conference") {
      navigate("Camps");
    }
    await notifee.cancelNotification(notification.id);
  }
});
AppRegistry.registerComponent(appName, () => HeadlessCheck);
TrackPlayer.registerPlaybackService(() => require("./service"));
