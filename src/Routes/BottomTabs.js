import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import FindMyMasjid from "../Screens/FindMyMasjid";
import Duas from "../Screens/Duas";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import Radio from "../Screens/Radio";
import Geolocation from "react-native-geolocation-service";

export default function BottomTabs() {
  const BottomTabNavigator = createBottomTabNavigator();
  const [latLng, setLatLng] = useState({ lat: 31.5520344, lng: 74.3498515 });
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Aswj",
          message: "Aswj wants to access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getGeoLocaation();
      }
    } catch (err) {
      console.log("error getting location", err);
    }
  };
  const getGeoLocaation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position update", position);
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log("error getting location", error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabNavigator.Screen
        name="Home"
        component={(props) => <Home {...props} latLng={latLng} />}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/clapperboard.png")}
                  style={{ height: hp(4) }}
                  resizeMode="contain"
                />
                <Text
                  style={focused ? styles.focusedTextStyles : styles.TextStyles}
                >
                  Home
                </Text>
              </>
            );
          },
        }}
      />
      <BottomTabNavigator.Screen
        name="FindMyMasjid"
        component={(props) => <FindMyMasjid {...props} latLng={latLng} />}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/masjid.png")}
                  style={{ height: hp(4) }}
                  resizeMode="contain"
                />
                <Text
                  style={focused ? styles.focusedTextStyles : styles.TextStyles}
                >
                  Find My Masjid
                </Text>
              </>
            );
          },
        }}
      />
      <BottomTabNavigator.Screen
        name="Radio"
        component={Radio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/radio.png")}
                  style={{ height: hp(4) }}
                  resizeMode="contain"
                />
                <Text
                  style={focused ? styles.focusedTextStyles : styles.TextStyles}
                >
                  Radio
                </Text>
              </>
            );
          },
        }}
      />
      <BottomTabNavigator.Screen
        name="Duas"
        component={Duas}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/prayer.png")}
                  style={{ height: hp(4) }}
                  resizeMode="contain"
                />
                <Text
                  style={focused ? styles.focusedTextStyles : styles.TextStyles}
                >
                  Duas
                </Text>
              </>
            );
          },
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}
//other components to show are
// prayer times
// LIve Radio
// specialEvents
// Campsandconference
// lcoalmasjidtimetable

const styles = StyleSheet.create({
  focusedTextStyles: {
    fontSize: hp(1.4),
    fontFamily: CustomFonts.bold,
    color: colors.primary,
    marginTop: hp(0.5),
  },
  TextStyles: {
    fontSize: hp(1.4),
    fontFamily: CustomFonts.regular,
    color: colors.black,
    marginTop: hp(0.5),
  },
});
