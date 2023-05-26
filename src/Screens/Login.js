import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import BackGround from "../Components/Background";
import ModalValidations from "../Components/ModalValidations";
import auth, { firebase } from "@react-native-firebase/auth";
import { loginValidation } from "../../utilis/validation";
import style from "../../Theme/styles";
import {
  LoginManager,
  Settings,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";

const Login = ({ navigation }) => {
  const [Email, onChangeEmail] = useState("");
  const [Password, onChangePassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [message, setMessage] = useState(null);
  const [showModal, setshowModal] = useState(false);

  Settings.setAppID("2978331529163342");
  useEffect(() => {
    if (showModal === true) {
      setTimeout(() => {
        setshowModal(false);
      }, 3000);
    }
  }, [showModal]);
  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned";
    }
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    return auth().signInWithCredential(appleCredential);
  };
  const LoginFacebook = async () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      async (result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error, "error");
              } else {
                console.log(result);
                const facebookCredential = auth.FacebookAuthProvider.credential(
                  data.accessToken
                );
                firebase
                  .auth()
                  .signInWithCredential(facebookCredential)
                  .catch(function (error) {
                    var errorCode = error.code;
                    if (
                      errorCode ===
                      "auth/account-exists-with-different-credential"
                    ) {
                      setshowModal(true);
                      setMessage(
                        "Error:Email already associated with another account."
                      );
                    } else {
                      console.error(error);
                    }
                  });
              }
            };

            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: "email,name,first_name,middle_name,last_name",
                  },
                },
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        alert("Login failed with error: " + error);
      }
    );
  };
  const onSubmit = () => {
    let validate = loginValidation(Email, Password);
    if (validate.valid == false) {
      setshowModal(true);
      setMessage(validate.errors);
    } else {
      __doSingIn(Email, Password);
    }
  };
  const __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response, "response1");
      if (response) {
      }
    } catch (e) {
      if (
        e.message ==
        "[auth/wrong-password] The password is invalid or the user does not have a password."
      ) {
        setshowModal(true);
        setMessage(
          "Error: The password is invalid or the user does not have a password"
        );
      } else if (
        e.message ==
        "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        setshowModal(true);
        setMessage(
          "Error: There is no user record corresponding to this identifier. The user may have been deleted."
        );
      } else if (
        e.message ==
        "[auth/too-many-requests] We have blocked all requests from this device due to unusual activity. Try again later. [ Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ]"
      ) {
        setshowModal(true);
        setMessage(
          "Error:We have blocked all requests from this device due to unusual activity."
        );
      }
    }
  };
  const guestLogin = async () => {
    await AsyncStorage.setItem("Guest", "1");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <ModalValidations visible={showModal} message={message} />
        {Platform.OS == "ios" ? (
          <StatusBar barStyle="dark-content" backgroundColor={"gray"} />
        ) : null}
        <ScrollView>
          <View>
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
              placeholderTextColor={"rgba(255,255,255, 0.5)"}
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
              text="SIGN IN"
              onPress={() => {
                onSubmit();
              }}
              containerStyle={styles.btnStyles}
              textStyle={style.btnMain}
            />
            <View style={styles.forgotContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                <Text style={style.thickHeader}>Forgot</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={style.thickHeader}>Register</Text>
              </TouchableOpacity>
            </View>
            <Text style={[style.lightheader, { marginVertical: hp(5) }]}>
              OR CONTINUE WITH
            </Text>
            <TouchableOpacity
              onPress={() => LoginFacebook()}
              style={styles.facebookBtn}
            >
              <FontAwesome
                color={colors.white}
                size={hp(2.5)}
                name={"facebook"}
                style={{ marginHorizontal: wp(3) }}
              />
              <Text style={style.btnMain}>LOGIN WITH FACEBOOK</Text>
            </TouchableOpacity>
            {Platform.OS == "ios" ? (
              <TouchableOpacity
                onPress={() => onAppleButtonPress()}
                style={[styles.facebookBtn, { backgroundColor: colors.white }]}
              >
                <AntDesign
                  color={colors.black}
                  size={hp(2.5)}
                  name={"apple1"}
                  style={{ alignSelf: "flex-start", marginHorizontal: 10 }}
                />
                <Text style={[style.btnMain, { color: colors.black }]}>
                  Sign In With Apple
                </Text>
              </TouchableOpacity>
            ) : null}
            <Btn
              text="LOGIN AS A GUEST"
              onPress={() => guestLogin()}
              containerStyle={styles.btnStyles}
              textStyle={style.btnMain}
            />
          </View>
        </ScrollView>
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
  forgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(8),
  },
  facebookBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.facebookButton,
    padding: hp(2),
    marginHorizontal: wp(8),
    marginVertical: hp(1),
    borderRadius: 5,
  },
});
export default Login;
