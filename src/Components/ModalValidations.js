import React, { useState, useEffect } from "react";
import { Text, View, Modal } from "react-native";
import PropTypes from "prop-types";
import colors from "../../Theme/Colors";
class ModalValidations extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.any,
    color: PropTypes.bool,
  };
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => null}
      >
        <View
          style={{
            marginHorizontal: "2%",
            backgroundColor: this.props.color
              ? colors.primary
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
