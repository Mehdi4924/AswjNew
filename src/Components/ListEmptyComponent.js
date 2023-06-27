import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../Theme/Colors";
import { hp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";

export default function ListEmptyComponent(props) {
  return (
    <View style={[styles.emptyContainer, props.emptyContainer]}>
      <Text style={[styles.noDataText, props.noDataText]}>
        {props?.text || "No Data Found"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    width: "100%",
    // height: hp(70),
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    color: colors.white,
    fontFamily: CustomFonts.bold,
    fontSize: hp(1.6),
  },
});
