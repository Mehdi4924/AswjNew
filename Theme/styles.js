import { StyleSheet } from "react-native";
import Color from './Colors'
const style = StyleSheet.create({
  lightheader: {
    fontFamily: 'Montserrat-Light',
    color: "#fff",
    alignSelf: "center",
    fontSize: 15,
  },
  thickHeader: {
    fontFamily: 'Montserrat-Bold',
    color: "#fff",
    alignSelf: "center",
    fontSize: 14,
  },
  forgetText: {
    fontFamily: 'Montserrat-Regular',
    color: "#fff",
    alignSelf: "center",
    fontSize: 18,
  },
  btnMain: {
    color: "#fff",
    alignSelf: "center",
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    letterSpacing: 1
  },
  safeareaview:{
    flex: 1 ,backgroundColor:Color.statusbarColor
  }
});

export default style
