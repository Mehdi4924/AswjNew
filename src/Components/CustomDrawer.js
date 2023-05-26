import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
  Dimensions,
  Linking,
  FlatList,
} from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import ModalGuest from "./ModalGuest";
import database from "@react-native-firebase/database";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../../Theme/styles";
const CustomDrawer = ({ props, navigation }) => {
  const [name, setname] = useState();
  const [user, setUser] = useState();
  const [visibility, setVisibility] = useState(false);
  const menuList = [
    {
      name: "Home",
      image: require("../../Assets/ic_home.png"),
      height: "170%",
      width: "17%",
      onPress: () => navigation.navigate("Home"),
    },
    {
      name: "Like us on Facebook",
      image: require("../../Assets/ic_menu_facebok_menu.png"),
      height: "170%",
      width: "17%",
      onPress: () => Linking.openURL("https://www.facebook.com/albayanradio/"),
    },
    {
      name: " Visit Website",
      image: require("../../Assets/ic_menu_web.png"),
      width: "15%",
      height: "135%",
      onPress: () => Linking.openURL("https://www.aswj.com.au/"),
    },
    {
      name: " Notifications Setting",
      image: require("../../Assets/Bell2.png"),
      width: "15%",
      height: "145%",
      onPress: () => NotificationPress(),
    },
    {
      name: "Logout",
      image: require("../../Assets/ic_logout.png"),
      height: "170%",
      width: "17%",
      onPress: () => LogOut(),
    },
  ];
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        setUser(null);
      } else {
        setUser(user);
        test(user.uid);
      }
    });
  }, []);
  const test = (id) => {
    database()
      .ref("profile/" + id)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        if (data == null) {
          setname("");
        } else {
          let nameSplit = data.fullName.split("");
          if (nameSplit.length > 12) {
            let nameInstance = nameSplit.splice(0, 12).join("");
            setname(nameInstance + "...");
          } else {
            setname(data.fullName);
          }
        }
      });
  };
  useEffect(() => {
    if (visibility === true) {
      setTimeout(() => {
        setVisibility(false);
      }, 1000);
    }
  }, [visibility]);
  const profilePress = () => {
    if (user == null) {
      navigation.closeDrawer();
      setVisibility(true);
    } else {
      navigation.navigate("profile");
    }
  };
  const NotificationPress = () => {
    if (user == null) {
      navigation.closeDrawer();
      setVisibility(true);
    } else {
      navigation.navigate("Notification");
    }
  };
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
      navigation.closeDrawer();
      await navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      await AsyncStorage.setItem("Guest", "0");
    } else {
      auth()
        .signOut()
        .then(() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
    }
  };
  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode={"cover"}
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
    >
      <Image
        style={{ width: "100%", height: "17.5%", opacity: 0.4 }}
        blurRadius={6}
        resizeMode={"cover"}
        source={require("../../Assets/profile-background.png")}
      />
      <TouchableOpacity
        onPress={() => profilePress()}
        style={{
          flex: 1,
          position: "absolute",
          top: "5%",
          marginHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            marginHorizontal: 20,
          }}
          source={require("../../Assets/profile_placeholder.jpg")}
        />
        <View style={{ marginVertical: 5, flex: 1 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              fontFamily: "Montserrat-Medium",
              flex: 1,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              fontFamily: "Montserrat-Light",
              flex: 1,
            }}
          >
            View Profile
          </Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={menuList}
        style={{ marginTop: 15 }}
        renderItem={({ item, key }) => (
          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: 20,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
          >
            <TouchableOpacity
              onPress={item.onPress}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={{ width: item.width, height: item.height }}
                source={item.image}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  marginHorizontal: 10,
                  fontFamily: "Montserrat-Regular",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: "rgba(0,0,0,0.2)",
                borderBottomWidth: 1,
                marginTop: 12,
              }}
            />
          </View>
        )}
      />
      <ModalGuest visible={visibility} />
    </ImageBackground>
  );
};
export default CustomDrawer;
