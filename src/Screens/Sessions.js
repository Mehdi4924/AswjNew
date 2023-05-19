import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import BackGround from "../Components/Background";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import { Icon } from "@rneui/base";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";

const Sessions = ({ navigation, route }) => {
  let key = route.params.params.key;
  let date = route.params.params.date;
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (arr.length == 0) {
      test(key);
    }
  }, []);
  const test = () => {
    database()
      .ref("/Schedule List")
      .on("value", (snapshot) => {
        let data = snapshot.child(key).val();
        console.log(data, "data");
        for (let key in data) {
          data[key].hashNumber = key;
          arr.push(data[key]);
        }
        setRefresh(!refresh);

        console.log(arr);
      });
  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              type="material-community"
              name="chevron-left"
              size={hp(4)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Sessions</Text>
          <View />
        </View>
        <Text style={styles.topText}>{date}</Text>
        <FlatList
          data={arr}
          extraData={refresh}
          renderItem={({ item, key }) => (
            <View>
              <View style={styles.listContainer}>
                <Text style={styles.listTime}>
                  {item.start_time + " "}-{" " + item.end_time}
                </Text>
              </View>
              <Text style={styles.listTitle}>{item.title}</Text>
              <TouchableHighlight
                underlayColor={"rgba(0,163,0,0.2)"}
                style={{ flex: 1, alignSelf: "flex-start" }}
                onPress={() =>
                  navigation.navigate("SessionDetail", {
                    data: item,
                    date: date,
                  })
                }
              >
                <Text style={styles.detailsButton}>DETAILS</Text>
              </TouchableHighlight>
            </View>
          )}
        />
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
  topText: {
    color: colors.white,
    fontSize: hp(2),
    marginHorizontal: wp(6),
    marginVertical: hp(2),
    fontFamily: CustomFonts.bold,
  },
  listContainer: {
    justifyContent: "flex-start",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginVertical: 25,
    paddingVertical: 15,
  },
  listTime: {
    color: colors.white,
    fontSize: hp(1.8),
    marginHorizontal: wp(10),
    fontFamily: CustomFonts.bold,
  },
  listTitle: {
    color: colors.white,
    fontSize: hp(1.8),
    marginHorizontal: wp(10),
    fontFamily: CustomFonts.bold,
  },
  detailsButton: {
    color: colors.primary,
    fontSize: hp(1.5),
    marginHorizontal: wp(10),
    marginVertical: hp(2),
    fontFamily: CustomFonts.bold,
    letterSpacing: 1,
  },
});
export default Sessions;
