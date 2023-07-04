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
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import { Icon } from "@rneui/base";
import { LocationGetting } from "../../utilis/LocationGetting";
import Toast from "react-native-simple-toast";
import LoadingDots from "../Components/LoadingDots";

const GOOGLE_MAPS_APIKEY = "AIzaSyAizf1uimNFXUerqmfomTFsJqGmac4_GPM";
const FindMyMasjid = (props) => {
  const { navigation } = props;
  const [text, settext] = useState("Select Mosques");
  const [latLng, setLatLng] = useState();
  const [check, setcheck] = useState([]);
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    getLocation();
    if (arr.length == 0) {
      test();
    }
  }, []);
  const getLocation = async () => {
    await LocationGetting()
      .then((res) => {
        console.log(res);
        setLatitude(res.coords.latitude);
        setLongitude(res.coords.longitude);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const onPressok = () => {
    setshowModal2(false);
    setLatLng({
      longitude: JSON.parse(check[0].longitude),
      latitude: JSON.parse(check[0].latitude),
    });
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
        {!!latitude && !!longitude ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
              <Icon
                type="material"
                name="location-history"
                size={hp(5)}
                color={colors.black}
              />
            </Marker>
            {!!latLng?.latitude && !!latLng?.longitude ? (
              <>
                <Marker
                  coordinate={{
                    latitude: latLng?.latitude,
                    longitude: latLng?.longitude,
                  }}
                >
                  <Icon
                    name="mosque"
                    type="font-awesome-5"
                    size={hp(3)}
                    color={colors.primary}
                  />
                </Marker>
                <MapViewDirections
                  origin={{ latitude: latitude, longitude: longitude }}
                  destination={{
                    latitude: latLng?.latitude,
                    longitude: latLng?.longitude,
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor={colors.primary}
                  onStart={(e) => console.log("strart getting directions", e)}
                  onError={(e) => {
                    if (
                      e == "Error on GMAPS route request: NOT_FOUND" ||
                      "Error on GMAPS route request: ZERO_RESULTS"
                    ) {
                      Toast.show("Directions Could Not Be Found", Toast.SHORT);
                    }
                  }}
                  onReady={(e) => console.log("Ready getting directions", e)}
                />
              </>
            ) : null}
          </MapView>
        ) : (
          <LoadingDots style={styles.locationFetchingText} />
        )}
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
  locationFetchingText: {
    padding: 10,
    color: colors.white,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.4),
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: hp(10),
    right: 0,
    left: 0,
  },
  markerContainer: {
    backgroundColor: colors.primary,
    height: hp(5),
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
