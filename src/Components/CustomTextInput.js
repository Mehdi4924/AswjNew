import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import colors from "../../Theme/Colors";
import { CustomFonts } from "../../Theme/Fonts";
import { hp, wp } from "../../utilis/Responsive";

export default function CustomTextInput(props) {
  return (
    <View style={[styles.mainView, props?.mainView]}>
      {props?.leftIcon ? (
        <Icon
          name={props?.leftIconName || "email-variant"}
          type={props?.leftIconType || "material-community"}
          color={props?.leftIconColor || colors.grey}
          size={props?.leftIconSize || hp(3)}
          style={props?.leftIconStyle}
        />
      ) : null}
      <TextInput
        value={props?.value}
        contextMenuHidden={props?.contextMenuHidden || false}
        placeholder={props?.placeholder}
        onChangeText={(t) => props.onChangeText(t)}
        style={[styles.textInputStyles, props?.textInputStyles]}
        placeholderTextColor={props?.placeholderTextColor || colors.primary}
        secureTextEntry={props?.secureTextEntry || false}
        multiline={props?.multiline || false}
        numberOfLines={props?.numberOfLines || 1}
        keyboardType={props?.keyboardType || "email-address"}
        onContentSizeChange={props?.onContentSizeChange}
        returnKeyType={"done"}
      />
      {props?.icon ? (
        <TouchableOpacity onPress={props?.onPress}>
          <Icon
            name={props?.iconName || "lock-check"}
            type={props?.iconType || "material-community"}
            color={props?.iconColor || colors.grey}
            size={props.rightIconSize || hp(3)}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "space-around" },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp(7),
    width: wp(90),
    marginVertical: hp(0.5),
    paddingHorizontal: wp(2),
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  textInputStyles: {
    width: wp(78),
    fontSize: hp(1.8),
    color: colors.black,
    fontFamily: CustomFonts.Regular,
  },
});
