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
import { Btn } from "../../utilis/Btn";
import MapView, { Marker } from "react-native-maps";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import MapViewDirections from "react-native-maps-directions";
import database from "@react-native-firebase/database";
import auth, { firebase } from "@react-native-firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import style from "../../Theme/styles";
// import MapView from 'react-native-maps';
import { PermissionsAndroid } from "react-native";
// import Geolocation from "@react-native-community/geolocation";
import Geolocation from "react-native-geolocation-service";
const FindMyMasjid = ({ navigation, route }) => {
  // console.log(route.params,"route.params");
  let latitude = route.params.params.lat;
  let longitude = route.params.params.long;
  console.log(latitude, longitude);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [Name, onChangeName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setError] = useState(null);
  const [expTIme, setExpTime] = useState(null);
  const [text, settext] = useState("Select Mosques");
  const [isloading, setisloading] = useState(false);
  const [inputBorder, setinputBorder] = useState(false);
  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [showModal, setshowModal] = useState(false);
  const [searchIt, setsearchIt] = useState(false);
  const [male, setmale] = useState(false);
  const [uid, setUid] = useState();
  const [check, setcheck] = useState([]);
  const [arr, setarr] = useState([]);
  const [Mosq, setMosq] = useState([]);
  const [MosqKey, setMosqKey] = useState([]);
  const [Key, setKey] = useState();
  const [refresh, setRefresh] = useState(false);
  const [Center, setCenter] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyAizf1uimNFXUerqmfomTFsJqGmac4_GPM";
  const [showModal2, setshowModal2] = useState(false);
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
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
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
        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getGeoLocaation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position, "Pos");
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    // const config = {
    //   enableHighAccuracy: true,
    //   timeout: 2000,
    //   maximumAge: 3600000,
    // };

    // Geolocation.getCurrentPosition(
    //   (info) => console.log("INFO", info),
    //   (error) => console.log("ERROR", error),
    //   config
    // );
  };
  const test = () => {
    database()
      .ref("/mosqueList")
      .on("value", (snapshot) => {
        // console.log("runs", JSON.stringify(snapshot.val(), null, 2));
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
    // console.log(check[0].latitude);
    setlong(JSON.parse(check[0].longitude));
    setlat(JSON.parse(check[0].latitude));
    console.log(lat, long);
    setCenter(true);
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Find My Masjid"}
          onPressBack={() => navigation.navigate("Home")}
        />
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
          <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
          {Center ? (
            <Marker
              pinColor={"blue"}
              coordinate={{ latitude: lat, longitude: long }}
            />
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

export default FindMyMasjid;
