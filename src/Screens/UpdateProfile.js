import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
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
import style from "../../Theme/styles";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

const UpdateProfile = ({ navigation, route }) => {
  const [Name, onChangeName] = useState("");
  const [text, settext] = useState(["Nearby AWSJ Centers"]);
  const [inputBorder, setinputBorder] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [color, setcolor] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [showModal2, setshowModal2] = useState(false);
  const [arr, setarr] = useState([]);
  const [Mosq, setMosq] = useState([]);
  const [MosqKey, setMosqKey] = useState([]);
  const [Key, setKey] = useState();
  const [uid, setUid] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    if (arr.length == 0) {
      test();
    }
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);
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
  const onSubmit = () => {
    let gen, gensss;
    if (male == true) {
      gen = true;
      gensss = "male";
    } else if (female == true) {
      gen = true;
      gensss = "female";
    } else {
      gen = false;
    }
    // console.log(gensss);
    let validate = Update_Profile_Validations(Name, text, gen);
    if (validate.valid == false) {
      setshowModal(true);
      setMessage(validate.errors);
    } else {
      setshowModal(true);
      setMessage(validate.errors);
      firebase
        .database()
        .ref("profile/" + uid)
        .set({
          fullName: Name,
          gender: gensss,
          mosques: MosqKey,
        })
        .then(() => console.log("Data updated."));

      setshowModal(true);
      setMessage("You have successfully Registered !");
      setcolor(true);
      navigation.navigate("Login");
    }
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <ModalValidations visible={showModal} message={message} color={color} />
        <ScrollView>
          <View>
            <View style={styles.topTextView}>
              <Text style={style.thickHeader}>USER </Text>
              <Text style={style.lightheader}>PROFILE</Text>
            </View>
            <FormInput
              iconName_p={"user-alt"}
              placeholder={"Full Name"}
              value={Name}
              placeholderTextColor={"rgba(255,255,255, 0.6)"}
              style={styles.formInputContainer}
              text_input_container={styles.textInputStyles}
              onChangeText={(Name) => {
                onChangeName(Name), setinputBorder(true);
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
const styles = StyleSheet.create({
  topTextView: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: hp(15),
  },
  formInputContainer: {
    flex: 1,
    color: colors.white,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.6),
  },
  textInputStyles: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginHorizontal: wp(8),
    marginVertical: hp(1),
    borderBottomWidth: 2,
    borderBottomColor: "red",
    padding: wp(2),
    borderRadius: 5,
  },
  textContainer: {
    backgroundColor: "rgba(255,255,255, 0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(5),
    marginHorizontal: wp(8),
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  textStyles: {
    color: colors.white,
    fontFamily: CustomFonts.regular,
  },
  genderButtonsView: {
    flexDirection: "row",
    marginHorizontal: wp(5),
    justifyContent: "space-around",
  },
  genderButton: {
    width: wp(40),
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
export default UpdateProfile;
