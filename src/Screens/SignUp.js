import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import BackGround from "../Components/Background";
import { Signup_validation } from "../../utilis/validation";
import ModalValidations from "../Components/ModalValidations";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
const SignUp = ({ navigation }) => {
  const [Email, onChangeEmail] = useState("");
  const [Password, onChangePassword] = useState("");
  const [errors, setError] = useState(null);
  const [secure, setSecure] = useState(true);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);

  const onSubmit = () => {
    let validate = Signup_validation(Email, Password);
    if (validate.valid == false) {
      setshowModal(true);
      setMessage(validate.errors);
    } else {
      __doCreateUser(Email, Password);
    }
  };
  const __doCreateUser = async (email, password) => {
    // alert("here");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        navigation.navigate("UpdateProfile", { uid: user.user.uid });
      })
      .catch(function (error) {
        console.log("error", error);
        // if(error=="")
        setshowModal(true);
        setMessage(
          "Error: The email address is already in use by another account"
        );
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <ModalValidations visible={showModal} message={message} />

        <Text
          style={[
            style.thickHeader,
            {
              marginTop: 30,
            },
          ]}
        >
          ASWJ COMPANION
        </Text>

        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text
            style={[
              style.thickHeader,
              {
                marginVertical: 50,
              },
            ]}
          >
            REGISTER{" "}
          </Text>
          <Text
            style={[
              style.lightheader,
              {
                marginVertical: 50,
              },
            ]}
          >
            NOW
          </Text>
        </View>
        <FormInput
          iconName_s={"email"}
          placeholder={"E-mail"}
          value={Email}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          keyboardType="email-address"
          style={{
            flex: 1,
            color: "#ffff",
            fontFamily: "Montserrat-Medium",
            fontSize: 12,
          }}
          text_input_container={{
            flexDirection: "row",
            // backgroundColor: "red",
            backgroundColor: "rgba(255,255,255, 0.1)",
            marginHorizontal: 30,
            marginVertical: 10,
            paddingVertical: Platform.OS == "ios" ? 15 : 5,
          }}
          onChangeText={(Email) => {
            onChangeEmail(Email.trim());
          }}
        />
        <FormInput
          iconName_s={"lock"}
          placeholder={"Password"}
          value={Password}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          secureTextEntry={secure}
          iconName={secure ? "eye-off" : "eye"}
          icon_color={"#fff"}
          style={{
            flex: 1,
            color: "#ffff",
            fontFamily: "Montserrat-Medium",
            fontSize: 12,
          }}
          onPress_icon={() => setSecure(!secure)}
          text_input_container={{
            flexDirection: "row",
            paddingVertical: 5,
            backgroundColor: "rgba(255,255,255, 0.1)",
            // backgroundColor: "red",
            marginHorizontal: 30,
          }}
          onChangeText={(Password) => {
            onChangePassword(Password);
          }}
        />

        <Btn
          text="NEXT"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={{
            backgroundColor: "#00A300",
            padding: 18,
            marginHorizontal: 30,
            marginVertical: 20,
          }}
          textStyle={[
            style.thickHeader,
            {
              color: "white",
              textAlign: "center",
              fontFamily: "Montserrat-Bold",
              fontSize: 14,
              letterSpacing: 1,
            },
          ]}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[style.thickHeader, { letterSpacing: 2 }]}>SIGN IN</Text>
        </TouchableOpacity>
      </BackGround>
    </SafeAreaView>
  );
};

export default SignUp;
