import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import BackGround from "../Components/Background";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";
import ListEmptyComponent from "../Components/ListEmptyComponent";
import Loader from "../Components/Loader";

const Camps = ({ navigation, route }) => {
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [fetching, setFetching] = useState(false);
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
        console.log("data in the list", snapshot.val());
        let data = snapshot.val();
        if (arr.length > 0) {
        } else {
          for (let key in data) {
            data[key].hashNumber = key;
            if (data[key].type == "main events") {
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
          arr.sort(function (a, b) {
            return new Date(b.start_date) - new Date(a.start_date);
          });
        }
        setRefresh(!refresh);
        setFetching(false);
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <Loader loading={fetching} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type="material-community"
              name="chevron-left"
              size={hp(4)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>ASWJ Main Events</Text>
          <View />
        </View>
        <View style={{ marginTop: 5, flex: 1 }}>
          <FlatList
            data={arr}
            onRefresh={() => test()}
            refreshing={fetching}
            extraData={refresh}
            ListEmptyComponent={<ListEmptyComponent />}
            renderItem={({ item, key }) => (
              <View style={styles.listContainer}>
                <TouchableOpacity
                  style={{ marginHorizontal: 20 }}
                  onPress={() =>
                    navigation.navigate("Sessions", {
                      key: item.hashNumber,
                      date: item.start_date,
                    })
                  }
                >
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listDate}>{item.start_date}</Text>
                  <Text style={styles.listCenter}>{item.center}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        {/* </ScrollView> */}
      </BackGround>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  listContainer: {
    justifyContent: "flex-start",
    backgroundColor: "rgba(255,255,255, 0.7)",
    marginVertical: hp(1),
    paddingVertical: hp(2),
    marginHorizontal: wp(5),
    borderRadius: 5,
  },
  listTitle: {
    color: colors.primary,
    fontSize: hp(1.8),
    fontFamily: CustomFonts.bold,
  },
  listDate: {
    color: colors.black,
    fontSize: hp(1.8),
    fontFamily: CustomFonts.regular,
    marginVertical: hp(1),
  },
  listCenter: {
    color: colors.black,
    fontSize: hp(1.5),
    fontFamily: CustomFonts.regular,
  },
});
export default Camps;
