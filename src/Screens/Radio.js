import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import BackGround from "../Components/Background";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from "../../Theme/styles";

import BackButton from "../Components/BackButton";
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

  // await TrackPlayer.add(playlistData);
  await TrackPlayer.add({
    url: "http://s9.viastreaming.net:9645/stream;stream.mp3",
    title: "ASWJ Radio",
    artist: "Live Stream",
  });

  TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
const Radio = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [Name, onChangeName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setError] = useState(null);
  const [expTIme, setExpTime] = useState(null);
  const [text, settext] = useState("Select Mosques");
  const [isloading, setisloading] = useState(false);
  const [inputBorder, setinputBorder] = useState(false);
  const [search, setsearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [searchIt, setsearchIt] = useState(false);
  const [play, setplay] = useState(false);
  const [paused, setPaused] = useState(true);
  const playbackState = usePlaybackState();

  const [playerState, setPlayerState] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [list, setlist] = useState([
    {
      title: "ASWJ Anual Conference",
      date: "27 january, 2022",
      text: "ASWJ Australia",
    },
    {
      title: "sadsa",
      date: "27 january, 2022",
      text: "Youth Center",
    },
    {
      title: "dsadsa",
      date: "25 january, 2022",
      text: "Youth Center",
    },
    {
      title: "Masjid As Salaam",
      date: "27 january, 2022",
      text: "Masjid As-Salaam",
    },
    {
      title: "ASWJ Auburn",
      date: "27 january, 2022",
      text: "ASWJ Album",
    },
  ]);
  useEffect(() => {
    setupIfNecessary();
  }, []);
  const onEnd = () => {
    setPlayerState(false), setPaused(true);
  };
  const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      // TODO: Perhaps present an error or restart the playlist?
    } else {
      // alert(State.pla)
      if (playbackState==State.Playing) {
        // alert(State.Paused)
        await TrackPlayer.pause();
        // alert(playbackState)
        // console.log(playbackState,'playbackState');

        // alert(playbackState)

        // setPlayerState()
      } else {
        // alert(State.Playing)
        await TrackPlayer.play();
        // alert(playbackState)
        // console.log(playbackState,'playbackState');

        // alert(playbackState)

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
          style={{
            width: "50%",
            height: "30%",
            alignSelf: "center",
            marginVertical: '20%',
          }}
        ></Image>
        <TouchableOpacity
          style={{
            marginBottom: 50,
            alignSelf: "center",
            marginHorizontal: 10,
            backgroundColor: "#274472",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 50,
          }}
          onPress={() => {
            togglePlayback(playbackState);
          }}
        >
          {playbackState == 'playing' ? (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-stop"}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ) : playbackState=='paused' ?(
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-play"}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ): playbackState==3 ? 
          (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-stop"}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ) 
          :
          (
            <Entypo
              color={"#fff"}
              size={30}
              name={"controller-play"}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          )
          }
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "absolute",
            height: 40,
            left: 0,
            // top: windowHeight - 60,
            bottom:0,
            width: windowWidth,
          }}
        >
          <EvilIcons
            onPress={() =>
              Linking.openURL("https://www.facebook.com/albayanradio/")
            }
            color={"#000"}
            size={27}
            name={"sc-facebook"}
            style={{
              alignSelf: "center",
              marginHorizontal: 15,
              textAlign: "center",
            }}
          />
          <Ionicons
            onPress={() => Linking.openURL(`tel:${"0297406160"}`)}
            color={"#000"}
            size={20}
            name={"call"}
            style={{
              alignSelf: "center",
              marginHorizontal: 15,
              textAlign: "center",
            }}
          />

          <MaterialCommunityIcons
            color={"#000"}
            onPress={() => Linking.openURL("mailto:info@albayan.com.au?")}
            size={20}
            name={"email"}
            style={{
              alignSelf: "center",
              marginHorizontal: 15,
              textAlign: "center",
            }}
          />
          <AntDesign
            onPress={() =>
              Linking.openURL("https://www.youtube.com/c/AlbayanRadioAustralia")
            }
            color={"#000"}
            size={20}
            name={"youtube"}
            style={{
              alignSelf: "center",
              marginHorizontal: 15,
              textAlign: "center",
            }}
          />
          <FontAwesome5
            onPress={() =>
              Linking.openURL("https://albayanradio.podbean.com/mobile/")
            }
            color={"#00A300"}
            size={15}
            name={"wifi"}
            style={{
              alignSelf: "center",
              marginHorizontal: 15,
              textAlign: "center",
            }}
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
});
