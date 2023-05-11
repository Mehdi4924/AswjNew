import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackGround from "../Components/Background";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import database from "@react-native-firebase/database";
import { Update_Profile_Validations } from "../../utilis/validation";
import moment from "moment";
import style from "../../Theme/styles";

const Duas = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [search, setsearch] = useState("");
  const [searchIt, setsearchIt] = useState(false);
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [list, setlist] = useState([]);
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
      // setlist(list);
      setarr(data2);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
    } else if (Array.isArray(filteredName)) {
      // setlist(filteredName);
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
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            backgroundColor: "rgba(112,128,144,0.04)",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ flexDirection: "row", alignSelf: "center" }}
          >
            <MaterialIcons
              color={"#fff"}
              size={25}
              name={"keyboard-arrow-left"}
              style={{ marginHorizontal: 8 }}
            />
            <Text style={[style.forgetText, { fontSize: 15 }]}>BACK </Text>
          </TouchableOpacity>

          {searchIt ? (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#fff",
                marginHorizontal: 20,
                maxHeight: 40,
                flexDirection: "row",
              }}
            >
              <FontAwesome5
                color={"#000"}
                size={12}
                name={"search"}
                style={{ alignSelf: "center", marginHorizontal: 15 }}
              />

              <TextInput
                placeholderTextColor={"#000"}
                placeholder={"Search"}
                value={search}
                style={{ color: "#000", flex: 1 }}
                onChangeText={(Email) => {
                  setsearch(Email), findd(Email);
                }}
              ></TextInput>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={[
                  style.ThickHeader,
                  {
                    color: "#fff",
                    fontSize: 18,
                    marginHorizontal: 20,
                    // fontWeight: "700",
                    fontFamily: "Montserrat-Bold",
                    letterSpacing: 1,
                  },
                ]}
              >
                Duas{" "}
              </Text>
              <FontAwesome
                onPress={() => setsearchIt(true)}
                color={"#fff"}
                size={20}
                name={"search"}
                style={{ flex: 1, textAlign: "right", marginHorizontal: 15 }}
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
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255, 0.1)",
                marginVertical: 10,
                paddingVertical: 15,
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.lightheader,
                    {
                      color: "#fff",
                      fontSize: 20,
                      // marginHorizontal: 15,
                      // backgroundColor: "rgba(255,255,255, 0.1)",
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      // borderRadius: 100,
                      borderBottomLeftRadius: 5,
                    },
                  ]}
                >
                  {item.id}
                </Text>
              </View>
              <Text
                style={[
                  style.lightheader,
                  {
                    color: "#fff",
                    width: "60%",
                    fontSize: 19,
                    alignSelf: "center",
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </BackGround>
    </SafeAreaView>
  );
};

export default Duas;
