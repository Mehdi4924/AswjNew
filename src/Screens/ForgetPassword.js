import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Platform,
  ImageBackground,
  Dimensions,
  Modal,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackGround from "../Components/Background";
import { ForgetPassword_Validation } from "../../utilis/validation";
import ModalValidations from "../Components/ModalValidations";
import { Toast, Position, Theme } from "react-native-customized-toast";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import BackButton from "../Components/BackButton";

const ForgetPassword = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [Email, onChangeEmail] = useState("");
  const [Password, onChangePassword] = useState("");
  const [errors, setError] = useState(null);
  const [expTIme, setExpTime] = useState(null);
  const [secure, setSecure] = useState(true);
  const [isloading, setisloading] = useState(false);
  const [color, setColor] = useState(false);

  const [interval, setInterval] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);

  const onSubmit = async () => {
    let validate = ForgetPassword_Validation(Email);
    if (validate.valid == false) {
      setshowModal(true);
      setMessage(validate.errors);
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(Email)
        .then(function (user) {
          setshowModal(true);
          setColor(true)
          setMessage("Password reset email has been sent to your mail");
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <ModalValidations visible={showModal} message={message} color={color} />
        <BackButton onPressBack={() => navigation.navigate("Login")} />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginVertical: 65,
          }}
        >
          <Text
            style={[
              style.thickHeader,
              {
                fontSize: 18,
              },
            ]}
          >
            ASWJ{" "}
          </Text>
          <Text
            style={[
              style.lightheader,
              {
                fontSize: 18,
              },
            ]}
          >
            Companion
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text
            style={[
              style.lightheader,
              {
                fontSize: 18,
              },
            ]}
          >
            FORGOT ?{" "}
          </Text>
          <Text
            style={[
              style.thickHeader,

              {
                fontSize: 18,
              },
            ]}
          >
            PASSWORD?{" "}
          </Text>
        </View>
        <View style={{ marginVertical: 30 }}>
          <Text style={style.forgetText}> Enter your email address </Text>
          <Text style={style.forgetText}>
            {" "}
            You will receive an email with link
          </Text>
          <Text style={style.forgetText}> to reset password</Text>
        </View>
        <FormInput
          // label="Email"2225
          // containerStyle={{flex:1,flexdirection:'row'}}
          iconName_s={"email"}
          placeholder={"E-mail"}
          value={Email}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          keyboardType="email-address"
          style={{ flex: 1, color: "#ffff", fontFamily: 'Montserrat-Medium', fontSize: 12 }}
          text_input_container={{
            flexDirection: "row",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: Platform.OS=='ios'?15:5,
            marginTop: '18%'
          }}
          onChangeText={(Email) => {
            setError(""), onChangeEmail(Email.trim());
          }}
        />

        <Btn
          text="SUBMIT"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={{
            backgroundColor: "#00A300",
            padding: 18,
            marginHorizontal: 30,
            marginVertical: 20,
          }}
          textStyle={[style.thickHeader, { color: 'white', textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 14, letterSpacing: 1 }]}
        />
      </BackGround>
    </SafeAreaView>
  );
};

export default ForgetPassword;
