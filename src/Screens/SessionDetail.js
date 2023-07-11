import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import style from "../../Theme/styles";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";
const SessionDetail = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let data = route.params.data;
  let date = route.params.date;
  // console.log(day);
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
          <Text style={styles.headerText}>Session Details</Text>
          <View />
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.dateTimeText}>
          {data.start_time + " "}-{" " + data.end_time}
        </Text>
        <Text style={styles.dateText}>{date}</Text>
        <View style={styles.descContainer}>
          <Text style={styles.descHeading}>Description</Text>
          <Text style={styles.descText}>{data.description}</Text>
        </View>
        <View style={styles.speakersContainer}>
          <Entypo color={colors.white} size={hp(2)} name={"users"} />
          <Text style={styles.descHeading}>Speakers</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descText}>{data.speakers}</Text>
        </View>
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
  title: {
    color: colors.primary,
    fontSize: hp(2.2),
    margin: hp(6),
    textAlign: "center",
    fontFamily: CustomFonts.bold,
  },
  dateTimeText: {
    color: colors.white,
    fontSize: hp(1.8),
    textAlign: "center",
    marginVertical: hp(1),
    fontFamily: CustomFonts.regular,
  },
  dateText: {
    fontFamily: CustomFonts.bold,
    color: colors.white,
    fontSize: hp(2),
    textAlign: "center",
    marginVertical: hp(1),
  },
  descContainer: {
    justifyContent: "flex-start",
    backgroundColor: "rgba(255,255,255, 0.4)",
    marginVertical: hp(2),
    paddingVertical: hp(1),
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
  descHeading: {
    color: colors.white,
    fontSize: hp(2),
    marginVertical: hp(1),
    fontFamily: CustomFonts.bold,
  },
  descText: {
    color: colors.white,
    fontSize: hp(1.8),
    fontFamily: CustomFonts.regular,
  },
  speakersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(25),
    marginHorizontal: wp(5),
    alignItems: "center",
  },
});
export default SessionDetail;
