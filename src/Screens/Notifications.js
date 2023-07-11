import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { Btn } from "../../utilis/Btn";
import BackGround from "../Components/Background";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";
import BackButton from "../Components/BackButton";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import ModalValidations from "../Components/ModalValidations";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import { UnsubscribeTopic } from "../Services/UnsubscribeTopic";
import { subscribeTopic } from "../Services/SubscribeTopic";
import { useDispatch, useSelector } from "react-redux";
import { clearNotificationData } from "../redux/actions/Action";
import ListEmptyComponent from "../Components/ListEmptyComponent";
let copyOfPrevMosques = [];
const Notification = ({ navigation }) => {
  const notifications = useSelector(
    (state) => state.Notifications.allNotifications
  );
  const dispatch = useDispatch();
  const [text, settext] = useState(["Select Mosques"]);
  const [arr, setarr] = useState([]);
  const [color, setColor] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [MosqKey, setMosqKey] = useState([]);
  const [showModal2, setshowModal2] = useState(false);
  const [uid, setUid] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        test(user.uid);
      }
    });
  }, []);
  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 1500);
    }
  }, [showModal]);

  const test = async (id) => {
    database()
      .ref("/mosqueList")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let arr = [];
        for (let key in data) {
          data[key].hashNumber = key;
          arr.push(data[key]);
        }
        database()
          .ref("profile/" + id)
          .on("value", (snapshot) => {
            let data = snapshot.val();
            if (data == null) {
            } else {
              if (
                data.mosques == undefined ||
                data.mosques == null ||
                data == null
              ) {
              } else {
                setMosqKey(data.mosques);
                copyOfPrevMosques = data.mosques;
              }
              if (data !== null) {
                let fields = [];
                let TextAppend = "";
                if (data.mosques == undefined || data.mosques == null) {
                } else {
                  for (let index = 0; index < arr.length; index++) {
                    for (
                      let index2 = 0;
                      index2 < data.mosques.length;
                      index2++
                    ) {
                      if (arr[index].hashNumber === data.mosques[index2]) {
                        arr[index].check = true;
                        fields.push(arr[index].name);
                        TextAppend = `${TextAppend} \n ${arr[index].name}`;
                      }
                    }
                  }
                }
                settext(fields);
                setarr(arr);
                setRefresh(!refresh);
              }
            }
          });
      });
    setRefresh(!refresh);
  };
  const setMasjidd = (check, name, key) => {
    let found;
    for (const index in MosqKey) {
      if (MosqKey[index] === key) {
        found = true;
        MosqKey.splice(index, 1);
      } else {
        found = false;
      }
    }
    let Textfound;
    for (const index in text) {
      if (text[index] === name) {
        Textfound = true;
        text.splice(index, 1);
      } else {
        Textfound = false;
      }
    }
    if (!found) {
      MosqKey.push(key);
    }
    if (!Textfound) {
      text.push(name);
    }
  };
  const onSubmit = async () => {
    await UnsubscribeTopic(copyOfPrevMosques, (mess) => console.log(mess));
    firebase
      .database()
      .ref("profile/" + uid)
      .update({
        mosques: MosqKey,
      })
      .then(
        async () =>
          await subscribeTopic([...MosqKey], (mess) => console.log(mess)),
        setshowModal(true),
        setColor(true),
        setMessage("Notification Centers Updated!!")
      );
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Notification"}
          onPressBack={() => navigation.goBack()}
        />
        <ModalValidations visible={showModal} message={message} color={color} />
        <View style={styles.topTextView}>
          <Text style={styles.selectText}>Select </Text>
          <Text style={[styles.selectText, { fontFamily: CustomFonts.bold }]}>
            Centers{" "}
          </Text>
          <Text style={styles.selectText}>to get Notification</Text>
        </View>
        <TouchableOpacity
          onPress={() => setshowModal2(true)}
          style={styles.textContainer}
        >
          {text && text.length ? (
            text.map((item) => {
              return <Text style={styles.textStyles}>{item}</Text>;
            })
          ) : (
            <Text style={styles.textStyles}>Please Select Center</Text>
          )}
        </TouchableOpacity>
        <Btn
          text="UPDATE"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={styles.bottomButton}
          textStyle={style.thickHeader}
        />
        <View style={styles.notTextView}>
          <Text style={styles.notText}>Notifications</Text>
          <TouchableOpacity onPress={() => dispatch(clearNotificationData())}>
            <Text style={[styles.notText, { color: colors.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          contentContainerStyle={{ paddingBottom: hp(10) }}
          ListEmptyComponent={
            <ListEmptyComponent text={"No notification was found"} />
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.notListContainer}
                onPress={() => {
                  if (item?.data?.notType == "Event") {
                    navigation.navigate("Home", { screen: "Events" });
                  } else if (item?.data?.notType == "Dua") {
                    navigation.navigate("Home", { screen: "Duas" });
                  } else if (item?.data?.notType == "Conference") {
                    navigation.navigate("Camps");
                  }
                }}
              >
                <Image
                  source={
                    item?.data?.imageUrl &&
                    JSON.parse(item.data.imageUrl).length > 0
                      ? { uri: JSON.parse(item.data.imageUrl)[0] }
                      : require("../../Assets/fb_logo.jpg")
                  }
                  style={styles.notImage}
                />
                <View style={{ width: wp(65) }}>
                  <Text style={styles.notTitleStyles}>
                    {item?.notification?.title || "New Notification"}
                  </Text>
                  <Text style={style.notBodyStyles}>
                    {item?.notification?.body ||
                      "New Notification Was Recieved"}
                  </Text>
                </View>
              </TouchableOpacity>
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
                      item.check = item.check ? !item.check : true;
                      setMasjidd(item.check, item.name, item.hashNumber);
                      setRefresh(!refresh);
                    }}
                    style={styles.listContainer}
                  >
                    <MaterialCommunityIcons
                      name={
                        item.check
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={item.check ? colors.primary : colors.black}
                      style={{
                        marginHorizontal: wp(5),
                      }}
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

export default Notification;

const styles = StyleSheet.create({
  topTextView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(5),
  },
  selectText: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
    letterSpacing: 1,
    fontSize: hp(2),
  },
  textContainer: {
    backgroundColor: "rgba(255,255,255, 0.2)",
    padding: wp(5),
    marginHorizontal: wp(3),
    borderRadius: 5,
  },
  textStyles: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
  },
  notTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(90),
    alignSelf: "center",
    marginVertical: hp(2),
  },
  notText: {
    color: colors.white,
    fontFamily: CustomFonts.bold,
  },
  notListContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    marginVertical: hp(0.5),
    marginHorizontal: wp(5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  notImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15),
  },
  notTitleStyles: {
    color: colors.primary,
    fontFamily: CustomFonts.bold,
  },
  notBodyStyles: {
    color: colors.primary,
    fontFamily: CustomFonts.bold,
  },
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
  listContainer: {
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
    alignSelf: "center",
    marginVertical: hp(1),
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: hp(6),
    width: wp(85),
  },
});
