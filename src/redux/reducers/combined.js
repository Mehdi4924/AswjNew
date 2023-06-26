import { combineReducers } from "redux";
import Notifications from "./NotificationData";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Notifications"],
  timeout: null,
};

const combinedReducers = combineReducers({
  Notifications,
});
const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
