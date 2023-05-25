import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { firebase } from "@react-native-firebase/auth";
import { LcoationGetting } from "../../utilis/LocationGetting";

export default function Settings(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
  }, []);
  const LogOut = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (token) {
      AccessToken.getCurrentAccessToken().then((data) => {
        let accessToken = data.accessToken;
        const responseInfoCallback = (error, result) => {
          if (error) {
            console.log(error);
          } else {
            LoginManager.logOut();
          }
        };
        const infoRequest = new GraphRequest(
          "/me",
          {
            accessToken: accessToken,
            parameters: {
              fields: {
                string: "email,name,first_name,middle_name,last_name",
              },
            },
          },
          responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });
    }
    if (user == null) {
      await props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      await AsyncStorage.setItem("Guest", "0");
    } else {
      auth()
        .signOut()
        .then(() =>
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
    }
  };
  return (
    <ImageBackground
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("../../Assets/fb_logo.jpg")}
          style={{ height: hp(6), width: wp(20) }}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.goBackContainer}
      >
        <Icon
          type="material-community"
          name="chevron-left"
          size={hp(3)}
          color={colors.white}
        />
        <Text style={styles.goHomeText}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.userNameText}>Iftikhar Mehdi</Text>
      <Text style={styles.userEmailText}>Anonymous@gmail.com</Text>
      <TouchableOpacity
        style={styles.editProfileView}
        onPress={() => props.navigation.navigate("profile")}
      >
        <Text style={styles.editText}>Edit Profile</Text>
        <Icon
          type="material-community"
          name="chevron-right"
          size={hp(3)}
          color={colors.white}
        />
      </TouchableOpacity>
      <Text style={styles.eventText}>Events And Camps</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate("Camps")}
      >
        <Image
          source={require("../../Assets/main_event.png")}
          style={{ width: wp(10), height: hp(4) }}
          resizeMode="contain"
        />
        <Text style={styles.containerText}>Camps and Conference</Text>
        <Icon
          type="material-community"
          name="chevron-right"
          size={hp(3)}
          color={colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate("LocalMasjids")}
      >
        <Image
          source={require("../../Assets/lecture.png")}
          style={{ width: wp(10), height: hp(4) }}
          resizeMode="contain"
        />
        <Text style={styles.containerText}>Local Masjids</Text>
        <Icon
          type="material-community"
          name="chevron-right"
          size={hp(3)}
          color={colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate("PrayerTimes")}
      >
        <Image
          source={require("../../Assets/7.png")}
          style={{ width: wp(10), height: hp(5) }}
          resizeMode="contain"
        />
        <Text style={styles.containerText}>Prayer Times</Text>
        <Icon
          type="material-community"
          name="chevron-right"
          size={hp(3)}
          color={colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => LogOut()}
      >
        <Image
          source={require("../../Assets/logout.png")}
          style={{ width: wp(10), height: hp(4) }}
          resizeMode="contain"
        />
        <Text style={styles.containerText}>Logout</Text>
        <Icon
          type="material-community"
          name="chevron-right"
          size={hp(3)}
          color={colors.white}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { width: wp(100), height: hp(100) },
  header: {
    backgroundColor: colors.white,
    width: wp(100),
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: CustomFonts.bold,
    color: colors.primary,
    fontSize: hp(2),
    marginRight: wp(5),
  },
  goBackContainer: {
    width: wp(90),
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: hp(2),
  },
  goHomeText: {
    fontFamily: CustomFonts.bold,
    color: colors.white,
    fontSize: hp(2),
  },
  userNameText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: CustomFonts.regular,
    color: colors.white,
    marginTop: hp(5),
  },
  userEmailText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: CustomFonts.bold,
    color: colors.primary,
    backgroundColor: colors.white,
    alignSelf: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 5,
    fontSize: hp(2),
    marginTop: hp(2),
  },
  editProfileView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: wp(40),
    alignSelf: "center",
    marginTop: hp(2),
    borderRadius: 5,
  },
  editText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: CustomFonts.bold,
    color: colors.white,
  },
  eventText: {
    width: wp(90),
    fontFamily: CustomFonts.bold,
    color: colors.white,
    alignSelf: "center",
    marginTop: hp(5),
  },
  buttonContainer: {
    backgroundColor: colors.black,
    width: wp(90),
    height: hp(6),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: 5,
  },
  containerText: {
    width: wp(60),
    fontFamily: CustomFonts.bold,
    color: colors.white,
  },
});
