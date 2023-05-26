import { StyleSheet } from "react-native";
import colors from "./Colors";
import Color from "./Colors";
import { CustomFonts } from "./Fonts";
const style = StyleSheet.create({
  lightheader: {
    fontFamily: CustomFonts.light,
    color: colors.white,
    alignSelf: "center",
    fontSize: 15,
  },
  thickHeader: {
    fontFamily: CustomFonts.bold,
    color: colors.white,
    alignSelf: "center",
    fontSize: 14,
  },
  forgetText: {
    fontFamily: CustomFonts.regular,
    color: colors.white,
    alignSelf: "center",
    fontSize: 18,
  },
  btnMain: {
    color: colors.white,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: CustomFonts.bold,
    fontSize: 13,
    letterSpacing: 1,
  },
  safeareaview: {
    flex: 1,
    backgroundColor: Color.statusbarColor,
  },
});

export default style;
