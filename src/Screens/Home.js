import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../utilis/Responsive";
import { Vimeo } from "react-native-vimeo-iframe";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import YouTube from "react-native-youtube";
import { Icon } from "@rneui/base";

export default function Home(props) {
  const [List, setList] = useState([
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Vimeo",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Youtube",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Youtube",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Vimeo",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Vimeo",
    },
  ]);
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
        <Text style={styles.headerText}>ASWJ-Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Icon
              type="material-community"
              name="account-circle"
              size={hp(3)}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={List}
        key={(item, index) => index}
        contentContainerStyle={{ paddingVertical: hp(2) }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.listContainer} key={index}>
              <Vimeo
                style={styles.playerStyles}
                key={index}
                videoId={item.videoId}
                loop={false}
                autoPlay={item.isPlaying}
                controls={true}
                speed={false}
                time={"0m0s"}
              />
              {/* <YouTube
                videoId={"KVZ-P-ZI6W4"}
                apiKey="AIzaSyBVu5OTBmotsUFX6GauJRrCrA9LwUhip8Q"
                play={true}
                onError
                style={{ height: hp(33) }}
              /> */}
              <Text style={styles.listHeadingStyles}>
                The Disease And The Cure, Part 46 - Farhan Bin Rafee
              </Text>
              <View style={styles.listBottomLine} />
            </View>
          );
        }}
      />
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
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3),
  },
  //list styles
  listContainer: {
    width: wp(100),
    alignItems: "center",
  },
  playerStyles: {
    backgroundColor: "transparent",
    width: wp(100),
    height: hp(30),
  },
  listHeadingStyles: {
    fontFamily: CustomFonts.bold,
    color: colors.white,
    width: wp(90),
    textAlign: "center",
    textAlignVertical: "center",
  },
  listBottomLine: {
    width: wp(100),
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginTop: hp(0.5),
    marginBottom: hp(2),
  },
});
