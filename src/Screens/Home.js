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
import React, { useCallback, useEffect, useState } from "react";
import { hp, wp } from "../../utilis/Responsive";
import { Vimeo } from "react-native-vimeo-iframe";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from "@rneui/base";
import { getVideos } from "../../utilis/Api/Api_controller";

export default function Home(props) {
  const [List, setList] = useState([
    {
      videoId: "806710332",
      isPlaying: false,
      type: "Vimeo",
    },
    {
      created_By: "2021-06-28T10:14:20.854Z",
      hashNumber: "-McEl9ZAJCUZw_IGKnDE",
      id: 19,
      name: "Supplication for breaking fast	",
      type: "Dua",
    },
    {
      address: " ",
      category: "Others",
      centre: "-Lh0EeivHRSJjYjkTyq6",
      description: " ",
      endDate: "3/21/21",
      endTime: "3:00 PM",
      facebook: true,
      hashNumber: "144455004192109",
      imageUrl: [
        "https://firebasestorage.googleapis.com/v0/b/aswj-companion-3c915.appspot.com/o/eventImages%2F23167687_601567086704458_1965015707612405337_n.jpg?alt=media&token=900f8654-63d2-4b8c-8670-ea4ca4df1f09",
      ],
      latitude: -33.9366684,
      longitude: 151.0191345,
      registrationFee: "",
      speakers: ["None"],
      sponsers: ["None"],
      startDate: "3/21/21",
      startTime: "10:00 AM",
      title: "ASWJ Revesby Market Day",
      type: "Event",
    },
    {
      videoId: "https://www.youtube.com/watch?v=SqcY0GlETPk",
      isPlaying: false,
      type: "Youtube",
    },
    {
      videoId: "Y274jZs5s7s",
      isPlaying: false,
      type: "Youtube",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      type: "Vimeo",
    },
    {
      videoId: "806710332",
      isPlaying: false,
      type: "Vimeo",
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
        // console.log(
        //   "success getting videos",
        //   JSON.stringify(res.data, null, 4)
        // );
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
  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.listContainer} key={index}>
        {item.type == "Dua" ? (
          <>
            <TouchableOpacity
              style={styles.listSubView}
              onPress={() =>
                props.navigation.navigate("Duas2", { type: item.id })
              }
            >
              <Text style={styles.itemNumberText}>Dua</Text>
              <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>
          </>
        ) : item.type == "Event" ? (
          <TouchableOpacity
            style={styles.eventContainer}
            onPress={() => {
              props.navigation.navigate("eventDetail", {
                data: item,
              });
            }}
          >
            <Image
              style={styles.listLogo}
              source={
                item?.imageUrl?.length < 1
                  ? require("../../Assets/fb_logo.jpg")
                  : { uri: item.imageUrl[0] }
              }
            />
            <View style={{ width: "82%" }}>
              <Text style={styles.listHeadingText}>{item.title}</Text>
              <Text style={styles.listDate}>{item.startDate}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.listHeadingStyles}>
              The Disease And The Cure, Part 46 - Farhan Bin Rafee
            </Text>
            {item.type == "Vimeo" ? (
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
                height={hp(27)}
                width={wp(93)}
                forceAndroidAutoplay={false}
                videoId={"Y274jZs5s7s"}
                onChangeState={(state) => console.log(state)}
              />
            )}
            <View style={styles.listBottomContainer}>
              <View style={styles.shareContainer}>
                <Icon
                  name={item.type == "Vimeo" ? "vimeo" : "youtube"}
                  type="material-community"
                  size={hp(1.8)}
                  style={styles.iconStyles}
                  color={colors.white}
                />
                <Text style={styles.shareText}>
                  {item.type == "Vimeo" ? "Vimeo" : "YouTube"}
                </Text>
              </View>
              <View style={styles.shareContainer}>
                <Text style={styles.shareText}>Share This Video</Text>
                <TouchableOpacity onPress={() => null}>
                  <Icon
                    name="share-variant"
                    type="material-community"
                    size={hp(1)}
                    reverse
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }, []);
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
        extraData={List}
        contentContainerStyle={{ paddingVertical: hp(2) }}
        renderItem={renderItem}
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
    width: wp(95),
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    marginVertical: hp(0.5),
    paddingVertical: hp(1),
    borderRadius: 5,
  },
  playerStyles: {
    backgroundColor: "transparent",
    width: wp(95),
    height: hp(27),
  },
  listHeadingStyles: {
    fontFamily: CustomFonts.bold,
    color: colors.black,
    width: wp(90),
    marginBottom: hp(1),
  },
  listBottomContainer: {
    width: wp(90),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shareContainer: {
    width: wp(40),
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyles: {
    width: hp(3),
    height: hp(3),
    borderRadius: hp(3),
    marginRight: wp(2),
    backgroundColor: colors.black,
    justifyContent: "center",
  },
  shareText: {
    fontFamily: CustomFonts.regular,
    color: colors.black,
  },
  listSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(90),
    alignItems: "center",
  },
  itemNumberText: {
    borderRadius: 100,
    backgroundColor: colors.black,
    color: colors.white,
    fontSize: hp(1.5),
    padding: wp(2),
    fontFamily: CustomFonts.bold,
  },
  listText: {
    color: colors.black,
    width: wp(75),
    fontSize: hp(2),
    fontFamily: CustomFonts.regular,
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(90),
    alignItems: "center",
  },
  listLogo: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(4),
  },
  listHeadingText: {
    color: colors.black,
    fontSize: hp(1.6),
    fontFamily: CustomFonts.bold,
  },
  listDate: {
    color: colors.black,
    fontSize: hp(1.8),
    fontFamily: CustomFonts.regular,
  },
  listViewButton: {
    color: colors.primary,
    fontSize: hp(1.6),
    fontFamily: CustomFonts.bold,
  },
});
// Rux9r_?A_i!aZvK
