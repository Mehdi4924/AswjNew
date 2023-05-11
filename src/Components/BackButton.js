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
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Filter from "./Filter";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalDropdown from "react-native-modal-dropdown";
import database from "@react-native-firebase/database";
import auth, { firebase } from "@react-native-firebase/auth";
import style from '../../Theme/styles'
import Profile from "../Screens/Profile";
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.test(user.uid);
      }
    });
  }
  //   state = {
  //    ,
  //   };

  static propTypes = {
    // visible: PropTypes.bool,
    title: PropTypes.any,
    onPressBack: PropTypes.any,
    searchIconName: PropTypes.bool,
    filter: PropTypes.bool,
    visible: PropTypes.bool,
    TestingFunc: PropTypes.func,
  };
  // componentDidMount() {

  // }
  //   props.func('My name is Dean Winchester & this is my brother Sammie');

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

            if (Profiledata == null) { }
            else {
              if (Profiledata.mosques == undefined) { }
              else {
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
                      //   alert("barbie");
                      //   console.log("here");
                      this.state.arrList.push(this.state.arr[index]);
                    }
                  }
                }
              }
            }
          });
      });

    console.log("arrlist", this.state.arrList);
    this.setState({ refresh: !this.state.refresh });
  };
  setMasjidd = (item, i) => {
    // alert("hii")
    console.log(item,i);
    let items = this.state.arrList;
    if ((items[i].checked = items[i].checked)) {
      items[i].checked = !items[i].checked;
      // alert("hiiii222")

      if (this.state.arrToSendBack.includes(item)) {
        // alert("hiiii")
        let index = this.state.arrList.indexOf(item);
        if(this.state.arrToSendBack.length==1){
          // alert("one Lenghth")
          this.state.arrToSendBack.length=0;
          this.setState({arrToSendBack:[]})

        }
        else{

        
        this.state.arrToSendBack.splice(index, 1);
        }
        console.log('pop',this.state.arrToSendBack);
        // alert(JSON.stringify(this.state.arrToSendBack))
      }
    }
    else {
      items[i].checked = true;
      this.setState({ Noncheck: false });
      this.state.arrToSendBack.push(item);
      console.log("push",this.state.arrToSendBack);

    }
    // items[i].checked = items[i].checked ? !items[i].checked : true;
    this.setState({ arrList: items });
    this.state.arrToSendBack.push
  };
  pressDone = () => {
    this.setState({ visible: false });
    // alert(this.state.Noncheck)
    if (this.state.arrToSendBack.length == 0) {
      // alert("nodata")
      this.props.TestingFunc("NoFilter");
    }
    else if(this.state.Noncheck==true)
    {
      this.props.TestingFunc("NoFilter");

    }
    else {
      // alert(JSON.stringify(this.state.arrToSendBack))

      this.props.TestingFunc(this.state.arrToSendBack);
    }
  };
  noCenter = () => {
    // alert("here");
    this.setState({ Noncheck: !this.state.Noncheck });
    if (this.state.Noncheck == false) {
      //   alert("here");
      for (let index = 0; index < this.state.arrList.length; index++) {
        this.state.arrList[index].checked = false;
      }
      this.setState({arrToSendBack:[]})


    }
  };
  flatlistseparator = () => {
    return (
      // <TouchableOpacity disabled={true}>
      <View
        style={{
          borderBottomColor: "rgba(0,0,0,0.2)",
          borderBottomWidth: 1,
          // borderBottomWidth: 15,
          marginHorizontal: 10
        }}
      ></View>
      // </TouchableOpacity>
    );
  };
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 20,
          backgroundColor: "rgba(112,128,144,0.04)",
        }}
      >
        <TouchableOpacity
          onPress={this.props.onPressBack}
          style={{ flexDirection: "row", alignSelf: "center" }}
        >
          <MaterialIcons
            color={"#fff"}
            size={25}
            name={"keyboard-arrow-left"}
            style={{ marginHorizontal: 8 }}
          />
          <Text style={[style.forgetText, { fontSize: 15 }]}
          >BACK </Text>
        </TouchableOpacity>
        <Text
          style={[style.thickHeader, {
            color: "#fff",
            fontSize: 18,
            marginHorizontal: 20,
            letterSpacing: 1,
            alignSelf: "center",
          }]}
        >
          {this.props.title}{" "}
        </Text>
        {this.props.searchIconName ? (
          <FontAwesome
            color={"#fff"}
            size={25}
            name={"search"}
            style={{ flex: 1, textAlign: "right", marginHorizontal: 15 }}
          />
        ) : null}
        {this.props.filter ? (
          <Octicons
            onPress={() => this.setState({ visible: true })}
            color={"#fff"}
            size={25}
            name={"settings"}
            style={{
              flex: 1,
              textAlign: "center",
              alignSelf: "center",
              marginHorizontal: 160,
              position: "absolute",
              width: "100%",
              transform: [{ rotate: "270deg" }],
            }}
          />
        ) : null}
        {/* <TouchableOpacity */}
        <TouchableOpacity
          style={
            {
              backgroundColor: 'red'
            }
          }
        >
          <Modal

            style={{ marginVertical: 50 }}
            animationType="none"
            transparent={true}
            visible={this.state.visible}
            onRequestClose={() => {
              this.setState({ visible: false });
            }}
          >

            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>

                <View style={{ flex: 1 }}>

                </View>
              </TouchableWithoutFeedback>

              <View

                // disabled={true}
                // onPress={() => alert('hii')}
                style={{
                  // flex: 1,
                  alignSelf: "flex-end",
                  flex: 2,
                  // justifyContent: "center",
                  // marginVertical: 60,
                  marginTop: Platform.OS=='ios'?'20%':'15%',
                  // height: "80%",
                  width: "60%",
                  marginHorizontal: 20,
                }}
              >

                <FlatList
                  data={this.state.arrList}
                  extraData={this.state.refresh}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 5,
                  }}
                  ListFooterComponent={
                    <TouchableOpacity onPress={() => this.pressDone()}>
                      <View
                        style={{
                          borderBottomColor: "rgba(0,0,0,0.2)",
                          borderBottomWidth: 1,
                          marginHorizontal: 10
                        }}
                      ></View>
                      <Text
                        style={{
                          color: "#00A300",
                          fontSize: 13,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          fontFamily: 'Montserrat-Medium'
                          // justifyContent: "flex-end",
                          // textAlign: "right",
                        }}
                      >
                        DONE
                      </Text>
                    </TouchableOpacity>
                  }
                  ListHeaderComponent={
                    <View>
                      <Text
                        style={{
                          color: "#000",
                          fontSize: 13,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          marginTop: '8%',
                          fontFamily: 'Montserrat-Regular'
                          // textAlign: "right",
                        }}
                      >
                        Centers
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.noCenter()}
                        style={{
                          flexDirection: "row",
                          // justifyContent: "flex-end",
                          marginVertical: 10,

                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 15,
                            marginHorizontal: 10,
                            fontFamily: 'Montserrat-Regular'
                          }}
                        >

                          None
                        </Text>

                        <FontAwesome
                          color={
                            this.state.Noncheck ? "#00A300" : "rgba(0,0,0,0.2)"
                          }
                          size={25}
                          name={this.state.Noncheck ? "dot-circle-o" : "circle-o"}
                          style={{ textAlign: "right", marginHorizontal: 10 }}
                        />

                      </TouchableOpacity>
                      <View
                        style={{
                          borderBottomColor: "rgba(0,0,0,0.2)",
                          borderBottomWidth: 1,
                          marginHorizontal: 10
                        }}
                      >
                        {/* <Text>aniqa</Text> */}
                      </View>
                    </View>
                  }
                  ItemSeparatorComponent={this.flatlistseparator}
                  renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: "#fff", marginVertical: 3 }}>
                      <TouchableOpacity
                        onPress={() => {

                          this.setMasjidd(item, index);
                        }}
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}
                      >
                        <Text style={{ alignSelf: "center", color: "#000", fontFamily: 'Montserrat-Regular', width: '90%', fontSize: 15 }}>
                          {item.name}
                        </Text>
                        <FontAwesome
                          color={item.checked ? "#00A300" : "rgba(0,0,0,0.2)"}
                          size={25}
                          name={item.checked ? "dot-circle-o" : "circle-o"}
                          style={{ textAlign: "right" }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>

            </View>
            <TouchableWithoutFeedback onPress={() => this.setState({ visible: false })}>

              <View style={{ flex: 1 }}>

              </View>
            </TouchableWithoutFeedback>


          </Modal>
        </TouchableOpacity>
      </View>
    );
  }
}
export default BackButton;
