import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
  ImageBackground,
  Dimensions,
  Modal,
} from "react-native";
import PropTypes from "prop-types";
const windowHeight = Dimensions.get("window").height;

class ModalGuest extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.any,
  };
  render() {
    return (
      <View
        style={{
          // flex: 1,
          alignSelf: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {}}
        >
          <View
            style={{
              marginHorizontal: "5%",
              marginVertical: 10,
              // flex:1,
              // backgroundColor:'red',
              // alignSelf:'center',
              // flex:1,
              marginVertical: windowHeight-400,
              // position:'absolute',
              // bottom:0,
              backgroundColor: "#fff",
              borderRadius: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                paddingVertical: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                borderWidth: 1,
                // alignContent:'center',
                // justifyContent:'flex-end',
                // alignSelf:'center',
                //   borderBottomColor: "rgba(0, 0, 0,0.2)",
                borderColor: "transparent",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 25,
                  letterSpacing: 1,
                  // textAlign: "justify",
                  marginHorizontal: 20,
                }}
              >
                UNAVAILABLE
              </Text>
            </View>
            <Text
              style={{
                paddingVertical: 10,
                //   paddingHorizontal: 10,
                marginHorizontal: 20,
                color: "#A0A0A0",
              }}
            >
              {/* {this.props.message} */}
              Please login as registered user.
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
export default ModalGuest;
