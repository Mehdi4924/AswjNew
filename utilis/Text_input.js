import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import { AppText } from "./AppText";
import colors from "../Theme/Colors";
import { hp, wp } from "./Responsive";
import { CustomFonts } from "../Theme/Fonts";

class FormInput extends Component {
  static propTypes = {
    error: PropTypes.any,
    iconName: PropTypes.string,
    containerStyle: PropTypes.any,
    icon_color: PropTypes.string,
    onPress_icon: PropTypes.func,
    ForgetPassword: PropTypes.func,
    forget: PropTypes.bool,
    iconName_s: PropTypes.string,
    text_input_container: PropTypes.any,
    predefineText: PropTypes.string,
    predefineContainer: PropTypes.any,
    predefineTextStyle: PropTypes.any,
    maxLength: PropTypes.any,
    iconName_pColor: PropTypes.any,
  };

  render() {
    return (
      <View style={[this.props.containerStyle]}>
        <View style={this.props.text_input_container}>
          {this.props.iconName_s !== undefined ? (
            <AntDesign
              name={this.props.iconName_s}
              color={colors.white}
              size={hp(2.5)}
              style={styles.iconStyles}
            />
          ) : null}
          {this.props.iconName_p !== undefined ? (
            <FontAwesome5
              name={this.props.iconName_p}
              color={colors.white}
              size={hp(2.5)}
              style={styles.iconStyles}
            />
          ) : null}
          {this.props.predefineText ? (
            <View style={this.props.predefineContainer}>
              <Text>{this.props.predefineText}</Text>
              <TextInput {...this.props} autoCapitalize="none" />
            </View>
          ) : (
            <TextInput {...this.props} autoCapitalize="none" />
          )}

          {this.props.iconName !== undefined ? (
            <TouchableOpacity
              onPress={this.props.onPress_icon}
              style={styles.rightIconStyles}
            >
              <Ionicons
                name={this.props.iconName}
                color={this.props.icon_color}
                size={hp(2.5)}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {this.props.forget && (
          <TouchableOpacity onPress={this.props.ForgetPassword}>
            <Text style={styles.forgotText}>Forget password?</Text>
          </TouchableOpacity>
        )}
        {this.props.error && (
          <AppText style={styles.errorText}>{this.props.error}</AppText>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyles: { alignSelf: "center", marginHorizontal: wp(4) },
  rightIconStyles: {
    alignSelf: "center",
    paddingHorizontal: wp(6),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  forgotText: {
    textAlign: "right",
    color: colors.white,
    fontFamily: CustomFonts.light,
    paddingHorizontal: wp(8),
    fontSize: hp(1.8),
  },
  errorText: {
    color: "red",
    fontSize: hp(1.5),
    fontFamily: CustomFonts.bold,
    paddingHorizontal: wp(8),
  },
});
export { FormInput };
