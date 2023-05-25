import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Toast from "react-native-simple-toast";
export async function LocationGetting() {
  if (Platform.OS == "ios") {
    Geolocation.requestAuthorization("whenInUse");
    return new Promise((resolve, reject) =>
      Geolocation.getCurrentPosition(resolve, reject)
    );
  }
  if (Platform.OS == "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Sundas Blood Bank",
        message: "Sundas Blood Bank wants access to your location ",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise((resolve, reject) =>
        Geolocation.getCurrentPosition(resolve, reject)
      );
    } else {
      Toast.show("Location permission denied", Toast.SHORT);
    }
  }
}
