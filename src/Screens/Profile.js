import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackGround from "../Components/Background";
import { Update_Profile_Validations } from "../../utilis/validation";
import ModalValidations from "../Components/ModalValidations";
import database from "@react-native-firebase/database";
import auth, { firebase } from "@react-native-firebase/auth";
import BackButton from "../Components/BackButton";
import style from "../../Theme/styles";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import { subscribeTopic } from "../Services/SubscribeTopic";
import { UnsubscribeTopic } from "../Services/UnsubscribeTopic";
let copyOfPrevMosques = [];
const Profile = ({ navigation, route }) => {
  const windowHeight = Dimensions.get("window").height;
  const [Name, onChangeName] = useState();
  const [errors, setError] = useState(null);
  const [color, setColor] = useState(false);
  const [text, settext] = useState([]);
  const [inputBorder, setinputBorder] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [arrs, setarr] = useState([]);
  const [Mosq, setMosq] = useState([]);
  const [MosqKey, setMosqKey] = useState([]);
  const [Key, setKey] = useState();
  const [uid, setUid] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 1500);
    }
  }, [showModal]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        test(user.uid);
      }
    });
  }, []);
  const test = async (id) => {
    console.log("caleed");
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

            if (data !== null) {
              onChangeName(data.fullName);
              if (data.mosques != undefined) {
                setMosqKey(data.mosques);
                copyOfPrevMosques = [...data.mosques];
              }
              if (data.gender == "male") {
                setmale(true);
              } else {
                setfemale(true);
              }
              if (data.mosques == undefined || data.mosques == null) {
              } else {
                let fields = [];
                for (let index = 0; index < arr.length; index++) {
                  for (let index2 = 0; index2 < data.mosques.length; index2++) {
                    if (arr[index].hashNumber === data.mosques[index2]) {
                      arr[index].check = true;
                      fields.push(arr[index].name);
                    }
                  }
                }
                settext(fields);
              }
              setarr(arr);
              setRefresh(!refresh);
            }
          });
      });

    setRefresh(!refresh);
  };
  const setMasjidd = (check, name, key) => {
    let found = false;
    for (const index in MosqKey) {
      if (MosqKey[index] === key) {
        found = true;
        MosqKey.splice(index, 1);
      } else {
        found = false;
      }
    }
    let Textfound = false;
    for (const index in text) {
      if (text[index] === name) {
        Textfound = true;
        text.splice(index, 1);
      } else {
        Textfound = false;
      }
    }
    if (found == false) {
      MosqKey.push(key);
    }
    if (Textfound == false) {
      text.push(name);
    }
  };
  const onSubmit = async () => {
    let gen = male || female ? true : false;
    let gensss = male ? "male" : female ? "female" : "";
    let validate = Update_Profile_Validations(Name, text, gen);
    if (validate.valid == false) {
      setshowModal(true);
      setMessage(validate.errors);
    } else {
      await UnsubscribeTopic(copyOfPrevMosques, (mess) => console.log(mess));
      firebase
        .database()
        .ref("profile/" + uid)
        .update({
          fullName: Name,
          gender: gensss,
          mosques: MosqKey,
        })
        .then(async () => {
          console.log("Data updated."),
            await subscribeTopic([...MosqKey], (mess) =>
              console.log(mess)
            );
        })
        .catch((err) => {
          console.log(err);
        });

      setshowModal(true);
      setMessage("Your profile is updated!!");
      setColor(true);
    }
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Update Profile"}
          onPressBack={() => navigation.goBack(null)}
        />
        <ModalValidations visible={showModal} message={message} color={color} />
        <ScrollView>
          <View>
            <View style={styles.topText}>
              <Text style={style.thickHeader}>USER </Text>
              <Text style={style.lightheader}>PROFILE</Text>
            </View>
            <FormInput
              iconName_p={"user-alt"}
              placeholder={"Full Name"}
              value={Name}
              placeholderTextColor={"rgba(255,255,255, 0.6)"}
              style={styles.inputStyles}
              text_input_container={styles.inputContainer}
              onChangeText={(Name) => {
                setError(""), onChangeName(Name), setinputBorder(true);
              }}
            />
            <TouchableOpacity
              onPress={() => setshowModal2(true)}
              style={styles.textContainer}
            >
              {text.map((item) => {
                return <Text style={styles.textStyles}>{item}</Text>;
              })}
              <MaterialIcons
                color={"rgba(255,255,255,0.5)"}
                size={25}
                name={"arrow-drop-down"}
              />
            </TouchableOpacity>
            <View style={styles.genderButtonsView}>
              <TouchableOpacity
                onPress={() => {
                  setmale(!male), setfemale(false);
                }}
                style={styles.genderButton}
              >
                <Text style={style.thickHeader}>MALE</Text>
                <FontAwesome
                  color={male ? colors.primary : "rgba(255,255,255,0.2)"}
                  size={hp(3)}
                  name={male ? "dot-circle-o" : "circle-o"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setfemale(!female), setmale(false);
                }}
                style={styles.genderButton}
              >
                <Text style={style.thickHeader}>FEMALE</Text>
                <FontAwesome
                  color={male ? colors.primary : "rgba(255,255,255,0.2)"}
                  size={hp(3)}
                  name={female ? "dot-circle-o" : "circle-o"}
                />
              </TouchableOpacity>
            </View>
            <Btn
              text="UPDATE PROFILE"
              onPress={() => {
                onSubmit();
              }}
              containerStyle={styles.btnStyles}
              textStyle={style.btnMain}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal2}
          onRequestClose={() => {}}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalSubContainer}>
              <View style={styles.modalTopView} />
              <FlatList
                data={arrs}
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
const styles = StyleSheet.create({
  topText: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: hp(10),
  },
  inputStyles: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginHorizontal: wp(8),
    marginVertical: hp(1),
    borderWidth: 3,
    borderBottomColor: colors.primary,
    borderColor: "transparent",
  },
  textContainer: {
    backgroundColor: "rgba(255,255,255, 0.2)",
    padding: wp(5),
    marginHorizontal: wp(8),
    borderRadius: 5,
  },
  textStyles: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
  },
  genderButtonsView: {
    flexDirection: "row",
    marginHorizontal: wp(8),
    justifyContent: "space-around",
  },
  genderButton: {
    width: wp(35),
    height: hp(7),
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255, 0.1)",
    alignItems: "center",
    marginVertical: hp(2),
    borderRadius: 5,
  },
  btnStyles: {
    backgroundColor: colors.primary,
    padding: hp(2),
    marginVertical: hp(1),
    marginHorizontal: wp(8),
    borderRadius: 5,
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
    position: "absolute",
    backgroundColor: colors.primary,
    borderRadius: 5,
    height: hp(7),
    left: 0,
    bottom: 0,
    width: wp(100),
  },
});
export default Profile;
