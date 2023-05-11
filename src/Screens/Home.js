// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   FlatList,
//   TouchableHighlight,
//   Platform,
//   ImageBackground,
//   Dimensions,
//   Modal,
//   BackHandler,
// } from "react-native";
// import { FormInput } from "../../utilis/Text_input";
// import { Btn } from "../../utilis/Btn";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Feather from "react-native-vector-icons/Feather";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import BackGround from "../Components/Background";
// import { Update_Profile_Validations } from "../../utilis/validation";
// import { PermissionsAndroid } from "react-native";
// // import Geolocation from "@react-native-community/geolocation";
// import Geolocation from "react-native-geolocation-service";
// import { Toast, Position, Theme } from "react-native-customized-toast";
// import style from "../../Theme/styles";
// import database from "@react-native-firebase/database";
// import { useFocusEffect } from "@react-navigation/core";
// import Color from "../../Theme/Colors";

// const Home = ({ navigation, route }) => {
//   const windowWidth = Dimensions.get("window").width;
//   const windowHeight = Dimensions.get("window").height;
//   const [Name, onChangeName] = useState("");
//   const [Password, onChangePassword] = useState("");
//   const [errors, setError] = useState(null);
//   const [expTIme, setExpTime] = useState(null);
//   const [text, settext] = useState("Nearby AWSJ Centers");
//   const [isloading, setisloading] = useState(false);
//   const [inputBorder, setinputBorder] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [showModal, setshowModal] = useState(false);
//   const [male, setmale] = useState(false);
//   const [female, setfemale] = useState(false);
//   const [showModal2, setshowModal2] = useState(false);
//   const [lat, setlat] = useState();
//   const [long, setlong] = useState();
//   const list = [
//     {
//       link: require("../../Assets/7.png"),
//       text: "Prayer Times",
//       size: {
//         height: windowHeight / 12,
//         width: windowWidth / 6,
//         marginTop: -10,
//         resizeMode: "contain",
//       },
//       nav: "PrayerTimes",
//     },
//     {
//       link: require("../../Assets/findmymasjid.png"),
//       text: "Find My Masjid",
//       size: {
//         height: windowHeight / 16.5,
//         width: windowWidth / 7,
//         resizeMode: "contain",
//         marginBottom: 7,
//       },
//       nav: "FindMyMasjid",
//     },
//     {
//       link: require("../../Assets/1.png"),
//       text: "Videos",
//       size: {
//         height: windowHeight / 16.5,
//         width: windowWidth / 7,
//         resizeMode: "contain",
//         marginBottom: 7,
//       },
//       nav: "VideosList",
//     },
//     {
//       link: require("../../Assets/5.png"),
//       text: "Live Radio",
//       size: {
//         height: windowHeight / 13.5,
//         width: windowWidth / 7,
//         resizeMode: "contain",
//         marginBottom: 2,
//       },
//       nav: "Radio",
//     },
//     {
//       link: require("../../Assets/duaIcon.png"),
//       text: "Duas",
//       size: {
//         height: windowHeight / 12,
//         width: windowWidth / 7,
//         resizeMode: "contain",
//         marginTop: -6,
//         marginBottom: 2,
//       },
//       nav: "Duas",
//     },
//     {
//       link: require("../../Assets/ic_calender.png"),
//       text: "Special Events",
//       size: {
//         height: windowHeight / 14.5,
//         width: windowWidth / 7,
//         resizeMode: "cover",
//         marginTop: -2,
//         marginBottom: 10,
//       },
//       nav: "Events",
//     },
//     {
//       link: require("../../Assets/main_event.png"),
//       text: "Camps and Conference",
//       size: {
//         height: windowHeight / 16,
//         width: windowWidth / 10,
//         resizeMode: "contain",
//         marginBottom: 5,
//       },
//       nav: "Camps",
//     },
//     {
//       link: require("../../Assets/lecture.png"),
//       text: "Local Masjid Timetable",
//       size: {
//         height: windowHeight / 15,
//         width: windowWidth / 10,
//         resizeMode: "contain",
//         marginBottom: 2.5,
//       },
//       nav: "LocalMasjids",
//     },
//     {
//       link: { uri: "" },
//       text: "",
//       size: {
//         height: 0,
//         width: 0,
//         resizeMode: "",
//       },
//       nav: "",
//     },
//   ];
//   useFocusEffect(
//     React.useCallback(() => {
//       const handleBackButton = async () => {
//         BackHandler.exitApp();
//         return true;
//       };
//       BackHandler.addEventListener("hardwareBackPress", handleBackButton);
//       return () =>
//         BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
//     }, [])
//   );
//   useEffect(() => {
//     if (showModal === true) {
//       setTimeout(() => {
//         setshowModal(false);
//       }, 3000);
//     }
//   }, [showModal]);

//   useEffect(() => {
//     getLocation();
//   }, []);
//   const getLocation = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Example App",
//           message: "Example App access to your location ",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the location", granted);
//         getGeoLocaation();
//       } else {
//         console.log("location permission denied");
//         // alert("Location permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };
//   const getGeoLocaation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log(position);
//         setlong(position.coords.longitude);
//         setlat(position.coords.latitude);
//       },
//       (error) => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//     // const config = {
//     //   enableHighAccuracy: true,
//     //   timeout: 2000,
//     //   maximumAge: 3600000,
//     // };

//     // Geolocation.getCurrentPosition(
//     //   (info) => console.log("INFO", info),
//     //   (error) => console.log("ERROR", error),
//     //   config
//     // );
//   };

//   return (
//     <SafeAreaView style={style.safeareaview}>
//       <BackGround>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.openDrawer();
//           }}
//         >
//           <Feather
//             name={"menu"}
//             size={25}
//             color={"#fff"}
//             style={{ marginHorizontal: 10, marginVertical: "2%" }}
//           />
//         </TouchableOpacity>
//         <Image
//           source={require("../../Assets/layer.png")}
//           style={{
//             width: "22%",
//             height: "13%",
//             alignSelf: "center",
//             marginTop: 30,
//           }}
//         />
//         <View
//           style={{
//             flexDirection: "row",
//             alignSelf: "center",
//             marginVertical: 10,
//             marginTop: 20,
//           }}
//         >
//           <Text style={[style.thickHeader, { fontSize: 20 }]}>ASWJ </Text>
//           <Text style={[style.lightheader, { fontSize: 21 }]}>Companion</Text>
//         </View>
//         <View style={{ flex: 1, marginHorizontal: 5 }}>
//           <FlatList
//             data={list}
//             numColumns={3}
//             contentContainerStyle={{ justifyContent: "center", flex: 1 }}
//             renderItem={({ item, key }) => (
//               <View style={{ margin: 5, flex: 1 }}>
//                 {item.text !== "" && (
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate(item.nav, { lat: lat, long: long })
//                     }
//                     style={{
//                       flexDirection: "column",
//                       backgroundColor: "rgba(255,255,255, 0.1)",
//                       paddingVertical: 20,
//                       borderRadius: 5,
//                     }}
//                   >
//                     <Image
//                       source={item.link}
//                       resizeMode={
//                         item.size.resizeMode ? item.size.resizeMode : null
//                       }
//                       style={{
//                         height: item.size.height,
//                         width: item.size.width,
//                         alignSelf: "center",
//                         marginVertical: item.size.marginVertical,
//                         marginTop: item.size.marginTop,
//                         marginBottom: item.size.marginBottom,
//                         // marginBottom: 5
//                       }}
//                     />
//                     <Text
//                       style={{
//                         fontFamily: "Montserrat-Regular",
//                         alignSelf: "center",
//                         color: "#fff",
//                         textAlign: "center",
//                         fontSize: 12,
//                       }}
//                     >
//                       {item.text}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             )}
//           />
//         </View>
//       </BackGround>
//     </SafeAreaView>
//   );
// };

// export default Home;
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { hp, wp } from "../../utilis/Responsive";
import { Vimeo } from "react-native-vimeo-iframe";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";
import { Icon } from "@rneui/base";

export default function Home() {
  return (
    <ImageBackground
      source={require("../../Assets/Dark_Bg_ASWJ.png")}
      style={{ width: wp(100), height: hp(100) }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          width: wp(100),
          height: hp(7),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View />
        <Text
          style={{
            fontFamily: CustomFonts.bold,
            color: colors.white,
            fontSize: hp(2),
          }}
        >
          ASWJ-Home
        </Text>
        <View />
      </View>
      <FlatList
        data={["a", "a", "a", "a", "a"]}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: wp(100),
                alignItems: "center",
              }}
            >
              <Icon name="sc-telegram" type="evilicon" color="#517fa4" />
              <Vimeo
                style={{
                  backgroundColor: "transparent",
                  width: wp(98),
                  height: hp(30),
                }}
                videoId={"806710332"}
                onReady={() => console.log("Video is ready", item)}
                onPlay={() => console.log("Video is playing")}
                onPlayProgress={(data) =>
                  console.log("Video progress data:", data)
                }
                onFinish={() => console.log("Video is finished")}
                loop={false}
                autoPlay={false}
                controls={true}
                speed={false}
                time={"0m0s"}
              />
            </View>
          );
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
