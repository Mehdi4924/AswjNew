import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  getVideos,
  getVideosFromYoutTube,
} from "../../utilis/Api/Api_controller";
import { Icon } from "@rneui/base";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import ListEmptyComponent from "../Components/ListEmptyComponent";
import YoutubePlayer from "react-native-youtube-iframe";
import Share from "react-native-share";

let allDataresponse = [];
export default function YouTubeAllVideos(props) {
  const [videos, setVideos] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    GetVideosFromYoutube();
  }, []);
  async function GetVideosFromYoutube() {
    await getVideosFromYoutTube(1, 100)
      .then((res) => {
        console.log("videos from youtube", res.data.items);
        if (res?.data?.items?.length > 0) {
          setVideos(res.data.items);
          allDataresponse = res.data.items;
        }
      })
      .catch((err) => {
        console.log("error getting videos from youtube", err);
      })
      .finally(() => {
        setFetching(false);
      });
  }
  function onShare(item) {
    const url =
      item.type == "Youtube"
        ? "Watch Aswj Youtube video \n https://www.youtube.com/watch?v=" +
          item.id
        : "Watch Aswj Vimeo video " + item.link;
    Share.open({
      message: url,
      url: url,
    }).then((res) => {
      console.log(res);
    });
  }
  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.listContainer} key={item?.etag || index}>
        <Text style={styles.listHeadingStyles}>{item.name}</Text>
        <YoutubePlayer
          height={hp(27)}
          width={wp(93)}
          forceAndroidAutoplay={false}
          videoId={item?.id?.videoId}
          onChangeState={(state) => console.log(state)}
        />
        <View style={styles.listBottomContainer}>
          <View style={styles.shareContainer}>
            <Icon
              name={"youtube"}
              type="material-community"
              size={hp(1.8)}
              style={styles.iconStyles}
              color={colors.white}
            />
            <Text style={styles.shareText}>You Tube</Text>
          </View>
          <TouchableOpacity
            onPress={() => onShare(item)}
            style={[styles.shareContainer, { justifyContent: "flex-end" }]}
          >
            <Text style={styles.shareText}>Share</Text>
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
        <Text style={styles.headerText}>Vimeo Videos</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.goBackContainer}
      >
        <Icon
          type="material-community"
          name="chevron-left"
          size={hp(3)}
          color={colors.white}
        />
        <Text style={styles.goHomeText}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.textInputView}>
        <TextInput
          placeholder="Search Video Title"
          placeholderTextColor={colors.black}
          value={searchText}
          onChangeText={(text) => {
            if (text.length > searchText.length) {
              let a =
                videos?.length > 0
                  ? videos?.filter((item) =>
                      item?.snippet?.title
                        ?.toLowerCase()
                        ?.includes(text?.toLowerCase())
                    )
                  : null;
              setVideos(a);
            } else {
              setVideos(allDataresponse);
            }
            setSearchText(text);
          }}
          style={styles.textInputStyles}
        />
        <TouchableOpacity
          onPress={() => {
            setVideos(allDataresponse);
            setSearchText("");
          }}
        >
          <Icon
            name={"close"}
            type="material-community"
            size={hp(2)}
            reverse
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => item.etag}
        ListEmptyComponent={fetching ? null : <ListEmptyComponent />}
        contentContainerStyle={{ paddingVertical: hp(2), paddingBottom: hp(8) }}
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
    marginRight: wp(5),
  },
  goBackContainer: {
    width: wp(90),
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: hp(2),
  },
  goHomeText: {
    fontFamily: CustomFonts.bold,
    color: colors.white,
    fontSize: hp(2),
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2.5),
  },
  textInputStyles: {
    backgroundColor: "rgba(255,255,255,0.7)",
    width: wp(80),
    alignSelf: "center",
    color: colors.black,
    borderRadius: 5,
    paddingHorizontal: wp(4),
    fontFamily: CustomFonts.bold,
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
});
