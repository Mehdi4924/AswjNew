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
class Filter extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.any,
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          this.props.visible = false;
        }}
      >
        <View style={{ backgroundColor: "#fff" }}>
          <Text>Aniqa</Text>
        </View>
      </Modal>
    );
  }
}
export default Filter;
