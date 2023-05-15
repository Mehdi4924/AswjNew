import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Image,
} from "react-native";
import { Btn } from "../../utilis/Btn";
import MapView, { Marker } from "react-native-maps";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import MapViewDirections from "react-native-maps-directions";
import database from "@react-native-firebase/database";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import style from "../../Theme/styles";
import Geolocation from "react-native-geolocation-service";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";

const GOOGLE_MAPS_APIKEY = "AIzaSyAizf1uimNFXUerqmfomTFsJqGmac4_GPM";
const FindMyMasjid = (props) => {
  const { navigation, route } = props;
  const latitude = props.latLng.lat;
  const longitude = props.latLng.lng;
  const [text, settext] = useState("Select Mosques");
  const [latLng, setLatLng] = useState();
  const [check, setcheck] = useState([]);
  const [arr, setarr] = useState([]);
  const [Mosq, setMosq] = useState([]);
  const [MosqKey, setMosqKey] = useState([]);
  const [Key, setKey] = useState();
  const [refresh, setRefresh] = useState(false);
  const [Center, setCenter] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };

  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location", granted);
        getGeoLocaation();
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getGeoLocaation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position, "Pos");
        // setLatLng(position.coords);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const test = () => {
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
  const setMasjidd = (check, name, key) => {
    if (check == true) {
      Mosq.push(name);
      MosqKey.push(key);
      let text = Mosq.join();
      setKey(MosqKey.join());
      settext(text);
    } else {
      let index = Mosq.indexOf(name);
      Mosq.splice(index, 1);
      settext(Mosq);
    }
  };
  const onPressok = () => {
    setshowModal2(false);
    setLatLng({
      longitude: JSON.parse(check[0].longitude),
      latitude: JSON.parse(check[0].latitude),
    });
    setCenter(true);
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <View style={styles.header}>
          <Image
            source={require("../../Assets/fb_logo.jpg")}
            style={{ height: hp(6), width: wp(20) }}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>ASWJ-Home</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Settings")}
            >
              <Icon
                type="material-community"
                name="account-circle"
                size={hp(3)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setshowModal2(true)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: 15,
            borderWidth: 3,
            borderBottomColor:
              text == "Nearby AWSJ Centers"
                ? "rgba(255, 0, 0,0.4)"
                : "transparent",
            borderColor: "transparent",
          }}
        >
          <Text
            style={{ color: "rgba(255,255,255, 0.6)", marginHorizontal: 15 }}
          >
            {text}
          </Text>
        </TouchableOpacity>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {Center ? (
            <>
              <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
              />
              <Marker
                pinColor={"blue"}
                coordinate={{
                  latitude: latLng?.latitude,
                  longitude: latLng.longitude,
                }}
              />
            </>
          ) : null}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        </MapView>
        <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <Btn
            onPress={() => navigation.navigate("PrayerTimes")}
            text="GET PRAYERS TIME"
            containerStyle={{
              backgroundColor: "#00A300",
              padding: 18,
              marginVertical: 0,
            }}
            textStyle={[
              style.thickHeader,
              {
                color: "white",
                textAlign: "center",
                fontFamily: "Montserrat-ExtraBold",
                fontSize: 13,
                letterSpacing: 1,
              },
            ]}
          />
        </View>

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
                    // onPress={() => {
                    //   item.check = item.check ? !item.check : true;
                    //   setMasjidd(item.check, item.name, item.hashNumber);
                    //   setRefresh(!refresh);
                    // }}
                    onPress={() => {
                      if (item.check == true) {
                        item.check = false;
                      } else {
                        if (check.length == 0) {
                          item.check = true;
                          settext(item.name);
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
                    style={{ flexDirection: "row", marginVertical: 10 }}
                  >
                    <FontAwesome
                      color={item.check ? "#00A300" : "rgba(0,0,0,0.3)"}
                      size={20}
                      name={item.check ? "dot-circle-o" : "circle-o"}
                      style={{ textAlign: "right", marginHorizontal: 20 }}
                    />
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#000",
                        fontFamily: "Montserrat-Regular",
                        fontSize: 15,
                      }}
                    >
                      {item.name}
                    </Text>
                    {/* <MaterialCommunityIcons
                      name={
                        item.check
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={item.check ? "#00A300" : "#000"}
                      style={{ marginHorizontal: 20 }}
                    />
                    <Text style={{ alignSelf: "center", color: "#000" }}>
                      {item.name}
                    </Text> */}
                  </TouchableOpacity>
                )}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  onPress={() => onPressok()}
                  containerStyle={{
                    marginBottom: 0,
                    backgroundColor: "#00A300",
                    paddingVertical: 18,
                    width: "49.7%",
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3),
  },
});
export default FindMyMasjid;
