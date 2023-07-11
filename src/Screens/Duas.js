import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackGround from "../Components/Background";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import database from "@react-native-firebase/database";
import style from "../../Theme/styles";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";

const Duas = ({ navigation }) => {
  const [search, setsearch] = useState("");
  const [searchIt, setsearchIt] = useState(false);
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  const test = () => {
    setFetching(true);
    database()
      .ref("/DuaType List")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        if (arr.length > 0) {
        } else {
          for (let key in data) {
            data[key].hashNumber = key;
            arr.push(data[key]);
            setRefresh(!refresh);
          }
          arr.sort((a, b) => a.id - b.id);
        }
      });
    setData2(arr);
    setFetching(false);
  };
  const findd = (text2) => {
    if (text2 == "") {
      setarr(data2);
    }
    let text = text2.toLowerCase();
    let trucks = arr;
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().includes(text);
    });
    if (!text || text === "") {
      setarr(data2);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
    } else if (Array.isArray(filteredName)) {
      setarr(filteredName);
    }
  };
  console.log(arr);
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <View style={styles.header}>
          <Image
            source={require("../../Assets/fb_logo.jpg")}
            style={{ height: hp(6), width: wp(15) }}
            resizeMode="contain"
          />
          {searchIt ? (
            <View style={styles.searchBar}>
              <FontAwesome5
                color={colors.primary}
                size={hp(2)}
                name={"search"}
              />
              <TextInput
                placeholderTextColor={colors.black}
                placeholder={"Search"}
                value={search}
                style={styles.searchInputStyles}
                onChangeText={(t) => {
                  setsearch(t), findd(t);
                }}
              />
            </View>
          ) : (
            <>
              <Text style={styles.headerText}>ASWJ-Home</Text>
            </>
          )}
          <FontAwesome
            onPress={() => setsearchIt(!searchIt)}
            color={colors.primary}
            size={hp(3)}
            name={searchIt ? "search-minus" : "search"}
            style={styles.searchIcon}
          />
        </View>
        <FlatList
          data={arr}
          onRefresh={() => test()}
          contentContainerStyle={{ paddingBottom: hp(8) }}
          refreshing={fetching}
          renderItem={({ item, key }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Duas2", { type: item.id })}
              style={styles.listContainer}
            >
              <View style={styles.listSubView}>
                <Text style={[style.lightheader, styles.itemNumberText]}>
                  {item.id}
                </Text>
              </View>
              <Text style={[style.lightheader, styles.listText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
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
    width: wp(70),
    textAlign: "center",
  },
  searchView: {
    flexDirection: "row",
    paddingVertical: wp(2),
    backgroundColor: "rgba(112,128,144,0.04)",
  },
  searchBar: {
    height: hp(6),
    width: wp(70),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: wp(2),
  },
  searchInputStyles: {
    color: colors.black,
    flex: 1,
    fontFamily: CustomFonts.regular,
  },
  headerContainer: { flex: 1, flexDirection: "row" },
  headerStyles: {
    color: colors.white,
    fontSize: hp(1.8),
    marginHorizontal: wp(5),
    fontFamily: CustomFonts.bold,
    letterSpacing: 1,
  },
  searchIcon: { flex: 1, textAlign: "right", marginHorizontal: wp(4) },
  listContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginVertical: hp(1),
    paddingVertical: wp(5),
  },
  listSubView: {
    borderRadius: 100,
    backgroundColor: colors.white,
    marginHorizontal: wp(5),
  },
  itemNumberText: {
    color: colors.primary,
    fontSize: hp(1.5),
    padding: wp(5),
    fontFamily: CustomFonts.bold,
    borderBottomLeftRadius: 5,
  },
  listText: {
    color: colors.white,
    width: wp(60),
    fontSize: hp(2),
    alignSelf: "center",
  },
});
export default Duas;
