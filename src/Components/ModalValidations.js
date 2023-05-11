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
import { relativeTimeThreshold } from "moment";
class ModalValidations extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.any,
    color:PropTypes.bool
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            marginHorizontal: "2%",
            backgroundColor:this.props.color?  "#00A300"
              : "rgba(255, 0, 0,0.80)",
            marginVertical: 10,
            padding: 5,
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              textAlign: "center",
              color: "rgba(255, 255, 255,0.75)",
            }}
          >
            {this.props.message}
          </Text>
        </View>
      </Modal>
    );
  }
}
export default ModalValidations;
