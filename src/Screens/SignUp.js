import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import BackGround from "../Components/Background";
import { Signup_validation } from "../../utilis/validation";
import ModalValidations from "../Components/ModalValidations";
import auth, { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
import colors from "../../Theme/Colors";

const SignUp = ({ navigation }) => {
  const [Email, onChangeEmail] = useState("");
  const [Password, onChangePassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      __doCreateUser(Email, Password);
    }
  };
  const __doCreateUser = async (email, password) => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <ModalValidations visible={showModal} message={message} />
        <Text style={[style.thickHeader, { marginTop: hp(8) }]}>
          ASWJ COMPANION
        </Text>
        <View style={styles.signInView}>
          <Text style={style.thickHeader}>SIGN IN </Text>
          <Text style={style.lightheader}>NOW</Text>
        </View>
        <FormInput
          iconName_s={"email"}
          placeholder={"E-mail"}
          value={Email}
          placeholderTextColor={"rgba(255,255,255, 0.6)"}
          keyboardType="email-address"
          style={styles.formInputContainer}
          text_input_container={styles.textInputStyles}
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
          onPress_icon={() => setSecure(!secure)}
          icon_color={colors.white}
          style={styles.formInputContainer}
          text_input_container={styles.textInputStyles}
          onChangeText={(Password) => {
            onChangePassword(Password);
          }}
        />

        <Btn
          text="NEXT"
          onPress={() => {
            onSubmit();
          }}
          containerStyle={styles.btnStyles}
          textStyle={style.btnMain}
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={style.thickHeader}>SIGN IN</Text>
        </TouchableOpacity>
      </BackGround>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  signInView: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: hp(8),
  },
  formInputContainer: {
    flex: 1,
    color: colors.white,
    fontFamily: CustomFonts.regular,
    fontSize: hp(1.6),
  },
  textInputStyles: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255, 0.1)",
    marginHorizontal: wp(8),
    marginVertical: hp(1),
    borderRadius: 5,
  },
  btnStyles: {
    backgroundColor: colors.primary,
    padding: hp(2),
    marginHorizontal: wp(8),
    marginVertical: hp(2),
    borderRadius: 5,
  },
});
export default SignUp;
