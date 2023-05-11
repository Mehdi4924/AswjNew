import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import style from "../../Theme/styles";
import "hijri-date";

const PrayerTimes = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [text, settext] = useState("Select Mosques");
  const [showModal, setshowModal] = useState(false);
  const [arr, setarr] = useState([]);
  const [showModal2, setshowModal2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [check, setcheck] = useState([]);
  const [timingsList2, settimingsList2] = useState([]);
  const [day, setday] = useState();
  const [month, setmonth] = useState();
  const [uid, setUid] = useState();
  const today = new HijriDate();
  var monthNames = [
    { name: "Muharram" },
    { name: "Safar" },
    { name: "Rabi'ul Awwal" },
    { name: "Rabi'ul Akhir" },
    { name: "Jumadal Ula" },
    { name: "Jumadal Akhira" },
    { name: "Rajab" },
    { name: "Sha'ban" },
    { name: "Ramadan" },
    { name: "Shawwal" },
    { name: "Dhul Qa'ada" },
    { name: "Dhul Hijja" },
  ];
  console.log(monthNames[0].name);
  console.log(today._date, "today");
  // const day_eid_adha = new HijriDate(1443, 6, 10);
  let hijirdate = today._date;
  let hijirYear = today._year;
  let hijirmonth = today._month;
  let hijirmonth2;
  for (let index = 0; index < monthNames.length; index++) {
    // const element = array[index];
    if (index == hijirmonth - 1) {
      // alert("hii")
      hijirmonth2 = monthNames[index].name;
    }
  }
  // console.log(day_eid_adha);
  const list = [
    {
      text: "Fajar",
      Athan: "3:54AM",
      Iqamah: "4:54AM",
    },
    {
      text: "Duhur",
      Athan: "3:54AM",
      Iqamah: "4:54AM",
    },
    {
      text: "Asr",
      Athan: "3:54AM",
      Iqamah: "4:54AM",
    },
    {
      text: "Maghrib",
      Athan: "3:54AM",
      Iqamah: "4:54AM",
    },
    {
      text: "Isha",
      Athan: "3:54AM",
      Iqamah: "4:54AM",
    },
  ];
  useEffect(() => {
    let date = moment().utcOffset("+05:30").format("MMMM DD,YYYY");
    setDate(date);
    let a = new Date().getDate();
    setday(a);
    setmonth(moment().utcOffset("+05:30").format("MMM"));
    console.log(month);
  });

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);
  useEffect(() => {
    if (arr.length == 0) {
      MosqList();
    }
  }, []);
  const MosqList = () => {
    database()
      .ref("/mosqueList")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        for (let key in data) {
          data[key].hashNumber = key;
          arr.push(data[key]);
          setRefresh(!refresh);
        }
      });
  };
  const MasjidTimings = () => {
    let child = check[0].hashNumber;
    database()
      .ref("/prayer_timings")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        for (const property in data) {
          if (child === property) {
            let result = data[property].substring(
              16,
              data[property].length - 1
            );
            let result3 = JSON.parse(result);
            for (let index = 0; index < result3.length; index++) {
              if (day == result3[index].Day && month == result3[index].Month)
                timingsList2.length = 0;
              timingsList2.push(result3[index]);
            }
          }
        }
        timingsList2.length = 1;
        console.log("timingsList2", timingsList2);
        setRefresh(!refresh);
      });
  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Prayer Times"}
          onPressBack={() => navigation.navigate("Home")}
        />
        <TouchableOpacity
          onPress={() => setshowModal2(true)}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 15,
            marginVertical: 25,
            paddingVertical: 15,
          }}
        >
          <Text style={{ color: "#fff", marginLeft: 20, fontSize: 15 }}>
            {text}
          </Text>
          <MaterialIcons
            color={"rgba(255,255,255,0.2)"}
            size={25}
            name={"arrow-drop-down"}
            style={{ textAlign: "center" }}
          />
        </TouchableOpacity>

        <Text style={style.lightheader}>
          {hijirdate + " "}
          {hijirmonth2 + " "}
          {hijirYear}
        </Text>
        <Text style={style.lightheader}>{date}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 15,
            marginTop: 20,
            paddingVertical: 15,
          }}
        >
          <Text
            style={[
              style.thickHeader,
              {
                marginHorizontal: 10,
              },
            ]}
          >
            Prayers
          </Text>
          <Text
            style={[
              style.thickHeader,
              {
                marginHorizontal: 10,
              },
            ]}
          >
            Athan
          </Text>
          <Text
            style={[
              style.thickHeader,
              {
                marginHorizontal: 10,
              },
            ]}
          >
            Iqamah
          </Text>
        </View>
        <FlatList
          data={timingsList2}
          extraData={refresh}
          renderItem={({ item, key }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 5,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  Fajar
                </Text>
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Fajar} AM
                </Text>

                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Fajar_Iqamah} AM
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 2,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  Dhuhr
                </Text>
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Dhuhr} PM
                </Text>

                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Dhuhr_Iqamah} PM
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 5,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  Asar
                </Text>
                <Text
                  style={[
                    style.forgetText,
                    {
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Asar} PM
                </Text>

                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Asar_Iqamah} PM
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 2,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  Maghrib
                </Text>
                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Maghrib} PM
                </Text>

                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Maghrib_Iqamah} PM
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 5,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  Isha
                </Text>
                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Isha} PM
                </Text>

                <Text
                  style={[
                    style.forgetText,
                    {
                      // color: "#fff",
                      marginLeft: 20,
                      fontSize: 18,
                      width: "25%",
                    },
                  ]}
                >
                  {item.Isha_Iqamah} PM
                </Text>
              </View>
            </View>
          )}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal2}
          style={{}}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                marginHorizontal: 25,
                backgroundColor: "white",
                // backgroundColor: "red",

                maxHeight: "45%",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(128,128,128,0.1)",
                  paddingVertical: 20,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  borderWidth: 1,
                  borderBottomColor: "rgba(0, 0, 0,0.2)",
                  borderColor: "transparent",
                }}
              />
              <FlatList
                data={arr}
                extraData={refresh}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.check == true) {
                        item.check = false;
                      } else {
                        if (check.length == 0) {
                          item.check = true;
                          settext(item.name);
                          console.log(item);
                          check.push(item);
                        } else {
                          check[0].check = false;
                          check.length = 0;
                          item.check = true;
                          settext(item.name);

                          check.push(item);
                        }
                      }

                      setRefresh(!refresh);
                    }}
                    style={{ flexDirection: "row", marginVertical: 15 }}
                  >
                    {/* <MaterialCommunityIcons
                      name={
                        item.check
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={item.check ? "#00A300" : "#000"}
                      style={{ marginHorizontal: 20 }}
                    /> */}

                    <FontAwesome
                      color={item.check ? "#00A300" : "rgba(0,0,0,0.3)"}
                      size={20}
                      name={item.check ? "dot-circle-o" : "circle-o"}
                      style={{ textAlign: "right", marginHorizontal: 20 }}
                    />
                    <Text
                      style={[
                        style.lightheader,
                        { alignSelf: "center", color: "#000" },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // backgroundColor:'black',
                }}
              >
                <Btn
                  text="CANCEL"
                  onPress={() => {
                    setshowModal2(false);
                  }}
                  containerStyle={{
                    marginBottom: 0,
                    backgroundColor: "#00A300",
                    paddingVertical: 18,
                    // marginVertical: 20,
                    width: "49.7%",
                    // paddingHorizontal: '15%',
                    borderBottomLeftRadius: 20,
                  }}
                  textStyle={[
                    style.thickHeader,
                    {
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Montserrat-Medium",
                      fontSize: 13,
                      letterSpacing: 1,
                    },
                  ]}
                />
                <Btn
                  text="OK"
                  onPress={() => {
                    setshowModal2(false);
                    MasjidTimings();
                  }}
                  containerStyle={{
                    marginBottom: 0,
                    backgroundColor: "#00A300",
                    paddingVertical: 18,
                    width: "49.7%",

                    // paddingHorizontal: '15%',
                    // marginVertical: 20,
                    borderBottomRightRadius: 20,
                  }}
                  textStyle={[
                    style.thickHeader,
                    {
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Montserrat-Medium",
                      fontSize: 13,
                      letterSpacing: 1,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </Modal>
      </BackGround>
    </SafeAreaView>
  );
};

export default PrayerTimes;
