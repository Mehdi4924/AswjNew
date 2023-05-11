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
  ScrollView,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import BackGround from "../Components/Background";
import Entypo from "react-native-vector-icons/Entypo";
import BackButton from "../Components/BackButton";
import { Update_Profile_Validations } from "../../utilis/validation";
import database from "@react-native-firebase/database";
import moment from "moment";
import { DrawerActions } from "@react-navigation/native";
import auth, { firebase } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalGuest from "../Components/ModalGuest";
import style from "../../Theme/styles";

const EventDetail = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let data = route.params.params.data;
  console.log("data ==>", JSON.stringify(data, null, 2));

  const [members, onChangemembers] = useState("");
  const [errors, setError] = useState(null);
  const [expTIme, setExpTime] = useState(null);
  const [text, settext] = useState("Select Mosques");
  const [isloading, setisloading] = useState(false);
  const [inputBorder, setinputBorder] = useState(false);
  const [search, setsearch] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [flagForButton, setFlagForButton] = useState(false);
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [uid, setUid] = useState();
  const [uName, setUname] = useState();
  const [unauthorized, setunauthorized] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  useEffect(() => {
    console.log('triggered');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        exits(user.uid);
        database()
          .ref("profile/" + uid)
          .on("value", (snapshot) => {
            let data = snapshot.val();
            console.log("data", data);
            if (data == null) {
            } else {
              setUname(data.fullName);
            }
          });
      }
    });
    // if (arr.length == 0) {
    //   test();
    // }
  }, []);
  const exits = async (id) => {
    const v = await AsyncStorage.getItem("Registered");
    if (v == id) {
      // alert(v);
      setFlagForButton(true);
    }
  };

  // const test = () => {
  //   database()
  //     .ref("/eventList")
  //     .on("value", (snapshot) => {
  //       let data = snapshot.val();
  //       let b, c;
  //       for (let key in data) {
  //         data[key].hashNumber = key;
  //         //   console.log(data[key].startDate);
  //         b = moment(data[key].endDate, "mm/dd/yy")
  //           .utcOffset("+05:30")
  //           .format("YY-MM-DD");
  //         c = moment().utcOffset("+05:30").format("YY-MM-DD");
  //         let str = data[key].startDate;

  //         let first, second, third, form, day;
  //         first = str.substring(0, str.indexOf("/"));
  //         str = str.substring(str.indexOf("/") + 1);
  //         second = str.substring(0, str.indexOf("/"));
  //         str = str.substring(str.indexOf("/") + 1, str.length);
  //         third = str;
  //         var event = new Date(Date.UTC("20" + third, first - 1, second, 3, 0, 0));
  //         var options = { day: 'numeric', year: 'numeric', month: 'long' };

  //         data[key].startDate = event.toLocaleDateString('en-us', options)

  //         let str2 = data[key].endDate;

  //         let first2, second2, third2, form2, day2;
  //         first2 = str2.substring(0, str2.indexOf("/"));
  //         str2 = str2.substring(str2.indexOf("/") + 1);
  //         second2 = str2.substring(0, str2.indexOf("/"));
  //         str2 = str2.substring(str2.indexOf("/") + 1, str2.length);
  //         third2 = str2;
  //         var event2 = new Date(Date.UTC("20" + third2, first2 - 1, second2, 3, 0, 0));
  //         var options = { day: 'numeric', year: 'numeric', month: 'long' };

  //         data[key].endDate = event2.toLocaleDateString('en-us', options)
  //         //   console.log(b);
  //         //   console.log(c);
  //         //   console.log(moment(b).isAfter(c));
  //         // console.log('this is the end date', moment(b).isAfter(c));

  //         // if (moment(b).isAfter(c) == true) {
  //         //   // alert("here");\
  //         //   let testingArr = []
  //         //   testingArr.push(data[key]);
  //         //   // setarr(testingArr)

  //         // }
  //         setRefresh(!refresh);
  //       }
  //       console.log(arr);
  //     });
  // };
  const submit = async () => {
    if (uid == null) {
      setunauthorized(true);
    } else {
      const newReference = database()
        .ref("Event Registration List/" + data.hashNumber)
        .push();
      newReference
        .set({
          Event_Name: data.title,
          Event_id: data.hashNumber,
          Members: members,
          Registred_Date: moment().format("dddd MMM Do YYYY"),
          User_Name: uName,
          user_id: uid,
        })
        .then(() => console.log("Data updated."));
      setFlagForButton(true);
      onChangemembers("");
      await AsyncStorage.setItem("Registered", uid);
    }
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Event Detail"}
          onPressBack={() => navigation.goBack(null)}
        />
        {/* <ModalGuest visible={unauthorized} title={"NOT AUTHORIZED"} message={"Please login as a registered user to use this service"}/> */}

        <Modal
          animationType="fade"
          transparent={true}
          visible={unauthorized}
          onRequestClose={() => {}}
        >
          <View
            style={{
              marginHorizontal: "10%",
              marginVertical: 10,
              marginVertical: "75%",
              backgroundColor: "#fff",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                paddingVertical: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                borderWidth: 1,
                //   borderBottomColor: "rgba(0, 0, 0,0.2)",
                borderColor: "transparent",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  letterSpacing: 1,
                  // textAlign: "justify",
                  fontFamily: "Montserrat-Medium",
                  marginHorizontal: 20,
                }}
              >
                NOT AUTHORIZED
              </Text>
            </View>
            <Text
              style={{
                paddingVertical: 10,
                fontFamily: "Montserrat-Light",
                marginHorizontal: 20,
                color: "#000",
              }}
            >
              Please login as a registered user to use this service
            </Text>
            {/* <TouchableOpacity onPress={()=>alert("onpress")}> */}
            <Btn
              text="OK"
              onPress={() => {
                // alert("here")
                setunauthorized(false);
              }}
              containerStyle={{
                marginBottom: 0,
                backgroundColor: "#00A300",
                paddingVertical: 15,
                width: "50%",
                alignSelf: "flex-end",
                // paddingHorizontal: 50,
                marginVertical: 20,
                borderBottomRightRadius: 15,
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
            {/* </TouchableOpacity> */}
          </View>
        </Modal>

        <ScrollView>
          <Image
            style={{
              height: 50,
              width: 50,
              marginHorizontal: 10,
              alignSelf: "center",
            }}
            source={{ uri: data.imageUrl[0] }}
          />
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255, 0.1)",
              marginVertical: 10,
              paddingVertical: 15,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={[
                style.forgetText,
                {
                  color: "#fff",
                  fontFamily: "Montserrat-Medium",
                  fontSize: 20,
                  textAlign: "center",
                  // width: "50%",
                },
              ]}
            >
              {data.title}
            </Text>
            <View
              style={{
                backgroundColor: "rgba(255,255,255, 0.1)",
                paddingVertical: 20,
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Montserrat-Medium",
                  fontSize: 16,
                }}
              >
                {data.startDate + " "} -{" " + data.endDate}
              </Text>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Montserrat-Medium",
                  marginVertical: 10,
                }}
              >
                {data.startTime + " "}-{" " + data.endTime}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255, 0.1)",
                paddingVertical: 10,
                marginVertical: 20,
              }}
            >
              <Image
                style={{
                  height: 50,
                  width: 50,
                  marginHorizontal: 20,
                  alignSelf: "center",
                }}
                source={require("../../Assets/fb_logo.jpg")}
              />
              <View>
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 15,
                    marginVertical: 5,
                    fontFamily: "Montserrat-Bold",
                  }}
                >
                  ASWJ Australia
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Montserrat-Medium",
                    fontSize: 15,
                  }}
                >
                  NSW
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255, 0.1)",
              marginVertical: 10,
              paddingVertical: 30,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                marginHorizontal: 10,
                fontSize: 14,
                fontFamily: "Montserrat-Regular",
              }}
            >
              Event Detail
            </Text>

            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
              <Entypo
                color={"#00A300"}
                size={15}
                name={"users"}
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  marginHorizontal: 5,
                  fontFamily: "Montserrat-Regular",
                  marginVertical: 10,
                }}
              >
                {data.speakers}
              </Text>
            </View>
            <Text
              style={{
                color: "#fff",
                marginHorizontal: 10,
                fontSize: 14,
                fontFamily: "Montserrat-Regular",
              }}
            >
              {data.description}{" "}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255, 0.1)",
              flexDirection: "row",
              marginHorizontal: 15,
              marginVertical: 10,
              marginBottom: "20%",
              paddingVertical: 5,
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../Assets/free.png")}
            />
            <FormInput
              // label="Email"2225
              // containerStyle={{flex:1,flexdirection:'row'}}
              placeholder={"Enter No. Members"}
              value={members}
              placeholderTextColor={"rgba(255,255,255, 0.6)"}
              keyboardType="email-address"
              style={{
                color: "#fff",
                flex: 1,
                fontFamily: "Montserrat-Light",
                marginVertical: Platform.OS == "ios" ? 18 : null,
              }}
              text_input_container={{ width: "240%" }}
              onChangeText={(Email) => {
                setError(""), onChangemembers(Email.trim());
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => submit()}
          disabled={flagForButton ? true : false}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Text
            style={{
              // backgroundColor: "rgba(255,255,255, 0.1)",
              backgroundColor: flagForButton ? "#99FF99" : "#00A300",
              padding: 18,
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {flagForButton ? "Registered" : "Register"}
          </Text>
          {/* <Btn
            text={flagForButton ? "Registered" : "Register"}
            onPress={() => {
              submit();
            }}
            containerStyle={{
              backgroundColor: "#00A300",
              padding: 18,
            }}
            textStyle={{ color: "#fff", fontWeight: "bold" }}
          /> */}
        </TouchableOpacity>
      </BackGround>
    </SafeAreaView>
  );
};

export default EventDetail;
