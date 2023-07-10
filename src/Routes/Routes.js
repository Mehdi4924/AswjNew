import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import ForgetPassword from "../Screens/ForgetPassword";
import SplashScreen from "../Screens/SplashScreen";
import UpdateProfile from "../Screens/UpdateProfile";
import PrayerTimes from "../Screens/PrayerTimes";
import Duas from "../Screens/Duas";
import Camps from "../Screens/Camps";
import LocalMasjids from "../Screens/LocalMasjids";
import Sessions from "../Screens/Sessions";
import Events from "../Screens/Event";
import Duas2 from "../Screens/Duas2";
import Radio from "../Screens/Radio";
import Notification from "../Screens/Notifications";
import FindMyMasjid from "../Screens/FindMyMasjid";
import SessionDetail from "../Screens/SessionDetail";
import eventDetail from "../Screens/EventDetails";
import Profile from "../Screens/Profile";
import BottomTabs from "./BottomTabs";
import Settings from "../Screens/Settings";
import VimeoAllVideos from "../Screens/VimeoAllVideos";
import YouTubeAllVideos from "../Screens/YouTubeAllVideos";
import { navigationRef } from "./RootNavigation";

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={"SplashScreen"}
        screenOptions={{
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdateProfile"
          component={UpdateProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={BottomTabs}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={Settings}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PrayerTimes"
          component={PrayerTimes}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Duas"
          component={Duas}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camps"
          component={Camps}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LocalMasjids"
          component={LocalMasjids}
        />

        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Sessions"
          component={Sessions}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Events"
          component={Events}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Duas2"
          component={Duas2}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Radio"
          component={Radio}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notification}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="FindMyMasjid"
          component={FindMyMasjid}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="SessionDetail"
          component={SessionDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="eventDetail"
          component={eventDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VimeoAllVideos"
          component={VimeoAllVideos}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="YouTubeAllVideos"
          component={YouTubeAllVideos}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
