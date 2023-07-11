import React from "react";
import messaging from "@react-native-firebase/messaging";

export async function subscribeTopic(arrOfCenters, cb) {
  if (arrOfCenters.length > 0) {
    arrOfCenters.map(async (item) => {
      await messaging()
        .subscribeToTopic(item)
        .then((res) => {
          cb("Subscribed All" + item);
        });
    });
  } else {
    cb("No Centers Selected");
  }
}
