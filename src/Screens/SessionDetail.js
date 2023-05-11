import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Dimensions, Modal } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import style from '../../Theme/styles'
const SessionDetail = ({ navigation, route }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  let data  = route.params.params.data;
  let date  = route.params.params.date;
  // console.log(day);
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Session Details"}
          onPressBack={() => {
            navigation.goBack(null);
          }}
        />
        <Text
          style={{
            color: "#00A300",
            fontSize: 22,
            marginHorizontal: 10,
            textAlign: "center",
            fontFamily: 'Montserrat-Medium',

          }}
        >
          {data.title}
        </Text>

        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              marginHorizontal: 20,
              textAlign: "center",
              marginVertical: 5,
              fontFamily: 'Montserrat-Medium',

            }}
          >
          {data.start_time+" "}-{" "+data.end_time}

            {/* {data.start_time}-{data.end_time} */}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: "#fff",
              fontSize: 15,
              marginHorizontal: 20,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            {date}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginVertical: 25,
            paddingVertical: 15,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              marginHorizontal: 20,
              marginVertical: 10,
              fontFamily: 'Montserrat-Medium',

            }}
          >
            Description
          </Text>
          <Text style={{ color: "#fff", fontSize: 15, marginHorizontal: 20 ,fontFamily: 'Montserrat-Medium',
}}>
            {data.description}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <Entypo
            color={"#fff"}
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
              marginVertical: 10,
              fontFamily: 'Montserrat-Medium',

            }}
          >
            Speakers
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginVertical: 10,
            paddingVertical: 15,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255, 0.6)",
              fontSize: 15,
              marginHorizontal: 20,
              fontFamily: 'Montserrat-Medium',

            }}
          >
            {data.speakers}
          </Text>
        </View>
      </BackGround>
    </SafeAreaView>
  );
};

export default SessionDetail;
