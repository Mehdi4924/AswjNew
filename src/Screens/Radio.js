import React, { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import BackGround from "../Components/Background";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
} from "react-native-track-player";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../Theme/styles";

import BackButton from "../Components/BackButton";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
const setupIfNecessary = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [Capability.Play, Capability.Pause],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
  await TrackPlayer.add({
    url: "http://s9.viastreaming.net:9645/stream;stream.mp3",
    title: "ASWJ Radio",
    artist: "Live Stream",
  });

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
const Radio = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const playbackState = usePlaybackState();
  useEffect(() => {
    setupIfNecessary();
  }, []);
  const togglePlayback = async (playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
    } else {
      if (playbackState == State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Radio"}
          onPressBack={() => navigation.navigate("Home")}
        />
        <Image
          source={require("../../Assets/AlBayan.png")}
          style={styles.radioImage}
        />
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            togglePlayback(playbackState);
          }}
        >
          {playbackState == "playing" ? (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-stop"}
              style={styles.stopIcon}
            />
          ) : playbackState == "paused" ? (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-play"}
              style={styles.stopIcon}
            />
          ) : playbackState == 3 ? (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-stop"}
              style={styles.stopIcon}
            />
          ) : (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-play"}
              style={styles.stopIcon}
            />
          )}
        </TouchableOpacity>
        <View style={styles.bottomButtonsView}>
          <EvilIcons
            onPress={() =>
              Linking.openURL("https://www.facebook.com/albayanradio/")
            }
            color={colors.black}
            size={27}
            name={"sc-facebook"}
            style={styles.bottomButtons}
          />
          <Ionicons
            onPress={() => Linking.openURL(`tel:${"0297406160"}`)}
            color={colors.black}
            size={20}
            name={"call"}
            style={styles.bottomButtons}
          />
          <MaterialCommunityIcons
            color={colors.black}
            onPress={() => Linking.openURL("mailto:info@albayan.com.au?")}
            size={20}
            name={"email"}
            style={styles.bottomButtons}
          />
          <AntDesign
            onPress={() =>
              Linking.openURL("https://www.youtube.com/c/AlbayanRadioAustralia")
            }
            color={colors.black}
            size={20}
            name={"youtube"}
            style={styles.bottomButtons}
          />
          <FontAwesome5
            onPress={() =>
              Linking.openURL("https://albayanradio.podbean.com/mobile/")
            }
            color={colors.primary}
            size={15}
            name={"wifi"}
            style={styles.bottomButtons}
          />
        </View>
      </BackGround>
    </SafeAreaView>
  );
};

export default Radio;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "50%",
    marginBottom: 50,
  },
  text: {
    color: "#00A300",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  dotstyle: {
    color: "red",
  },
  radioImage: {
    width: wp(50),
    height: hp(30),
    alignSelf: "center",
    marginVertical: "20%",
  },
  playButton: {
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: wp(3),
  },
  stopIcon: {
    alignSelf: "center",
    textAlign: "center",
  },
  bottomButtonsView: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    height: hp(5),
    left: 0,
    bottom: hp(8),
    width: wp(100),
  },
  bottomButtons: {
    alignSelf: "center",
    marginHorizontal: 15,
    textAlign: "center",
  },
});
