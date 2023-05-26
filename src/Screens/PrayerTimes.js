import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  StyleSheet,
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
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

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
  let hijirdate = today._date;
  let hijirYear = today._year;
  let hijirmonth = today._month;
  let hijirmonth2;
  for (let index = 0; index < monthNames.length; index++) {
    if (index == hijirmonth - 1) {
      hijirmonth2 = monthNames[index].name;
    }
  }
  useEffect(() => {
    let date = moment().utcOffset("+05:30").format("MMMM DD,YYYY");
    setDate(date);
    let a = new Date().getDate();
    setday(a);
    setmonth(moment().utcOffset("+05:30").format("MMM"));
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
    if (arr.length == 0) {
      MosqList();
    }
  }, [showModal]);

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
        setRefresh(!refresh);
      });
  };
  console.log("namaz timming", timingsList2);

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Prayer Times"}
          onPressBack={() => navigation.navigate("Home")}
        />
        <TouchableOpacity
          onPress={() => setshowModal2(true)}
          style={styles.selectButton}
        >
          <Text style={styles.selectText}>{text}</Text>
          <MaterialIcons
            color={"rgba(255,255,255,0.3)"}
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
        <View style={styles.listHeader}>
          <Text style={style.thickHeader}>Prayers</Text>
          <Text style={style.thickHeader}>Athan</Text>
          <Text style={style.thickHeader}>Iqamah</Text>
        </View>
        <FlatList
          data={timingsList2}
          extraData={refresh}
          renderItem={({ item, key }) => {
            console.log("==>>", item);
            return (
              <>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Fajar</Text>
                  <Text style={styles.listText}>{item.Fajar} AM</Text>
                  <Text style={styles.listText}>{item.Fajar_Iqamah} AM</Text>
                </View>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Dhuhr</Text>
                  <Text style={styles.listText}>{item.Dhuhr} PM</Text>
                  <Text style={styles.listText}>{item.Dhuhr_Iqamah} PM</Text>
                </View>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Asar</Text>
                  <Text style={styles.listText}>{item.Asar} PM</Text>
                  <Text style={styles.listText}>{item.Asar_Iqamah} PM</Text>
                </View>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Maghrib</Text>
                  <Text style={styles.listText}>{item.Maghrib} PM</Text>
                  <Text style={styles.listText}>{item.Maghrib_Iqamah} PM</Text>
                </View>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>Isha</Text>
                  <Text style={styles.listText}>{item.Isha} PM</Text>
                  <Text style={styles.listText}>{item.Isha_Iqamah} PM</Text>
                </View>
              </>
            );
          }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal2}
          style={{}}
          onRequestClose={() => {}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
              <View style={styles.modalTopView} />
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
                    style={styles.modalListContainer}
                  >
                    <FontAwesome
                      color={item.check ? colors.primary : colors.black}
                      size={20}
                      name={item.check ? "dot-circle-o" : "circle-o"}
                      style={{ textAlign: "right", marginHorizontal: 20 }}
                    />
                    <Text style={styles.listText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.modalButtonContainer}>
                <Btn
                  text="CANCEL"
                  onPress={() => {
                    setshowModal2(false);
                  }}
                  containerStyle={[
                    styles.modalBtnStyles,
                    {
                      borderBottomLeftRadius: 5,
                    },
                  ]}
                  textStyle={style.btnMain}
                />
                <Btn
                  text="OK"
                  onPress={() => {
                    setshowModal2(false);
                    MasjidTimings();
                  }}
                  containerStyle={[
                    styles.modalBtnStyles,
                    {
                      borderBottomRightRadius: 5,
                    },
                  ]}
                  textStyle={style.btnMain}
                />
              </View>
            </View>
          </View>
        </Modal>
      </BackGround>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  selectButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "rgba(255,255,255, 0.3)",
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
  selectText: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: CustomFonts.regular,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255, 0.3)",
    borderRadius: 5,
    marginHorizontal: wp(5),
    marginTop: hp(3),
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255, 0.5)",
    marginVertical: hp(0.5),
    paddingVertical: hp(1),
    marginHorizontal: wp(5),
    paddingHorizontal: wp(3),
    borderRadius: 5,
  },
  listText: {
    fontFamily: CustomFonts.light,
    color: colors.white,
    fontSize: hp(2),
  },
  // modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp(5),
  },
  modalSubContainer: {
    backgroundColor: "white",
    maxHeight: hp(50),
    borderRadius: 5,
  },
  modalTopView: {
    backgroundColor: "rgba(128,128,128,0.1)",
    paddingVertical: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0,0.2)",
    borderColor: "transparent",
  },
  modalListContainer: {
    flexDirection: "row",
    marginVertical: hp(1),
    alignItems: "center",
  },
  listText: {
    color: colors.black,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.8),
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtnStyles: {
    backgroundColor: colors.primary,
    width: "49.8%",
    alignItems: "center",
    justifyContent: "center",
    height: hp(6),
  },
  bottomButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: hp(7),
    left: 0,
    bottom: 0,
    width: wp(100),
  },
});
export default PrayerTimes;
