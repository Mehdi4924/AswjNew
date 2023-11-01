import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { hp, wp } from "../../utilis/Responsive";
import { Vimeo } from "react-native-vimeo-iframe";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from "@rneui/base";
import {
  getVideos,
  getVideosFromYoutTube,
} from "../../utilis/Api/Api_controller";
import database from "@react-native-firebase/database";
import ListEmptyComponent from "../Components/ListEmptyComponent";
import Loader from "../Components/Loader";
import Share from "react-native-share";
import GetTimings from "../Services/GetTimings";

let List = [];
let pageNo = 1;
let prevData = [];
let currentscrollOffset = 0;
export default function Home(props) {
  const [finalList, setFinalList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [namazTimings, setNamazTimings] = useState();
  const [defaultMasjid, setDefaultMasjid] = useState();
  const [eventList, setEventList] = useState([]);

  const flatListRef = useRef();
  useEffect(() => {
    getTime();
    ResolveAllPromises();
    const unsubscribe = props.navigation.addListener("tabPress", (e) => {
      if (currentscrollOffset != 0) {
        e.preventDefault();
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        currentscrollOffset = 0;
      }
    });
    return unsubscribe;
  }, []);
  function getTime() {
    GetTimings((res) => {
      setNamazTimings(res.timings)
      setDefaultMasjid(res.center)
    })
  }
  async function ResolveAllPromises() {
    setFetching(true);
    await Promise.all([
      getDataFromVimeo(),
      GetVideosFromYoutube(),
      GetEvents(),
      GetDuas(),
    ]).then((res) => {
      console.log("promise all resolving", List);
      if (List.length > 0) {
        const shuffled = shuffle(List);
        setFinalList([...prevData, ...shuffled]);
      }
      setFetching(false);
    });
  }
  const getDataFromVimeo = async () => {
    await getVideos(pageNo)
      .then((res) => {
        console.log("success getting videos from vimeo", res);
        if (res.data.length > 1) {
          const finalData = res?.data?.map((item) => {
            return { ...item, type: "Vimeo", id: item.uri };
          });
          List = [...List, ...finalData];
        }
      })
      .catch((err) => {
        console.log("error getting videos from vimeo", err);
      })
      .finally(function () { });
  };
  async function GetVideosFromYoutube() {
    await getVideosFromYoutTube(pageNo)
      .then((res) => {
        console.log("videos from youtube", res.data.items);
        if (res?.data?.items?.length > 0) {
          const newArr = [];
          res?.data?.items.map((item) => {
            if (item?.id?.videoId) {
              newArr.push({ ...item, type: "Youtube", id: item.id.videoId });
            }
          });
          newArr.splice(0, (pageNo - 1) * 10);
          List = [...List, ...newArr];
        }
      })
      .catch((err) => {
        console.log("error getting videos from youtube", err);
      });
  }
  async function GetDuas() {
    database()
      .ref("/DuaType List")
      .limitToFirst(pageNo * 10)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        console.log("success getting duas", data);
        const arrOfDuas = [];
        for (let key in data) {
          arrOfDuas.push({
            ...data[key],
            type: "Dua",
            hashNumber: key,
          });
        }
        if (arrOfDuas.length > 0) {
          const newArr = [];
          arrOfDuas.map((item) => {
            const index = finalList.findIndex(
              (finalListItem) =>
                finalListItem.type == "Dua" && finalListItem.id == item.id
            );
            if (index == -1) {
              newArr.push(item);
            }
          });
          List = [...List, ...newArr];
        }
      });
  }
  async function GetEvents() {
    database()
      .ref("/eventList")
      .limitToFirst(pageNo * 10)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        console.log("success getting events", data);
        const arrOfEvents = [];
        for (let key in data) {
          let b = data[key]?.endDate;
          data[key].hashNumber = key;
          const thisDate = new Date();
          const year = `${thisDate.getFullYear()}`;
          b = data[key]?.endDate?.split("/");
          b[2] = year?.charAt(0) + year?.charAt(1) + b[2];
          const finalDate = b.reverse().join("-");
          if (finalDate >= thisDate.toISOString().split("T")[0]) {
            arrOfEvents.push({ ...data[key], id: key, type: "Event" });
          }
        }
        if (arrOfEvents.length > 0) {
          const newArr = [];
          arrOfEvents.map((item) => {
            const index = eventList.findIndex(
              (finalListItem) =>
                finalListItem.type == "Event" && finalListItem.id == item.id
            );
            if (index == -1) {
              newArr.push(item);
            }
          });
          setEventList([...eventList, ...newArr])
        }
      });
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = hp("2%");
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  async function onShare(item) {
    const url =
      item.type == "Youtube"
        ? "Watch Aswj Youtube video \n https://www.youtube.com/watch?v=" +
        item.id
        : "Watch Aswj Vimeo video " + item.link;
    await Share.open({
      message: url,
      url: url,
    }).then((res) => {
      console.log(res);
    });
  }
  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.listContainer} key={item?.id || index}>
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
        ) : (
          <>
            <Text style={styles.listHeadingStyles}>{item.name}</Text>
            {item.type == "Vimeo" ? (
              <Vimeo
                style={styles.playerStyles}
                key={index}
                videoId={item.uri.split("/")[2]}
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
                videoId={item?.id}
                onChangeState={(state) => null}
              />
            )}
            <View style={styles.listBottomContainer}>
              <TouchableOpacity
                style={styles.shareContainer}
                onPress={() =>
                  item.type == "Vimeo"
                    ? props.navigation.navigate("VimeoAllVideos")
                    : props.navigation.navigate("YouTubeAllVideos")
                }
              >
                <Icon
                  name={item.type == "Vimeo" ? "vimeo" : "youtube"}
                  type="material-community"
                  size={hp(1.8)}
                  style={styles.iconStyles}
                  color={colors.white}
                />
                <Text style={styles.shareText}>View All Videos</Text>
              </TouchableOpacity>
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
          </>
        )}
      </View>
    );
  }, []);
  const ListHeadItems = () => {
    return (
      <>
        <View style={{ flex: 1 }}>
          {!!namazTimings &&
            <>
              <Text style={styles.headerMainText}>Prayer Timings ({defaultMasjid?.name || ""})</Text>
              <View style={styles.listHeader}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.thickHeader}>Fajar</Text>
                  <Text style={styles.timingText}>{namazTimings.Fajar} AM</Text>
                  <Text style={styles.timingText}>{namazTimings.Fajar_Iqamah} AM</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.thickHeader}>Dhuhr</Text>
                  <Text style={styles.timingText}>{namazTimings.Dhuhr} PM</Text>
                  <Text style={styles.timingText}>{namazTimings.Dhuhr_Iqamah} PM</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.thickHeader}>Asar</Text>
                  <Text style={styles.timingText}>{namazTimings.Asar} PM</Text>
                  <Text style={styles.timingText}>{namazTimings.Asar_Iqamah} PM</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.thickHeader}>Maghrib</Text>
                  <Text style={styles.timingText}>{namazTimings.Maghrib} PM</Text>
                  <Text style={styles.timingText}>{namazTimings.Maghrib_Iqamah} PM</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.thickHeader}>Isha</Text>
                  <Text style={styles.timingText}>{namazTimings.Isha} PM</Text>
                  <Text style={styles.timingText}>{namazTimings.Isha_Iqamah} PM</Text>
                </View>
              </View>
            </>
          }
          {eventList && eventList.length > 0 &&
            <>
              <Text style={styles.headerMainText}>Event Notifications</Text>
              {eventList.map(item => {
                return (
                  < TouchableOpacity
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
                      <Text style={styles.listHeadingText}>{item?.title}</Text>
                      <Text style={styles.listDate}>{item?.startDate}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </>
          }
          <Text style={styles.headerMainText}>Scroll For Updates</Text>
        </View >
      </>

    )
  }
  console.log('namaz timings', namazTimings, defaultMasjid);
  return (
    <ImageBackground
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
      style={styles.container}
    >
      <Loader loading={fetching} />
      <View style={styles.header}>
        <Image
          source={require("../../Assets/fb_logo.jpg")}
          style={{ height: hp(6), width: wp(20) }}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>ASWJ-Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
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
        data={finalList}
        ref={(ref) => (flatListRef.current = ref)}
        key={(item, index) => item.id}
        ListEmptyComponent={fetching ? null : <ListEmptyComponent />}
        ListHeaderComponent={<ListHeadItems />}
        extraData={List}
        removeClippedSubviews={true}
        maxToRenderPerBatch={50}
        updateCellsBatchingPeriod={100}
        contentContainerStyle={{ paddingVertical: hp(2), paddingBottom: hp(8) }}
        renderItem={renderItem}
        onScroll={({ nativeEvent }) => {
          currentscrollOffset = nativeEvent.contentOffset.y;
          if (isCloseToBottom(nativeEvent)) {
            pageNo = pageNo + 1;
            List = [];
            prevData = [...finalList];
            ResolveAllPromises();
          }
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
    backgroundColor: colors.white,
    marginVertical: hp(0.5),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(95),
    alignItems: "center",
    alignSelf: "center"
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
  headerMainText: {
    color: colors.white,
    fontFamily: CustomFonts.bold,
    alignSelf: "center",
    fontSize: hp(2.2),
    marginVertical: hp(0.5)
  },
  //list header styles
  timingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255, 0.5)",
    marginVertical: hp(0.5),
    paddingVertical: hp(1),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
  timingText: {
    fontFamily: CustomFonts.regular,
    color: colors.black,
    fontSize: hp(1.5),
    marginVertical: hp(0.5)
  },
  listHeader: {
    backgroundColor: "rgba(255,255,255,0.7)",
    marginHorizontal: wp(2.5),
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    marginVertical: hp(1)
  },
  thickHeader: {
    fontSize: hp(1.5),
    fontFamily: CustomFonts.bold,
    color: colors.primary,
    alignSelf: "center",
    fontSize: 14,
  },
});
// Rux9r_?A_i!aZvK
