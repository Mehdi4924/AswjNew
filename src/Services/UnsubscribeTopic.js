import React from "react";
import messaging from "@react-native-firebase/messaging";

export async function UnsubscribeTopic(arrOfCenters, cb) {
  if (arrOfCenters.length > 0) {
    await arrOfCenters.map(async (item) => {
      await messaging()
        .unsubscribeFromTopic(item)
        .then((res) => console.log("unsubed", item))
        .catch((err) => {
          console.log("unsub error", item);
        });
    });
  } else {
    cb("No Centers Selected");
  }
  cb("un subscribed All");
}
