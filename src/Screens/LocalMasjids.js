import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import Loader from "../Components/Loader";

const LocalMasjids = ({ navigation }) => {
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [arrKeys, setarrKeys] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [arr2, setarr2] = useState([]);

  const pull_data = (data) => {
    if (data == "NoFilter") {
      setarr(arr2);
    } else {
      setarrKeys([]);
      for (let index = 0; index < data.length; index++) {
        for (let index2 = 0; index2 < arr2.length; index2++) {
          if (arr2[index2].center == data[index].name) {
            arrKeys.push(arr2[index2]);
          }
        }
      }
      setarr([]);
      setarr(arrKeys);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  const test = () => {
    setFetching(true);
    database()
      .ref("/Conference List")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        if (arr.length > 0) {
        } else {
          for (let key in data) {
            data[key].hashNumber = key;
            if (data[key].type == "lessons") {
              let str = data[key].start_date;
              let first, second, third, form, month;
              first = str.substring(0, str.indexOf("/"));
              str = str.substring(str.indexOf("/") + 1);
              second = str.substring(0, str.indexOf("/"));
              str = str.substring(str.indexOf("/") + 1, str.length);
              third = str;
              month = first - 1;
              var event = new Date(
                Date.UTC("20" + third, month, second, 3, 0, 0)
              );
              var options = { day: "numeric", year: "numeric", month: "long" };
              data[key].start_date = event.toLocaleDateString("en-us", options);
              arr.push(data[key]);
            }
          }
          setarr(
            arr.sort(function (a, b) {
              var dateA = new Date(a.start_date).getFullYear();
              var dateB = new Date(b.start_date).getFullYear();
              return dateA < dateB ? 1 : -1;
            })
          );
        }
        setRefresh(!refresh);
        setFetching(false);
        setarr2(arr);
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <Loader loading={fetching} />
        <BackButton
          title={"Masjid Lessons"}
          onPressBack={() => navigation.goBack()}
          filter={true}
          TestingFunc={pull_data}
        />
        <FlatList
          data={arr}
          extraData={refresh}
          onRefresh={() => test()}
          refreshing={fetching}
          renderItem={({ item, key }) => (
            <View style={styles.listContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Sessions", {
                    key: item.hashNumber,
                    date: item.start_date,
                  })
                }
              >
                <Text style={styles.listHeading}>{item.title}</Text>
                <Text style={styles.listSubText}>{item.start_date}</Text>
                <Text style={styles.listText}>{item.center}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </BackGround>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginVertical: hp(0.5),
    paddingVertical: hp(1),
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
  listHeading: {
    color: colors.primary,
    fontSize: hp(2),
    marginVertical: hp(0.5),
    fontFamily: CustomFonts.bold,
  },
  listSubText: {
    color: colors.black,
    fontSize: hp(1.5),
    fontFamily: CustomFonts.regular,
  },
  listText: {
    color: colors.white,
    marginVertical: hp(0.5),
    fontSize: hp(2),
    fontFamily: CustomFonts.regular,
  },
});
export default LocalMasjids;
