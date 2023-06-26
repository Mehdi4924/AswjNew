// Create Actions :- Actions describe what you are going to do, what do you want to do. It's just a simple function that returns a object
import * as ActionTypes from "./ActionTypes";

export function setNotificationData(data) {
  return {
    type: ActionTypes.NOTIFCATIONS,
    payload: {
      data,
    },
  };
}
export function clearNotificationData() {
  return {
    type: ActionTypes.CLEARNOTIFICATIONS,
  };
}
export function clearSingleNotification(data) {
  return {
    type: ActionTypes.CLEARSINGLENOTIFICATION,
    payload: {
      data,
    },
  };
}
export function readSingleNotification(data) {
  return {
    type: ActionTypes.READSINGLE,
    payload: {
      data,
    },
  };
}