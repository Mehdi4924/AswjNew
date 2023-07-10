import React, { Component } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import style from "../Theme/styles";
import colors from "../Theme/Colors";

class Btn extends Component {
  static propTypes = {
    text: PropTypes.string,
    containerStyle: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.any,
    isLoading: PropTypes.bool,
  };
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        onPress={this.props.onPress}
        disabled={this?.props?.isLoading || false}
      >
        {!!this.props.isLoading ? (
          <ActivityIndicator size={"small"} color={colors.white} />
        ) : (
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

export { Btn };
