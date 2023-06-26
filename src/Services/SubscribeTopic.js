import React from "react";
import messaging from "@react-native-firebase/messaging";

export async function subscribeTopic(arrOfCenters, cb) {
  if (arrOfCenters.length > 0) {
    arrOfCenters.map(async (item) => {
      await messaging().subscribeToTopic(item);
    });
    cb("Subscribed All");
  } else {
    cb("No Centers Selected");
  }
}
