import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import ForgetPassword from "../Screens/ForgetPassword";
import SplashScreen from "../Screens/SplashScreen";
import UpdateProfile from "../Screens/UpdateProfile";
import Home from "../Screens/Home";
import PrayerTimes from "../Screens/PrayerTimes";
import Duas from "../Screens/Duas";
import Camps from "../Screens/Camps";
import LocalMasjids from "../Screens/LocalMasjids";
import Videos from "../Screens/Videos";
import Sessions from "../Screens/Sessions";
import Events from "../Screens/Event";
import Duas2 from "../Screens/Duas2";
import BackButton from "../Components/BackButton";
import CustomDrawer from "../Components/CustomDrawer";
import Radio from "../Screens/Radio";
import Notification from "../Screens/Notifications";
import VideosList from "../Screens/VideosList";
import FindMyMasjid from "../Screens/FindMyMasjid";
import DrawerNavigator from "./DrawerNavigator";
import SessionDetail from "../Screens/SessionDetail";
import eventDetail from "../Screens/EventDetails";
import Profile from "../Screens/Profile";
import auth, { firebase } from "@react-native-firebase/auth";
import EventDetail from "../Screens/EventDetails";
import BottomTabs from "./BottomTabs";
import Settings from "../Screens/Settings";

const Stack = createNativeStackNavigator();
const Routes = () => {
  const [initial, setInitial] = useState("SplashScreen");

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initial}
        screenOptions={{
          // gestureDirection :"modal"
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
          component={(e) =>
            DrawerNavigator({
              name: "PrayerTimes",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Duas"
          component={(e) =>
            DrawerNavigator({
              name: "Duas",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camps"
          component={(e) =>
            DrawerNavigator({
              name: "Camps",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LocalMasjids"
          component={(e) =>
            DrawerNavigator({
              name: "LocalMasjids",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Videos"
          component={(e) =>
            DrawerNavigator({
              name: "Videos",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Sessions"
          component={(e) =>
            DrawerNavigator({
              name: "Sessions",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Events"
          component={(e) =>
            DrawerNavigator({
              name: "Events",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Duas2"
          component={(e) =>
            DrawerNavigator({
              name: "Duas2",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Radio"
          component={(e) =>
            DrawerNavigator({
              name: "Radio",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={(e) =>
            DrawerNavigator({
              name: "Notification",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideosList"
          component={(e) =>
            DrawerNavigator({
              name: "VideosList",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FindMyMasjid"
          component={(e) =>
            DrawerNavigator({
              name: "FindMyMasjid",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="SessionDetail"
          component={(e) =>
            DrawerNavigator({
              name: "SessionDetail",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="eventDetail"
          component={(e) =>
            DrawerNavigator({
              name: "eventDetail",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="profile"
          component={(e) =>
            DrawerNavigator({
              name: "profile",
              route: e.route,
              navigation: e.navigation,
            })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
