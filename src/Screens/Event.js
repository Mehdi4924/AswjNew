import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

const Events = ({ navigation }) => {
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [arrKeys, setarrKeys] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  const pull_data = (data) => {
    if (data == "NoFilter") {
      if (arr.length == 0) {
        test();
      }
    } else if (data.length == 0) {
      if (arr.length == 0) {
        test();
      }
    } else {
      for (let index = 0; index < arr.length; index++) {
        for (let index2 = 0; index2 < data.length; index2++) {
          console.log(data[index2].hashNumber);

          if (arr[index].hashNumber == data[index2].hashNumber) {
            arrKeys.push(arr[index]);
          }
        }
      }
      setarr(arrKeys);
      setRefresh(!refresh);
    }
  };
  const test = () => {
    setFetching(true);
    database()
      .ref("/eventList")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        console.log(data,'====>>');
        let b, days, month, year;
        if (arr.length > 0) {
        } else {
          for (let key in data) {
            b = data[key].endDate;
            data[key].hashNumber = key;
            const thisDate = new Date();
            const year = `${thisDate.getFullYear()}`;
            const b = data[key]?.endDate?.split("/");
            b[2] = year.charAt(0) + year.charAt(1) + b[2];
            const finalDate = b.reverse().join("-");
            if (finalDate <= thisDate.toISOString().split("T")[0]) {
              arr.push(data[key]);
              setRefresh(!refresh);
            }
            // days = new Date().getDate();
            // month = new Date().getMonth() + 1;
            // year = new Date().getFullYear();
            // let first2, second2, third2, form, day;
            // first2 = b.substring(0, b.indexOf("/"));

            // b = b.substring(b.indexOf("/") + 1);
            // second2 = b.substring(0, b.indexOf("/"));
            // b = b.substring(b.indexOf("/") + 1, b.length);
            // third2 = b;

            // if ("2024" >= year) {
            //   let str2 = data[key].endDate;
            //   let first2, second2, third2, form2, day2;
            //   first2 = str2.substring(0, str2.indexOf("/"));
            //   str2 = str2.substring(str2.indexOf("/") + 1);
            //   second2 = str2.substring(0, str2.indexOf("/"));
            //   str2 = str2.substring(str2.indexOf("/") + 1, str2.length);
            //   third2 = str2;
            //   var event2 = new Date(
            //     Date.UTC("20" + third2, first2 - 1, second2, 3, 0, 0)
            //   );
            //   var options = { day: "numeric", year: "numeric", month: "long" };
            //   data[key].endDate = event2.toLocaleDateString("en-us", options);
            //   let str = data[key].startDate;
            //   let first, second, third;
            //   first = str.substring(0, str.indexOf("/"));
            //   str = str.substring(str.indexOf("/") + 1);
            //   second = str.substring(0, str.indexOf("/"));
            //   str = str.substring(str.indexOf("/") + 1, str.length);
            //   third = str;
            //   var event = new Date(
            //     Date.UTC("20" + third, first - 1, second, 3, 0, 0)
            //   );
            //   var options = { day: "numeric", year: "numeric", month: "long" };
            //   data[key].startDate = event.toLocaleDateString("en-us", options);
            //   if (third2 > month) {
            //     arr.push(data[key]);
            //     setRefresh(!refresh);
            //   } else if (third2 == month) {
            //     if (first2 >= days) {
            //       arr.push(data[key]);
            //       setRefresh(!refresh);
            //     }
            //   }
            // }
          }
        }
      });
    setFetching(false);
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Events"}
          onPressBack={() => navigation.navigate("Home")}
          filter={true}
          TestingFunc={pull_data}
          backIcon
          containerStyles={styles.backButtonContainer}
          headerText={{
            color: colors.primary,
          }}
          filterIconColor={colors.primary}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={arr}
            onRefresh={() => test()}
            refreshing={fetching}
            contentContainerStyle={styles.listContentContainer}
            extraData={refresh}
            renderItem={({ item, key }) => {
              return (
                <View style={styles.listContainer}>
                  <Image
                    style={styles.listLogo}
                    source={
                      item?.imageUrl?.length < 1
                        ? require("../../Assets/fb_logo.jpg")
                        : { uri: item.imageUrl[0] }
                    }
                  />
                  <View style={{ width: "65%" }}>
                    <Text style={styles.listHeadingText}>{item.title}</Text>
                    <Text style={styles.listDate}>{item.startDate}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("eventDetail", {
                        data: item,
                      });
                    }}
                  >
                    <Text style={styles.listViewButton}>View</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </BackGround>
    </SafeAreaView>
  );
};

export default Events;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  backButtonContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  listContentContainer: {
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
    paddingBottom: hp(8),
  },
  listContainer: {
    backgroundColor: "rgba(255,255,255, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: hp(0.5),
    paddingVertical: hp(1),
    borderRadius: 5,
    paddingHorizontal: wp(3),
  },
  listLogo: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(4),
  },
  listHeadingText: {
    color: colors.white,
    fontSize: hp(1.6),
    fontFamily: CustomFonts.bold,
  },
  listDate: {
    color: "rgba(255,255,255,0.5)",
    fontSize: hp(1.8),
    fontFamily: CustomFonts.regular,
    marginTop: hp(0.5),
  },
  listViewButton: {
    color: colors.primary,
    fontSize: hp(1.6),
    fontFamily: CustomFonts.bold,
  },
});
