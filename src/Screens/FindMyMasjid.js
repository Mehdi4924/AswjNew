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
          style={[
            styles.searchView,
            {
              borderBottomColor:
                text == "Nearby AWSJ Centers"
                  ? "rgba(255, 0, 0,0.4)"
                  : "transparent",
            },
          ]}
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
        <View style={styles.bottomButtonsContainer}>
          <Btn
            onPress={() => navigation.navigate("PrayerTimes")}
            text="GET PRAYERS TIME"
            containerStyle={styles.markerContainer}
            textStyle={[style.thickHeader, styles.markerText]}
          />
        </View>
        <Modal animationType="fade" transparent={true} visible={showModal2}>
          <View style={styles.optionsContainer}>
            <View style={styles.optionsMainView}>
              <View style={styles.optionsSubView} />
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
                    style={styles.listItems}
                  >
                    <FontAwesome
                      color={item.check ? colors.primary : "rgba(0,0,0,0.3)"}
                      size={hp(2.5)}
                      name={item.check ? "dot-circle-o" : "circle-o"}
                      style={styles.iconStyles}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.modalButtonView}>
                <Btn
                  text="CANCEL"
                  onPress={() => {
                    setshowModal2(false);
                  }}
                  containerStyle={styles.buttonContainer}
                  textStyle={[style.thickHeader, styles.buttonText]}
                />
                <Btn
                  text="OK"
                  onPress={() =>
                    check.length > 0 ? onPressok() : setshowModal2(false)
                  }
                  containerStyle={styles.rightButtonContainer}
                  textStyle={[style.thickHeader, styles.buttonText]}
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
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 15,
    borderWidth: 3,
    borderColor: "transparent",
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: hp(7),
    right: 0,
    left: 0,
  },
  markerContainer: {
    backgroundColor: colors.primary,
    padding: wp(2),
    marginVertical: 0,
  },
  markerText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: CustomFonts.bold,
    fontSize: hp(1.8),
    letterSpacing: 1,
  },
  optionsContainer: { flex: 1, justifyContent: "center" },
  optionsMainView: {
    marginHorizontal: wp(10),
    backgroundColor: colors.white,
    maxHeight: hp(45),
    borderRadius: 20,
  },
  optionsSubView: {
    backgroundColor: "rgba(128,128,128,0.1)",
    paddingVertical: hp(3),
    borderTopRightRadius: hp(3),
    borderTopLeftRadius: hp(3),
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0,0.2)",
    borderColor: "transparent",
  },
  listItems: { flexDirection: "row", marginVertical: hp(1.5) },
  itemText: {
    alignSelf: "center",
    color: colors.black,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.8),
  },
  iconStyles: { textAlign: "right", marginHorizontal: wp(5) },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: wp(4.5),
    width: wp(40.5),
    borderBottomLeftRadius: hp(4),
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: CustomFonts.bold,
    fontSize: hp(1.8),
    letterSpacing: 1,
  },
  rightButtonContainer: {
    backgroundColor: colors.primary,
    paddingVertical: wp(4.5),
    width: wp(40.5),
    borderBottomRightRadius: hp(4),
  },
});
export default FindMyMasjid;
