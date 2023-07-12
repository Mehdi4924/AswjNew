import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, Dimensions } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeTopic } from "../Services/SubscribeTopic";

const SplashScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  useEffect(() => {
    setTimeout(async () => {
      let v = await AsyncStorage.getItem("Guest");
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          database()
            .ref("/profile")
            .on("value", async (snapshot) => {
              const data = snapshot.child(user.uid).val();
              console.log("user details", data, user);
              if (data == null) {
                navigation.navigate("UpdateProfile");
              } else {
                data?.mosques?.length > 1
                  ? await subscribeTopic([...data?.mosques], (mess) =>
                      console.log(mess, data.mosques)
                    )
                  : null;
                navigation.replace("Home");
              }
            });
        } else if (v == 1) {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      });
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../Assets/index.jpg")}
        style={{
          flex: 1,
          width: windowWidth + 20,
          height: windowHeight,
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
