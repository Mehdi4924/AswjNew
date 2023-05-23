import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import BackGround from "../Components/Background";
import Entypo from "react-native-vector-icons/Entypo";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import moment from "moment";
import { firebase } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../../Theme/styles";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

const EventDetail = ({ navigation, route }) => {
  let data = route?.params?.data;
  console.log("route details", data);
  const [members, onChangemembers] = useState("");
  const [flagForButton, setFlagForButton] = useState(false);
  const [uid, setUid] = useState();
  const [uName, setUname] = useState();
  const [unauthorized, setunauthorized] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        exits(user.uid);
        database()
          .ref("profile/" + uid)
          .on("value", (snapshot) => {
            let data = snapshot.val();
            if (data == null) {
            } else {
              setUname(data.fullName);
            }
          });
      }
    });
  }, []);
  const exits = async (id) => {
    const v = await AsyncStorage.getItem("Registered");
    if (v == id) {
      setFlagForButton(true);
    }
  };
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
          onPressBack={() => navigation.goBack()}
        />
        <Modal
          animationType="fade"
          visible={unauthorized}
          transparent
          onRequestClose={() => {}}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalMainView}>
              <View style={styles.modalTopView}>
                <Text style={styles.unauthorizedText}>NOT AUTHORIZED</Text>
              </View>
              <Text style={styles.unauthorizedLoginText}>
                Please login as a registered user to use this service
              </Text>
              <Btn
                text="OK"
                onPress={() => {
                  setunauthorized(false);
                }}
                containerStyle={styles.btnContainer}
                textStyle={styles.btnText}
              />
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={styles.topImage}
            resizeMode="contain"
            source={
              data.imageUrl.length > 0
                ? { uri: data.imageUrl[0] }
                : require("../../Assets/fb_logo.jpg")
            }
          />
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{data.title}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {data.startDate + " "} -{" " + data.endDate}
              </Text>
              <Text style={styles.timeText}>
                {data.startTime + " "}-{" " + data.endTime}
              </Text>
            </View>
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.eventDetailText}>Event Detail</Text>
            <View style={styles.speakersView}>
              <Entypo color={colors.primary} size={15} name={"users"} />
              <Text style={styles.speakersText}>{data.speakers}</Text>
            </View>
            <Text style={styles.descText}>{data.description} </Text>
          </View>
          <View style={styles.inputView}>
            <Image
              style={{ width: hp(5), height: hp(5) }}
              source={require("../../Assets/free.png")}
            />
            <FormInput
              placeholder={"Enter No. Members"}
              value={members}
              placeholderTextColor={colors.black}
              keyboardType="decimal-pad"
              style={styles.inputStyles}
              text_input_container={{ width: "240%" }}
              onChangeText={(Email) => {
                onChangemembers(Email.trim());
              }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => submit()}
          disabled={flagForButton ? true : false}
          style={styles.bottomButton}
        >
          <Text
            style={[
              {
                backgroundColor: flagForButton
                  ? colors.primaryLight
                  : colors.primary,
              },
              styles.bottomButtonText,
            ]}
          >
            {flagForButton ? "Registered" : "Register"}
          </Text>
        </TouchableOpacity>
      </BackGround>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(1,1,1,0.6)",
    ...StyleSheet.absoluteFillObject,
  },
  modalMainView: {
    width: wp(95),
    backgroundColor: colors.white,
    borderRadius: hp(2),
  },
  modalTopView: {
    backgroundColor: colors.black,
    borderTopRightRadius: hp(2),
    borderTopLeftRadius: hp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },
  unauthorizedText: {
    color: colors.white,
    fontSize: hp(2),
    letterSpacing: 1,
    fontFamily: CustomFonts.bold,
  },
  unauthorizedLoginText: {
    fontFamily: CustomFonts.light,
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    color: colors.black,
  },
  btnContainer: {
    backgroundColor: colors.primary,
    paddingVertical: hp(2),
    borderBottomLeftRadius: hp(2),
    borderBottomRightRadius: hp(2),
  },
  btnText: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.6),
    alignSelf: "center",
  },
  topImage: {
    height: hp(10),
    width: wp(90),
    backgroundColor: colors.white,
    alignSelf: "center",
    marginVertical: wp(3),
    borderRadius: 10,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginVertical: hp(0.5),
  },
  headingText: {
    color: colors.primary,
    fontFamily: CustomFonts.bold,
    fontSize: hp(2.2),
    marginVertical: hp(2),
  },
  timeContainer: {
    paddingVertical: hp(1),
    alignItems: "center",
  },
  timeText: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
    fontSize: hp(2),
    marginVertical: hp(0.5),
  },
  eventDetailText: {
    color: colors.primary,
    fontSize: hp(2),
    fontFamily: CustomFonts.bold,
  },
  speakersView: {
    flexDirection: "row",
    paddingVertical: hp(1),
    alignItems: "center",
  },
  speakersText: {
    color: colors.white,
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontFamily: CustomFonts.regular,
  },
  descText: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: CustomFonts.regular,
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  inputView: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "row",
    marginVertical: hp(1),
    padding: hp(1),
    alignItems: "center",
    marginBottom: hp(8),
  },
  inputStyles: {
    color: colors.black,
    flex: 1,
    fontFamily: CustomFonts.regular,
    marginVertical: Platform.OS == "ios" ? 18 : null,
    borderWidth: 1,
    borderColor: colors.primary,
    width: wp(80),
    borderRadius: hp(1),
    marginLeft: wp(2),
  },
  bottomButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomButtonText: {
    color: "#fff",
    fontFamily: CustomFonts.bold,
    fontSize: 18,
    padding: hp(2),
    textAlign: "center",
  },
});
export default EventDetail;
