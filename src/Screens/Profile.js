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
  Platform,
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
import style from '../../Theme/styles'
const Profile = ({ navigation, route }) => {
  const [Name, onChangeName] = useState();
  const [errors, setError] = useState(null);
  // const [text, settext] = useState("Nearby AWSJ Centers");
  const [color, setColor] = useState(false);
  const windowHeight = Dimensions.get("window").height;

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
        // if (arr.length == 0) {
        test(user.uid);
        // }
      }
    });

  }, []);

  const test = async (id) => {
    database()
      .ref("/mosqueList")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let arr = []
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
              if(data.mosques!=undefined){
                setMosqKey(data.mosques)
                }
              if (data.gender == "male") {
                setmale(true);
              } else {
                setfemale(true);
              }
              if(data.mosques==undefined||data.mosques==null){}
              else{
              let fields = []
              for (let index = 0; index < arr.length; index++) {
                for (let index2 = 0; index2 < data.mosques.length; index2++) {
                  if (arr[index].hashNumber === data.mosques[index2]) {
                    arr[index].check = true;
                    fields.push(arr[index].name)
                  }
                }
              }
            
              settext(fields)
            }
              setarr(arr)
              setRefresh(!refresh);
            }
          });
      });

    setRefresh(!refresh);
  };
  const setMasjidd = (check, name, key) => {
    let found=false;
    for (const index in MosqKey) {
      if (MosqKey[index] === key) {
        found = true
        MosqKey.splice(index, 1);
      } else {
        found = false
        // MosqKey.push(key)

      }
    }
    let Textfound=false;
    for (const index in text) {
      if (text[index] === name) {
        Textfound = true
        text.splice(index, 1);
      } else {
        Textfound = false
        // text.push(name)

      }
    }
    if (found==false) {
      // alert("here")
      MosqKey.push(key)
    }
    if (Textfound==false) {
      text.push(name)
    }
  };

  const onSubmit = () => {
    // let gen, gensss;
    let gen = male || female ? true : false
    let gensss = male ? 'male' : female ? 'female' : ''

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
        .update({
          fullName: Name,
          gender: gensss,
          mosques: MosqKey,
        })
        .then(() => console.log("Data updated."));

      setshowModal(true);
      setMessage("Your profile is updated!!");
      setColor(true)
      
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
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: Platform.OS=='ios'?'30%':windowHeight-580,
            marginVertical: '10%',
          }}
        >
          <Text
            style={{
              letterSpacing: 2,
              color: "#fff",
              alignSelf: "center",
              fontFamily: 'Montserrat-Bold',
              fontSize: 21,
            }}
          >
            USER{" "}
          </Text>
          <Text
            style={{
              letterSpacing: 2,
              fontFamily: 'Montserrat-Light',
              color: "#fff",
              fontWeight: "600",
              alignSelf: "center",
              fontSize: 21,
            }}
          >
            PROFILE
          </Text>
        </View>

        <FormInput
          iconName_p={"user-alt"}
          placeholder={"Full Name"}
          value={Name}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          style={{ color: "#fff", fontFamily: 'Montserrat-Medium', flex: 1 }}
          text_input_container={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: Platform.OS=='ios'?15:5,
            borderWidth: 3,
            borderBottomColor: "#00A300",
            borderColor: "transparent",
          }}
          onChangeText={(Name) => {
            setError(""), onChangeName(Name), setinputBorder(true);
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
            style={{ color: "rgba(255,255,255, 0.6)", marginHorizontal: 15, fontFamily: 'Montserrat-Medium' }}
          >
            {text.join()}
          </Text>
          <MaterialIcons
            color={"rgba(255,255,255,0.2)"}
            size={25}
            name={"arrow-drop-down"}
            style={{ marginHorizontal: 35 }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginHorizontal: 20,justifyContent:'space-around' }}>
          <TouchableOpacity
            onPress={() => {
              setmale(!male), setfemale(false);
            }}
            style={{
              flexDirection: "row",
              flex:1,
              // width:30,
              justifyContent: "space-around",
              // justifyContent: "space-between",
              backgroundColor: "rgba(255,255,255, 0.1)",
              // backgroundColor: "red",
              marginHorizontal: 10,
              marginVertical: 10,
              paddingVertical: 15,
              // paddingHorizontal: 5,
            }}
          >
            <Text
              style={{ color: "rgba(255,255,255, 0.9)",fontFamily: 'Montserrat-Light',textAlign:'center' }}
            >
              MALE
            </Text>
            <FontAwesome
              color={male ? "#00A300" : "rgba(255,255,255,0.2)"}
              size={25}
              name={male ? "dot-circle-o" : "circle-o"}
              style={{ textAlign:'center' }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setfemale(!female), setmale(false);
            }}
            style={{
              flexDirection: "row",
              flex:1,
              justifyContent: "space-around",
              backgroundColor: "rgba(255,255,255, 0.1)",
              // backgroundColor: "red",
              // width:'30%',

              marginHorizontal: 10,
              // paddingHorizontal:20,
              marginVertical: 10,
              paddingVertical: 15,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255, 0.9)", fontFamily: 'Montserrat-Light',textAlign:'center'
              }}
            >
              FEMALE
            </Text>
            <FontAwesome
              color={female ? "#00A300" : "rgba(255,255,255,0.2)"}
              size={25}
              name={female ? "dot-circle-o" : "circle-o"}
              style={{ textAlign:'center' }}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{ position: "absolute", bottom: 0, right: 0, left: 0 }}> */}
        <Btn
          text="UPDATE PROFILE"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={{
            backgroundColor: "#00A300",
            padding: 18,
            marginVertical: 5,
            marginHorizontal: 25
          }}
          textStyle={[style.thickHeader, { color: 'white', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 13, letterSpacing: 1 }]}
        />
        </View>
        </ScrollView>
        {/* </View> */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal2}
          style={{}}
          onRequestClose={() => { }}
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
                data={arrs}
                extraData={refresh}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      //  item.page == 1 ?   item.page=2 :  item.page=1;
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
                      style={{ marginHorizontal: 20, fontFamily: 'Montserrat-Light', }}
                    />
                    <Text style={{ alignSelf: "center", color: "#000", fontFamily: 'Montserrat-Regular',
                      fontSize:15 }}>
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
                    // marginVertical: 20,
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

export default Profile;
