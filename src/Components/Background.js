import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
  ImageBackground,
  Dimensions,
} from "react-native";
const BackGround = ({ children }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    // <View style={{flex:1}}>
    <ImageBackground
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
      style={{ width: windowWidth, height: windowHeight }}
    >
      {children}
    </ImageBackground>
    // </View>
  );
};
export default BackGround;
