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
import React, { useEffect, useState } from "react";
import { hp, wp } from "../../utilis/Responsive";
import { Vimeo } from "react-native-vimeo-iframe";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import YouTube from "react-native-youtube";
import YoutubePlayer, {
  InitialPlayerParams,
} from "react-native-youtube-iframe";
import { Icon } from "@rneui/base";
import { getVideos } from "../../utilis/Api/Api_controller";
import axios from "axios";

export default function Home(props) {
  const [List, setList] = useState([
    {
      videoId: "806710332",
      isPlaying: false,
      videoType: "Vimeo",
    },
    {
      videoId: "https://www.youtube.com/watch?v=SqcY0GlETPk",
      isPlaying: false,
      videoType: "Youtube",
    },
    {
      videoId: "Y274jZs5s7s",
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
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setFetching(true);
    await getVideos(1)
      .then((res) => {
        console.log(
          "success getting videos",
          JSON.stringify(res.data, null, 4)
        );
      })
      .catch((err) => {
        console.log("error getting videos", err);
      })
      .finally(function () {
        setFetching(false);
      });

    // await axios
    //   .get(
    //     "https://www.googleapis.com/youtube/v3/search?key={AIzaSyBVu5OTBmotsUFX6GauJRrCrA9LwUhip8Q}&channelId={@programmingwithmosh}&part=snippet,id&order=date&maxResults=20"
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
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
              {item.videoType == "Vimeo" ? (
                <Vimeo
                  style={styles.playerStyles}
                  key={index}
                  videoId={item.videoId}
                  loop={false}
                  autoPlay={false}
                  controls={true}
                  speed={false}
                  time={"0m0s"}
                />
              ) : (
                <YoutubePlayer
                  height={hp(30)}
                  width={wp(95)}
                  forceAndroidAutoplay={false}
                  videoId={"Y274jZs5s7s"}
                  onChangeState={(state) => console.log(state)}
                />
              )}
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
    width: wp(95),
  },
  listBottomLine: {
    width: wp(100),
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginTop: hp(0.5),
    marginBottom: hp(2),
  },
});
