import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import database from "@react-native-firebase/database";
import { firebase } from "@react-native-firebase/auth";
import style from "../../Theme/styles";
import colors from "../../Theme/Colors";
import { hp, wp } from "../../utilis/Responsive";
import { CustomFonts } from "../../Theme/Fonts";
class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      arr: [],
      Noncheck: false,
      arrList: [],
      arrToSendBack: [],
      refresh: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user details", user);
      if (user) {
        this.test(user.uid);
      }
    });
  }
  static propTypes = {
    title: PropTypes.any,
    onPressBack: PropTypes.any,
    searchIconName: PropTypes.bool,
    filter: PropTypes.bool,
    visible: PropTypes.bool,
    TestingFunc: PropTypes.func,
  };
  test = (id) => {
    database()
      .ref("/mosqueList")
      .on("value", (snapshot) => {
        let data = snapshot.val();

        for (let key in data) {
          data[key].hashNumber = key;
          this.state.arr.push(data[key]);
        }
        let Profiledata;
        database()
          .ref("profile/" + id)
          .on("value", (snapshot) => {
            Profiledata = snapshot.val();
            console.log("ProfileData", Profiledata);
            if (Profiledata == null) {
            } else {
              if (Profiledata.mosques == undefined) {
              } else {
                for (let index = 0; index < this.state.arr.length; index++) {
                  for (
                    let index2 = 0;
                    index2 < Profiledata.mosques.length;
                    index2++
                  ) {
                    if (
                      this.state.arr[index].hashNumber ===
                      Profiledata.mosques[index2]
                    ) {
                      this.state.arrList.push(this.state.arr[index]);
                    }
                  }
                }
              }
            }
          });
      });
    this.setState({ refresh: !this.state.refresh });
  };
  setMasjidd = (item, i) => {
    let items = this.state.arrList;
    if ((items[i].checked = items[i].checked)) {
      items[i].checked = !items[i].checked;
      if (this.state.arrToSendBack.includes(item)) {
        let index = this.state.arrList.indexOf(item);
        if (this.state.arrToSendBack.length == 1) {
          this.state.arrToSendBack.length = 0;
          this.setState({ arrToSendBack: [] });
        } else {
          this.state.arrToSendBack.splice(index, 1);
        }
      }
    } else {
      items[i].checked = true;
      this.setState({ Noncheck: false });
      this.state.arrToSendBack.push(item);
    }
    this.setState({ arrList: items });
    this.state.arrToSendBack.push;
  };
  pressDone = () => {
    this.setState({ visible: false });
    if (this.state.arrToSendBack.length == 0) {
      this.props.TestingFunc("NoFilter");
    } else if (this.state.Noncheck == true) {
      this.props.TestingFunc("NoFilter");
    } else {
      this.props.TestingFunc(this.state.arrToSendBack);
    }
  };
  noCenter = () => {
    this.setState({ Noncheck: !this.state.Noncheck });
    if (this.state.Noncheck == false) {
      for (let index = 0; index < this.state.arrList.length; index++) {
        this.state.arrList[index].checked = false;
      }
      this.setState({ arrToSendBack: [] });
    }
  };
  flatlistseparator = () => {
    return <View style={styles.seperator} />;
  };
  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        {!this.props.backIcon ? (
          <TouchableOpacity
            onPress={this.props.onPressBack}
            style={styles.backButton}
          >
            <MaterialIcons
              color={colors.white}
              size={hp(3)}
              name={"keyboard-arrow-left"}
            />
            <Text style={[style.forgetText, { fontSize: 15 }]}>Back </Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={require("../../Assets/fb_logo.jpg")}
            style={{ height: hp(5), width: wp(10) }}
            resizeMode="contain"
          />
        )}
        <Text
          style={[style.thickHeader, styles.headerText, this.props.headerText]}
        >
          {this.props.title}{" "}
        </Text>
        {this.props.searchIconName ? (
          <FontAwesome
            color={colors.white}
            size={hp(3)}
            name={"search"}
            style={styles.searchIcon}
          />
        ) : null}
        {this.props.filter ? (
          <Octicons
            onPress={() => this.setState({ visible: !this.state.visible })}
            color={this?.props?.filterIconColor || colors.white}
            size={25}
            name={"settings"}
            style={styles.filterIcon}
          />
        ) : null}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {
            this.setState({ visible: false });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({ visible: false })}
            >
              <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalStyles}>
              <FlatList
                data={this.state.arrList}
                extraData={this.state.refresh}
                style={styles.modalParent}
                ListFooterComponent={
                  <TouchableOpacity onPress={() => this.pressDone()}>
                    <Text style={styles.doneText}>DONE</Text>
                  </TouchableOpacity>
                }
                ListHeaderComponent={
                  <View>
                    <Text style={styles.centersText}>Centers</Text>
                    <TouchableOpacity
                      onPress={() => this.noCenter()}
                      style={styles.listContainer}
                    >
                      <Text style={styles.noneText}>None</Text>
                      <FontAwesome
                        color={
                          this.state.Noncheck
                            ? colors.primary
                            : "rgba(0,0,0,0.2)"
                        }
                        size={25}
                        name={this.state.Noncheck ? "dot-circle-o" : "circle-o"}
                        style={{ textAlign: "right" }}
                      />
                    </TouchableOpacity>
                  </View>
                }
                ItemSeparatorComponent={this.flatlistseparator}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      backgroundColor: colors.white,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setMasjidd(item, index);
                      }}
                      style={styles.filterListContainer}
                    >
                      <Text style={styles.filterItemText}>{item.name}</Text>
                      <FontAwesome
                        color={
                          item.checked ? colors.primary : "rgba(0,0,0,0.2)"
                        }
                        size={25}
                        name={item.checked ? "dot-circle-o" : "circle-o"}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visible: false })}
          >
            <View style={{ flex: 1 }}></View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    backgroundColor: "rgba(112,128,144,0.4)",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "center",
  },
  headerText: {
    color: colors.white,
    fontSize: hp(2.2),
    marginHorizontal: wp(3),
    letterSpacing: 1,
    alignSelf: "center",
  },
  searchIcon: { textAlign: "right", marginHorizontal: wp(3) },
  filterIcon: {
    textAlign: "center",
    alignSelf: "center",
    transform: [{ rotate: "270deg" }],
  },
  modalStyles: {
    marginTop: Platform.OS == "ios" ? "20%" : "15%",
    width: wp(60),
    marginHorizontal: wp(4),
  },
  modalParent: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  doneText: {
    color: colors.primary,
    fontSize: hp(1.8),
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    fontFamily: CustomFonts.bold,
  },
  centersText: {
    color: colors.black,
    fontSize: hp(2),
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    fontFamily: CustomFonts.regular,
  },
  listContainer: {
    flexDirection: "row",
    marginVertical: hp(1),
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
  },
  noneText: {
    color: colors.black,
    fontSize: hp(2),
    fontFamily: CustomFonts.regular,
  },
  seperator: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  filterListContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: hp(1),
    marginHorizontal: wp(2),
  },
  filterItemText: {
    alignSelf: "center",
    color: colors.black,
    fontFamily: CustomFonts.regular,
    width: wp(50),
    fontSize: hp(1.9),
  },
});
export default BackButton;
