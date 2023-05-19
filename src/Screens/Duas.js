import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  StyleSheet,
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
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <View style={styles.searchView}>
          {searchIt ? (
            <TouchableOpacity style={styles.searchBar}>
              <FontAwesome5 color={colors.black} size={hp(2)} name={"search"} />
              <TextInput
                placeholderTextColor={colors.black}
                placeholder={"Search"}
                value={search}
                style={styles.searchInputStyles}
                onChangeText={(Email) => {
                  setsearch(Email), findd(Email);
                }}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerContainer}>
              <Text style={[style.thickHeader, styles.headerStyles]}>
                Duas{" "}
              </Text>
              <FontAwesome
                onPress={() => setsearchIt(true)}
                color={"#fff"}
                size={20}
                name={"search"}
                style={styles.searchIcon}
              />
            </View>
          )}
        </View>
        <FlatList
          data={arr}
          onRefresh={() => test()}
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
  searchView: {
    flexDirection: "row",
    paddingVertical: wp(2),
    backgroundColor: "rgba(112,128,144,0.04)",
  },
  searchBar: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    maxHeight: hp(8),
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginVertical: hp(1),
    paddingVertical: wp(5),
  },
  listSubView: {
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginHorizontal: wp(5),
  },
  itemNumberText: {
    color: colors.white,
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
