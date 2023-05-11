import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  Platform,
  TextInput,
  ImageBackground,
  Dimensions,
  Modal,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import BackGround from "../Components/Background";
import Ionicons from "react-native-vector-icons/Ionicons";
import BackButton from "../Components/BackButton";
import Swiper from "react-native-swiper";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Carousel, { Pagination } from "react-native-snap-carousel";
import database from "@react-native-firebase/database";
import { Update_Profile_Validations } from "../../utilis/validation";
import moment from "moment";
import { color } from "react-native-reanimated";
import style from "../../Theme/styles";
import { ScrollView } from "react-native-gesture-handler";

const Duas2 = ({ navigation, route }) => {
  let type = route.params.params.type;
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
  const findd = (text2) => {
    if (text2 == "") {
      setlist(list);
    }
    let text = text2.toLowerCase();
    let trucks = list;
    let filteredName = trucks.filter((item) => {
      return item.text.toLowerCase().includes(text);
    });
    if (!text || text === "") {
      setlist(list);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
    } else if (Array.isArray(filteredName)) {
      setlist(filteredName);
    }
  };
  const onShare = async (msg) => {
    setdisable(true);
    try {
      const result = await Share.share({
        message: msg,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      // alert(error.message);
    }
    setdisable(false);
  };
  const _renderItem = ({ item, index }) => {
    return (
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "column",
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
              // marginBottom: '50%',
              alignSelf: "flex-end",
              marginHorizontal: 10,
              backgroundColor: "#00A300",
              paddingVertical: 14,
              borderRadius: 50,
            }}
            onPress={() => {
              setdisable(true), onShare(item.arabic_text);
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
              // containerStyle={{ma}}

              ref={ref}
              extraData={refresh}
              data={arr}
              renderItem={_renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
              onSnapToItem={(index) => setactivedot(index)}
            />

            {/* <TouchableOpacity
            style={{
              marginBottom: '50%',
              alignSelf: "flex-end",
              marginHorizontal: 10,
              backgroundColor: "#00A300",
              paddingVertical: 14,
              borderRadius: 50,
            }}
            onPress={() => onShare()}
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
          </TouchableOpacity> */}
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
