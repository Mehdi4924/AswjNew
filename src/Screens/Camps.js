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
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import { Update_Profile_Validations } from "../../utilis/validation";
import moment from "moment";
import style from "../../Theme/styles";
import { ScrollView } from "react-native-gesture-handler";
const Camps = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [Name, onChangeName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setError] = useState(null);
  const [expTIme, setExpTime] = useState(null);
  const [text, settext] = useState("Select Mosques");
  const [isloading, setisloading] = useState(false);
  const [inputBorder, setinputBorder] = useState(false);
  const [search, setsearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [searchIt, setsearchIt] = useState(false);
  const [arr, setarr] = useState([]);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [list, setlist] = useState([
    {
      title: "ASWJ Anual Conference",
      date: "27 january, 2022",
      text: "ASWJ Australia",
    },
    {
      title: "sadsa",
      date: "27 january, 2022",
      text: "Youth Center",
    },
    {
      title: "dsadsa",
      date: "25 january, 2022",
      text: "Youth Center",
    },
    {
      title: "Masjid As Salaam",
      date: "27 january, 2022",
      text: "Masjid As-Salaam",
    },
    {
      title: "ASWJ Auburn",
      date: "27 january, 2022",
      text: "ASWJ Album",
    },
  ]);

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
      // setlist(filteredName)
    } else if (Array.isArray(filteredName)) {
      setlist(filteredName);
    }
  };

  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
    let exampleDate = "20-01-01";
    // let thiDate = new Date('2000-01-01').toString()
    let thiDate = new Date(exampleDate).getFullYear();

    // alert(JSON.stringify(thiDate))
  }, []);
  const test = () => {
    setFetching(true);
    database()
      .ref("/Conference List")
      .on("value", (snapshot) => {
        console.log('data in the list',snapshot);
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

        // setarr(
        //   arr.sort(function (a, b) {
        //     var dateA = new Date(a.start_date).getFullYear();
        //     var dateB = new Date(b.start_date).getFullYear();
        //     return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        //   })
        // );
        setFetching(false);
        console.log(arr);
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"ASWJ Main Events"}
          onPressBack={() => navigation.navigate("Home")}
        />
        {/* <ScrollView> */}
        <View style={{ marginTop: 5, flex: 1 }}>
          <FlatList
            data={arr}
            // inverted={true}
            // style={{flex: 1}}
            // contentContainerStyle={{flex:1}}
            onRefresh={() => test()}
            refreshing={fetching}
            extraData={refresh}
            renderItem={({ item, key }) => (
              <View
                style={{
                  // flex:1,
                  justifyContent: "flex-start",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 10,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  style={{ marginHorizontal: 20 }}
                  onPress={() =>
                    navigation.navigate("Sessions", {
                      key: item.hashNumber,
                      date: item.start_date,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      borderRadius: 100,
                      marginVertical: 2,
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 16,
                      fontFamily: "Montserrat-Medium",
                    }}
                  >
                    {item.start_date}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      marginVertical: 2,
                      fontSize: 15,
                      fontFamily: "Montserrat-Regular",
                    }}
                  >
                    {item.center}
                  </Text>
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

export default Camps;
