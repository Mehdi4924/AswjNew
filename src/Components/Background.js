import React, { useState, useEffect } from "react";
import { ImageBackground, Dimensions } from "react-native";
const BackGround = ({ children }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <ImageBackground
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
      style={{ width: windowWidth, height: windowHeight }}
    >
      {children}
    </ImageBackground>
  );
};
export default BackGround;
