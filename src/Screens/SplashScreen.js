import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, Dimensions } from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [arr, setarr] = useState([]);
  const [guest, setguest] = useState();

  useEffect(() => {
    setTimeout(async () => {
      let v = await AsyncStorage.getItem("Guest");
      console.log("v==>>", v);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          let data = "";

          database()
            .ref("/profile")
            .on("value", (snapshot) => {
              data = snapshot.child(user.uid).val();
              console.log(data);
              if (data == null) {
                navigation.navigate("UpdateProfile");
              } else {
                navigation.navigate("Home");
              }
            });
        } else if (v == 1) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Login");
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
