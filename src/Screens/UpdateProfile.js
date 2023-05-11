import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
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
const UpdateProfile = ({ navigation, route }) => {
  const [Name, onChangeName] = useState("");
  const [text, settext] = useState("Nearby AWSJ Centers");
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
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);
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
      setcolor(true)
      navigation.navigate("Login");
    }
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
  
        <ModalValidations visible={showModal} message={message} color={color} />
<ScrollView>
<View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 200,
            marginVertical: 50,
          }}
        >
          <Text
            style={[
              style.thickHeader,
              {
                fontSize: 25,
              },
            ]}
          >
            USER{" "}
          </Text>
          <Text
            style={[
              style.lightheader,
              {
                fontSize: 25,
              },
            ]}
          >
            PROFILE
          </Text>
        </View>

        <FormInput
          iconName_p={"user-alt"}
          placeholder={"Full Name"}
          value={Name}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          style={{ color: "#fff", flex: 1,    fontFamily: 'Montserrat-Regular',
        }}
          text_input_container={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: Platform.OS=='ios'?15:5,
            borderWidth: 3,
            borderBottomColor:
              inputBorder && Name ? "#00A300" : "rgba(255, 0, 0,0.4)",
            borderColor: "transparent",
          }}
          onChangeText={(Name) => {
            onChangeName(Name), setinputBorder(true);
          }}
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
            style={{ color: "rgba(255,255,255, 0.6)", marginHorizontal: 15 ,    fontFamily: 'Montserrat-Light',
          }}
          >
            {text}
          </Text>
          <MaterialIcons
            color={"rgba(255,255,255,0.2)"}
            size={25}
            name={"arrow-drop-down"}
            style={{ marginHorizontal: 35 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
          <TouchableOpacity
            onPress={() => {
              setmale(!male), setfemale(false);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "rgba(255,255,255, 0.1)",
              marginHorizontal: 2,
              marginVertical: 10,
              paddingVertical: 15,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{ color: "rgba(255,255,255, 0.9)", marginHorizontal: 15,    fontFamily: 'Montserrat-Regular',
            }}
            >
              MALE
            </Text>
            <FontAwesome
              color={male ? "#00A300" : "rgba(255,255,255,0.2)"}
              size={25}
              name={male ? "dot-circle-o" : "circle-o"}
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setfemale(!female), setmale(false);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "rgba(255,255,255, 0.1)",
              marginHorizontal: 30,
              marginVertical: 10,
              paddingVertical: 15,
            }}
          >
            <Text
              style={{ color: "rgba(255,255,255, 0.9)", marginHorizontal: 15,    fontFamily: 'Montserrat-Regular',
            }}
            >
              FEMALE
            </Text>
            <FontAwesome
              color={female ? "#00A300" : "rgba(255,255,255,0.2)"}
              size={25}
              name={female ? "dot-circle-o" : "circle-o"}
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}>
          <Btn
            text="UPDATE PROFILE"
            onPress={() => {
              onSubmit();
            }}
            containerStyle={{
              backgroundColor: "#00A300",
              padding: 18,
              marginVertical: 0,
            }}
            textStyle={[style.thickHeader, { color: 'white', textAlign: 'center', fontFamily: 'Montserrat-ExtraBold', fontSize: 13, letterSpacing: 1 }]}
            />
        </View>

</View>
</ScrollView>

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
                      color={item.check ? "#00A300" : "rgba(0,0,0,0.4)"}
                      style={{ marginHorizontal: 20 }}
                    />
                    <Text style={{ alignSelf: "center", color: "#000",fontFamily: 'Montserrat-Regular',
                      fontSize:15  }}>
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
                    marginVertical: 20,
                    width: '49.7%',
                    borderBottomLeftRadius: 20,
                  }}
                  textStyle={[style.thickHeader, { color: 'white', textAlign: 'center', fontFamily: 'Montserrat-Medium', fontSize: 13, letterSpacing: 1 }]}

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
                    width: '49.7%',
                    marginVertical: 20,
                    borderBottomRightRadius: 20,
                  }}
                  textStyle={[style.thickHeader, { color: 'white', textAlign: 'center', fontFamily: 'Montserrat-Medium', fontSize: 13, letterSpacing: 1 }]}

                />
              </View>
            </View>
          </View>
        </Modal>
      </BackGround>
    </SafeAreaView>
  );
};

export default UpdateProfile;
