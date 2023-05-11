import React from "react";

import { createDrawerNavigator, dr } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import CustomDrawer from "../Components/CustomDrawer";
import Home from "../Screens/Home";
import PrayerTimes from "../Screens/PrayerTimes";
import Duas from "../Screens/Duas";
import Camps from "../Screens/Camps";
import LocalMasjids from "../Screens/LocalMasjids";
import Videos from "../Screens/Videos";
import Sessions from "../Screens/Sessions";
import Events from "../Screens/Event";
import Duas2 from "../Screens/Duas2";
import Radio from "../Screens/Radio";
import VideosList from "../Screens/VideosList";
import FindMyMasjid from "../Screens/FindMyMasjid";
import SessionDetail from "../Screens/SessionDetail";
import EventDetail from "../Screens/EventDetails";
import Profile from "../Screens/Profile";
import Notification from "../Screens/Notifications";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ name, route }) => {
  let componentName =
    name == "Home"
      ? Home
      : name == "PrayerTimes"
      ? PrayerTimes
      : name == "Duas"
      ? Duas
      : name == "Camps"
      ? Camps
      : name == "LocalMasjids"
      ? LocalMasjids
      : name == "Videos"
      ? Videos
      : name == "Sessions"
      ? Sessions
      : name == "Events"
      ? Events
      : name == "Duas2"
      ? Duas2
      : name == "Radio"
      ? Radio
      : name == "VideosList"
      ? VideosList
      : name == "FindMyMasjid"
      ? FindMyMasjid
      : name == "SessionDetail"
      ? SessionDetail
      : name == "eventDetail"
      ? EventDetail
      : name == "profile"
      ? Profile
      : Notification;

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#c6cbef",
          width: 280,
        },
        drawerType: "front",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerType="overlay"
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        initialParams={{ params: route.params }}
        name={name}
        component={componentName}
      />
      {/* <Drawer.Screen
          options={{ headerShown: false }}
          name="PrayerTimes"
          component={PrayerTimes}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Duas"
          component={Duas}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Camps"
          component={Camps}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="LocalMasjids"
          component={LocalMasjids}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Videos"
          component={Videos}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Sessions"
          component={Sessions}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Events"
          component={Events}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Duas2"
          component={Duas2}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Radio"
          component={Radio}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={Notification}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="VideosList"
          component={VideosList}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="FindMyMasjid"
          component={FindMyMasjid}
        />
       
        <Drawer.Screen
          options={{ headerShown: false }}
          name="SessionDetail"
          component={SessionDetail}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="eventDetail"
          component={EventDetail}
        />
        <Drawer.Screen
          options={{ headerShown: false }}
          name="profile"
          component={Profile}
        /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
