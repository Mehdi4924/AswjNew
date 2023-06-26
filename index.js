/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";
import { name as appName } from "./app.json";
import TrackPlayer, { Event, State } from "react-native-track-player";
import messaging from '@react-native-firebase/messaging';
import notifee, {
    AndroidImportance,
    AndroidVisibility,
    EventType,
  } from '@notifee/react-native';
  
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    onDisplayNotification(remoteMessage);
  });
  async function onDisplayNotification(remoteMessage) {
    let body = remoteMessage?.notification?.body || 'New Notification';
    let title =
      remoteMessage?.notification?.title ||
      'You Have A New Notification Recieved';
    let image =
      remoteMessage?.notification?.image ||
      'http://15.185.185.85:40/assets/img/icon.png';
    let data = remoteMessage?.data;
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'incoming_task',
      name: 'Incoming Task',
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
          launchActivity: 'default',
          id: 'default',
        },
      },
      ios: {},
    });
  }
  function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
      return null;
    }
    return <App />;
  }






AppRegistry.registerComponent(appName, () => HeadlessCheck);
TrackPlayer.registerPlaybackService(() => require("./service"));
