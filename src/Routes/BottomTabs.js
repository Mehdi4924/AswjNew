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

  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: hp(7) },
      }}
    >
      <BottomTabNavigator.Screen
        name="Homes"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/clapperboard.png")}
                  style={{ height: hp(3) }}
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
        component={FindMyMasjid}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  source={require("../../Assets/masjid.png")}
                  style={{ height: hp(3) }}
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
                  style={{ height: hp(3) }}
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
                  style={{ height: hp(3) }}
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
