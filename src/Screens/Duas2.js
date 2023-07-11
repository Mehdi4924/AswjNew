import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Share,
} from "react-native";
import BackGround from "../Components/Background";
import Ionicons from "react-native-vector-icons/Ionicons";
import BackButton from "../Components/BackButton";
import Carousel, { Pagination } from "react-native-snap-carousel";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import { ScrollView } from "react-native-gesture-handler";
// import Share from "react-native-share";

// let disable = false;
const Duas2 = ({ navigation, route }) => {
  let type = route.params.type;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [arr, setarr] = useState([]);
  const [activeDot, setactivedot] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [disable, setdisable] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  const test = () => {
    database()
      .ref(`/Duas List`)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        const dataArr = [];
        for (let key in data) {
          data[key].hashNumber = key;
          if (data[key].type.toString() == type) {
            dataArr.push(data[key]);
          }
        }
        setarr(dataArr);
      });
  };
  async function onShare(msg) {
    // await Share.share({
    //   message: msg,
    //   url: "https://play.google.com/store/apps/details?id=com.aswj",
    //   failOnCancel: true,
    //   title: "asdf",
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log("error", e);
    //   })
    //   .finally(() => {
    //     // setdisable(false);
    //   });
    Share.share(
      {
        message: "asdfa",
        url: "www.google.com",
        title: "title",
      },
      {
        // Android only:
        dialogTitle: "Share",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    ).then((result) => {
      console.log(result);
    });
  }
  console.log(disable);
  const _renderItem = ({ item, index }) => {
    return (
      <ScrollView>
        <View>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255, 0.1)",
              marginVertical: 5,
              paddingVertical: 60,
              marginHorizontal: 20,
            }}
          >
            <Text style={styles.text}>{item.arabic_text}</Text>
            <Text
              style={[
                style.forgetText,
                {
                  color: "#fff",
                  textAlign: "center",
                  marginVertical: 15,
                  fontSize: 15,
                  marginHorizontal: 50,
                },
              ]}
            >
              {item.eng_text}
            </Text>
            <Text
              style={{ color: "#fff", textAlign: "center", marginVertical: 5 }}
            >
              {item.ref}
            </Text>
          </View>

          <TouchableOpacity
            disabled={disable}
            style={{
              alignSelf: "flex-end",
              marginHorizontal: 10,
              backgroundColor: "#00A300",
              paddingVertical: 14,
              borderRadius: 50,
            }}
            delayPressIn={500}
            onPressIn={async () => {
              // setdisable(true);
              // setTimeout(() => {
              onShare(item.arabic_text);
              // }, 1000);
            }}
          >
            <Ionicons
              color={"#fff"}
              size={30}
              name={"md-share"}
              style={{
                alignSelf: "center",
                marginHorizontal: 15,
                textAlign: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Duas"}
          onPressBack={() => {
            navigation.goBack(null);
          }}
        />
        <ScrollView>
          <View>
            <Pagination
              containerStyle={{ flex: 1 }}
              dotsLength={arr.length}
              activeDotIndex={activeDot}
              dotColor={"#00A300"}
              dotStyle={{
                width: 13,
                height: 13,
                borderRadius: 10,
                marginHorizontal: 4,
              }}
              inactiveDotColor={"white"}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={ref}
              tappableDots={!!ref}
            />
            <Carousel
              ref={ref}
              extraData={refresh}
              data={arr}
              renderItem={_renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              onSnapToItem={(index) => setactivedot(index)}
            />
          </View>
        </ScrollView>
      </BackGround>
    </SafeAreaView>
  );
};

export default Duas2;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },
  child: { width, justifyContent: "center" },
  wrapper: {
    flex: 1,
    height: "50%",
  },
  text: {
    color: "#00A300",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
  dotstyle: {
    color: "red",
  },
});
