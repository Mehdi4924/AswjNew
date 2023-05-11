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
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import BackGround from "../Components/Background";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BackButton from "../Components/BackButton";
import { Dropdown } from "react-native-element-dropdown";
import { Update_Profile_Validations } from "../../utilis/validation";
import database from "@react-native-firebase/database";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Filter from "../Components/Filter";
import style from "../../Theme/styles";

const Events = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [arrKeys, setarrKeys] = useState([]);
  const [color, setcolor] = useState();
  const [fetching, setFetching] = useState(false);

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

  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);

  const test = () => {
    setFetching(true);
    database()
      .ref("/eventList")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let b, days, month, year;
        if (arr.length > 0) {
        } else {
          for (let key in data) {
            data[key].hashNumber = key;
            // b = moment(data[key].endDate, "mm/dd/yy")
            //   .utcOffset("+05:30")
            //   .format("YY-MM-DD");
            b = data[key].endDate;
            days = new Date().getDate();
            month = new Date().getMonth() + 1;
            year = new Date().getFullYear();
            // console.log(moment(b).isAfter(c));
            // let str = data[key].startDate;
            // console.log(day,month,year);
            let first2, second2, third2, form, day;
            first2 = b.substring(0, b.indexOf("/"));
            b = b.substring(b.indexOf("/") + 1);
            second2 = b.substring(0, b.indexOf("/"));
            b = b.substring(b.indexOf("/") + 1, b.length);
            third2 = b;
            // console.log();
            let endDate = "20" + third2 + "-" + first2 + "-" + second2;
            let currentDate = year + "-" + month + "-" + days;
            console.log(endDate);
            // alert("hiii")
            if ("20" + third2 >= year) {
              let str2 = data[key].endDate;
              let first2, second2, third2, form2, day2;
              first2 = str2.substring(0, str2.indexOf("/"));
              str2 = str2.substring(str2.indexOf("/") + 1);
              second2 = str2.substring(0, str2.indexOf("/"));
              str2 = str2.substring(str2.indexOf("/") + 1, str2.length);
              third2 = str2;
              var event2 = new Date(
                Date.UTC("20" + third2, first2 - 1, second2, 3, 0, 0)
              );
              var options = { day: "numeric", year: "numeric", month: "long" };

              data[key].endDate = event2.toLocaleDateString("en-us", options);
              // alert("here")
              let str = data[key].startDate;
              let first, second, third;
              first = str.substring(0, str.indexOf("/"));
              str = str.substring(str.indexOf("/") + 1);
              second = str.substring(0, str.indexOf("/"));
              str = str.substring(str.indexOf("/") + 1, str.length);
              third = str;
              var event = new Date(
                Date.UTC("20" + third, first - 1, second, 3, 0, 0)
              );
              var options = { day: "numeric", year: "numeric", month: "long" };
              data[key].startDate = event.toLocaleDateString("en-us", options);
              // alert("jii")
              if (third2 > month) {
                // alert("hiii")
                arr.push(data[key]);
                setRefresh(!refresh);
              } else if (third2 == month) {
                // alert("hiii2")

                if (first2 >= days) {
                  arr.push(data[key]);
                  setRefresh(!refresh);
                }
              }
            }

            // if (moment(endDate).isAfter(currentDate) == true) {

            //   arr.push(data[key]);
            // }
            // console.log("eventssss",arr);
          }
        }
      });

    setFetching(false);
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <TouchableWithoutFeedback
        onPress={() => {
          alert("here");
        }}
      >
        <BackGround>
          <BackButton
            title={"Events"}
            onPressBack={() => navigation.navigate("Home")}
            filter={true}
            TestingFunc={pull_data}
          />
          <View style={{ marginTop: 5, flex: 1 }}>
            <FlatList
              data={arr}
              onRefresh={() => test()}
              refreshing={fetching}
              extraData={refresh}
              renderItem={({ item, key }) => (
                <View
                  style={{
                    justifyContent: "flex-start",
                    backgroundColor: "rgba(255,255,255, 0.1)",
                    marginVertical: 10,
                    paddingTop: "5%",
                    marginHorizontal: 15,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        style={{
                          height: 50,
                          width: 50,
                          marginHorizontal: 10,
                          alignSelf: "center",
                        }}
                        source={require("../../Assets/fb_logo.jpg")}
                      />
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          style.thickHeader,
                          {
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Montserrat-Medium",
                            alignSelf: "flex-start",
                            marginHorizontal: 10,
                            // width: "50%",
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 18,
                          marginHorizontal: 10,
                          marginVertical: 5,
                        }}
                      >
                        {item.startDate}
                      </Text>
                    </View>
                    <View>
                      <TouchableHighlight
                        underlayColor={"rgba(0,163,0,0.4)"}
                        style={{
                          paddingHorizontal: 5,
                          marginVertical: 10,
                          backgroundColor: "red",
                        }}
                        onPress={() => {
                          // setcolor('#00A300'),
                          navigation.navigate("eventDetail", {
                            data: item,
                          });
                        }}
                      >
                        <Text
                          style={{
                            color: "#00A300",
                            textAlign: "center",
                            // marginVertical: 10,
                            backgroundColor: color,
                            fontSize: 18,
                          }}
                        >
                          View
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </BackGround>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Events;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
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
});
