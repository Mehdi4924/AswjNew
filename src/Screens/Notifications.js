import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackGround from "../Components/Background";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import database from "@react-native-firebase/database";
import BackButton from "../Components/BackButton";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import ModalValidations from "../Components/ModalValidations";
const Notification = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [text, settext] = useState("Select Mosques");
  const [Select, setSelect] = useState("Select ");
  const [Centers, setCenters] = useState("Centers ");
  const [arr, setarr] = useState([]);
  const [arrList, setarrList] = useState([]);
  const [Key, setKey] = useState();
  const [color, setColor] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [Mosq, setMosq] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [MosqKey, setMosqKey] = useState([]);
  const [showModal2, setshowModal2] = useState(false);
  const [uid, setUid] = useState();
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUid(user.uid);
  //       console.log(user);
  //       getMasjidList(user.uid)
  //     }
  //   });

  // }, []);

  // const getMasjidList = (id) => {
  //   database()
  //     .ref("/mosqueList")
  //     .on("value", (snapshot) => {
  //       let data = snapshot.val();
  //       for (let key in data) {
  //         data[key].hashNumber = key;
  //         arr.push(data[key]);
  //       }
  //     });
  //   database()
  //     .ref("profile/" + id)
  //     .on("value", (snapshot) => {
  //       let data = snapshot.val();
  //       // console.log(data);
  //       if(data.mosques.length>0){
  //       for (let index = 0; index <data.mosques.length; index++) {
  //         for (let index2 = 0; index2 < arr.length; index2++) {
  //           if (arr[index2].hashNumber === data.mosques[index])
  //             arr[index2].page = 1;

  //         }
  //       }

  //       // for (let index = 0; index < arr.length; index++) {
  //       //   if (MosqKey.includes(arr[index].hashNumber)) {
  //       //   } else {
  //       //     if(arr[index].page===1){

  //       //       setMosqKey([...MosqKey, arr[index].hashNumber]);
  //       //       setMosq([...Mosq, arr[index].name]);

  //       //       console.log(MosqKey);
  //       //       console.log(Mosq);

  //       //     // let text = Mosq.join();

  //       //     // settext(text);
  //       //     }
  //       //   }
  //       // }
  //     }

  //     });

  //   setRefresh(!refresh)
  // }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        // if (arr.length == 0) {
        test(user.uid);
        // }
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
            console.log(data, "PRofileDastaaA");
            if (data == null) {
            } else {
              if (
                data.mosques == undefined ||
                data.mosques == null ||
                data == null
              ) {
              } else {
                setMosqKey(data.mosques);
              }
              if (data !== null) {
                let fields = [];
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

  // const setMasjidd = (page, name, key) => {
  //   if (page == 1) {
  //     Mosq.push(name);
  //     MosqKey.push(key);
  //     let text = Mosq.join();
  //     settext(text);
  //   } else {
  //     let index = Mosq.indexOf(name);
  //     let index2 = MosqKey.indexOf(key);
  //     MosqKey.splice(index2, 1);
  //     Mosq.splice(index, 1);
  //     settext(Mosq);
  //   }
  // };

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
  const onSubmit = () => {
    firebase
      .database()
      .ref("profile/" + uid)
      .update({
        mosques: MosqKey,
      })
      .then(() => console.log("Data updated."));
    setshowModal(true);
    setColor(true);
    setMessage("Notification Centers Updated!!");
  };
  
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Notification"}
          onPressBack={() => navigation.navigate("Home")}
        />
        <ModalValidations visible={showModal} message={message} color={color} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "50%",
            marginVertical: 50,
          }}
        >
          <Text
            style={{
              color: "rgba(255,255,255,0.7)",
              alignSelf: "center",
              marginTop: 30,
              fontFamily: "Montserrat-Medium",
              letterSpacing: 1,
              fontSize: 18,
            }}
          >
            {Select}
          </Text>
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              marginTop: 30,
              fontFamily: "Montserrat-Bold",
              letterSpacing: 1,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {Centers}
          </Text>
          <Text
            style={{
              fontFamily: "sans-serif-thin",
              color: "rgba(255,255,255,0.7)",
              alignSelf: "center",
              marginTop: 30,
              fontFamily: "Montserrat-Medium",
              letterSpacing: 1,
              fontSize: 18,
            }}
          >
            to get Notification
          </Text>
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
            borderColor: "transparent",
          }}
        >
          <Text
            style={{
              color: "#fff",
              marginHorizontal: 15,
              fontFamily: "Montserrat-Light",
            }}
          >
            {text}
          </Text>
          <MaterialIcons
            color={"rgba(255,255,255,0.2)"}
            size={25}
            name={"arrow-drop-down"}
            style={{ marginHorizontal: 35, textAlign: "left" }}
          />
        </TouchableOpacity>

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
                    onPress={() => {
                      item.check = item.check ? !item.check : true;
                      setMasjidd(item.check, item.name, item.hashNumber);
                      setRefresh(!refresh);
                    }}
                    style={{ flexDirection: "row", marginVertical: 15 }}
                  >
                    <MaterialCommunityIcons
                      name={
                        item.check
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={20}
                      color={item.check ? "#00A300" : "	rgba(0,0,0,0.4)"}
                      style={{
                        marginHorizontal: 20,
                        fontFamily: "Montserrat-Light",
                      }}
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
                      fontFamily: "Montserrat-Bold",
                      fontSize: 13,
                      letterSpacing: 1,
                    },
                  ]}
                />
                <Btn
                  text="OK"
                  onPress={() => {
                    setshowModal2(false);
                  }}
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
        <Btn
          text="UPDATE"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={{
            marginBottom: 0,
            backgroundColor: "#00A300",
            padding: 18,
            borderRadius: 10,
            marginVertical: 20,
            position: "absolute",
            height: 60,
            left: 0,
            // top: windowHeight - 80,
            bottom: 0,
            width: windowWidth,
          }}
          textStyle={[
            style.thickHeader,
            {
              color: "white",
              textAlign: "center",
              fontFamily: "Montserrat-Bold",
              fontSize: 13,
              letterSpacing: 1,
            },
          ]}
        />
      </BackGround>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "50%",
    marginBottom: 50,
  },
  text: {
    color: "#00A300",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  dotstyle: {
    color: "red",
  },
});
