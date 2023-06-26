import * as ActionTypes from "../actions/ActionTypes";
// Create Reducer :- Reducer is responsible for taking actions, making state modifications

let initialState = {
  allNotifications: [],
};
const Notifications = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NOTIFCATIONS:
      const index = state.allNotifications.findIndex(
        (item) =>
          item?.notification?.title ==
          action?.payload?.data?.notification?.title
      );
      const updatedNots = state.allNotifications.map((item) => {
        if (
          item?.notification?.title ==
          action?.payload?.data?.notification?.title
        ) {
          return action.payload.data;
        } else {
          return item;
        }
      });
      const afterTimeSort = updatedNots.sort((x, y) => {
        return new Date(x.sentTime) < new Date(y.sentTime) ? 1 : -1;
      });
      return {
        ...state,
        allNotifications:
          index == -1
            ? [action?.payload?.data, ...state.allNotifications]
            : afterTimeSort,
      };
    case ActionTypes.CLEARNOTIFICATIONS:
      return { ...state, allNotifications: [] };
    case ActionTypes.CLEARSINGLENOTIFICATION:
      const id = action.payload.data.messageId;
      const filtered = state.allNotifications.filter(
        (item) => item.messageId != id
      );
      return { ...state, allNotifications: filtered };
    case ActionTypes.READSINGLE:
      const readId = action.payload.data.messageId;
      const mapped = state.allNotifications.map((item) => {
        if (item.messageId == readId) {
          return { ...item, read: false };
        } else {
          return item;
        }
      });
      return { ...state, allNotifications: mapped };
    default:
      return state;
  }
};

export default Notifications;
