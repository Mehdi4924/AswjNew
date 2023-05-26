import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import BackGround from "../Components/Background";
import { ForgetPassword_Validation } from "../../utilis/validation";
import ModalValidations from "../Components/ModalValidations";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import BackButton from "../Components/BackButton";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

const ForgetPassword = ({ navigation }) => {
  const [Email, onChangeEmail] = useState("");
  const [color, setColor] = useState(false);
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
          setColor(true);
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
        <View style={styles.headingStyles}>
          <Text
            style={[
              style.thickHeader,
              {
                fontSize: hp(2),
              },
            ]}
          >
            ASWJ{" "}
          </Text>
          <Text
            style={[
              style.lightheader,
              {
                fontSize: hp(2),
              },
            ]}
          >
            Companion
          </Text>
        </View>
        <View style={styles.forgotText}>
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
          iconName_s={"email"}
          placeholder={"E-mail"}
          value={Email}
          placeholderTextColor={colors.white}
          keyboardType="email-address"
          style={styles.textInputStyles}
          text_input_container={styles.inputContainer}
          onChangeText={(Email) => {
            onChangeEmail(Email.trim());
          }}
        />
        <Btn
          text="SUBMIT"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={styles.btnContainer}
          textStyle={styles.btnTextStyles}
        />
      </BackGround>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headingStyles: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: hp(5),
  },
  forgotText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  textInputStyles: {
    flex: 1,
    color: colors.white,
    fontFamily: CustomFonts.light,
    fontSize: hp(1.6),
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    borderRadius: 5,
  },
  btnContainer: {
    backgroundColor: colors.primary,
    height: hp(7),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp(5),
    borderRadius: 5,
  },
  btnTextStyles: {
    color: colors.white,
    textAlign: "center",
    fontFamily: CustomFonts.bold,
    fontSize: hp(1.5),
    letterSpacing: 1,
  },
});
export default ForgetPassword;
