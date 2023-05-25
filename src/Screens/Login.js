import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StatusBar,
  Platform,
  TextInput,
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
import { useFocusEffect } from "@react-navigation/core";
import {
  LoginManager,
  Settings,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
// Settings.initializeSDK();
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "../../Theme/Colors";
import { ScrollView } from "react-native-gesture-handler";

const Login = ({ navigation }) => {
  const [Email, onChangeEmail] = useState("");
  const [Password, onChangePassword] = useState("");
  const [errors, setError] = useState(null);
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
    // navigation.navigate("Home")
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
            <Text style={[style.lightheader, { marginTop: "15%" }]}>
              ASWJ COMPANION
            </Text>

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={style.thickHeader}>SIGN IN </Text>
              <Text
                style={[
                  style.lightheader,
                  {
                    alignSelf: "center",
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
                backgroundColor: "rgba(255,255,255, 0.1)",
                marginHorizontal: 30,
                marginVertical: 10,
                paddingVertical: Platform.OS == "ios" ? 15 : 5,
              }}
              onChangeText={(Email) => {
                setError(""), onChangeEmail(Email.trim());
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
                marginHorizontal: 30,
              }}
              onChangeText={(Password) => {
                setError(""), onChangePassword(Password);
              }}
            />

            <Btn
              text="SIGN IN"
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
                  fontFamily: "Montserrat-ExtraBold",
                  fontSize: 13,
                  letterSpacing: 1,
                },
              ]}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                <Text style={[style.thickHeader, { letterSpacing: 2 }]}>
                  Forgot
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={[style.thickHeader, { letterSpacing: 2 }]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 12,
                marginVertical: 20,
                fontFamily: "Montserrat-Regular",
                color: "#fff",
                alignSelf: "center",
                // fontSize: 15,
              }}
            >
              OR CONTINUE WITH
            </Text>
            <TouchableOpacity
              onPress={() => LoginFacebook()}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#2a4685",
                paddingVertical: Platform.OS == "ios" ? 10 : 8,
                marginHorizontal: 30,
                marginVertical: 10,
                borderRadius: 5,
              }}
              textstyle={{ color: "#fff", fontWeight: "bold" }}
            >
              <FontAwesome
                color={"#fff"}
                size={20}
                name={"facebook"}
                style={{ alignSelf: "center", marginHorizontal: 15 }}
              />

              <Text
                style={[
                  style.thickHeader,
                  {
                    fontFamily: "Montserrat-Medium",
                    fontSize: 13,
                    letterSpacing: 1,
                  },
                ]}
              >
                LOGIN WITH FACEBOOK
              </Text>
            </TouchableOpacity>
            {Platform.OS == "ios" ? (
              // <AppleButton
              //   buttonStyle={AppleButton.Style.WHITE}
              //   buttonType={AppleButton.Type.SIGN_IN}
              //   style={{
              //     width: '84%', // You must specify a width
              //     height: '6%', // You must specify a height
              //     marginHorizontal: 30,
              //     // marginVertical: 15

              //   }}
              //   onPress={() => onAppleButtonPress()}
              // />
              <TouchableOpacity
                onPress={() => onAppleButtonPress()}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  paddingVertical: Platform.OS == "ios" ? 10 : 8,
                  marginHorizontal: 30,
                  // marginVertical: 10,
                  borderRadius: 5,
                }}
                textstyle={{ color: "#fff", fontWeight: "bold" }}
              >
                <AntDesign
                  color={"#000"}
                  size={20}
                  name={"apple1"}
                  style={{ alignSelf: "flex-start", marginHorizontal: 10 }}
                />

                <Text
                  style={[
                    style.thickHeader,
                    {
                      fontFamily: "Montserrat-Bold",
                      fontSize: 13,
                      letterSpacing: 0,
                      color: "#000",
                    },
                  ]}
                >
                  Sign In With Apple
                </Text>
              </TouchableOpacity>
            ) : null}
            <Btn
              text="LOGIN AS A GUEST"
              onPress={() => guestLogin()}
              containerStyle={{
                backgroundColor: "#00A300",
                padding: 12,
                marginHorizontal: 30,
                marginVertical: Platform.OS == "ios" ? 12 : 0,
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
        </ScrollView>
      </BackGround>
    </SafeAreaView>
  );
};

export default Login;
