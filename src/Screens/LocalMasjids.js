import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Platform,
  TextInput,
  ImageBackground,
  Dimensions,
  Modal,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import { format } from "date-fns";
import { Update_Profile_Validations } from "../../utilis/validation";
import moment from "moment";
import style from '../../Theme/styles'
import { set } from "react-native-reanimated";

const LocalMasjids = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [arrKeys, setarrKeys] = useState([]);
  const [flag, setflag] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [arr2, setarr2] = useState([]);

  const pull_data = (data) => {
    // arr.length=0

    console.log("data", data);
  //   console.log(arr,"arr");
    if (data == "NoFilter") {
      console.log(arr.length,"arr.len");
      // if (arr.length<arr2.length) {
        setarr(arr2)
      // }
    }
  //  else if(data.length==0){
  //     if (arr.length == 0) {
  //       test();
  //     }

  //   } 
  else {
setarrKeys([])
      for (let index = 0; index < data.length; index++) {
        for (let index2 = 0; index2 < arr2.length; index2++) {
          if (arr2[index2].center == data[index].name) {
            // console.log("matched");
            arrKeys.push(arr2[index2]);
          }
        }
      } 
      // arr.length=0
      setarr([])
      setarr(arrKeys);
    
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    if (arr.length == 0) {
      test();
    }
  }, []);
  const test = () => {
    // console.log("test", data);
    setFetching(true)

    database()
      .ref("/Conference List")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        if(arr.length>0){

        }
        else{
        for (let key in data) {
          data[key].hashNumber = key;
          if (data[key].type == "lessons") {
            let str = data[key].start_date;
            let first, second, third, form, month;
            first = str.substring(0, str.indexOf("/"));
            str = str.substring(str.indexOf("/") + 1);
            second = str.substring(0, str.indexOf("/"));
            str = str.substring(str.indexOf("/") + 1, str.length);
            third = str;
  
            month=first-1

  
            var event = new Date(Date.UTC("20" + third, month, second, 3, 0, 0));
            var options = { day: 'numeric', year: 'numeric', month: 'long' };
            data[key].start_date = event.toLocaleDateString('en-us', options)
            arr.push(data[key]);
          }
        }
      
        

        setarr(
          arr.sort(function (a, b) {
            var dateA = new Date(a.start_date).getFullYear();
            var dateB = new Date(b.start_date).getFullYear();
            return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
          })
        );
        }
        setRefresh(!refresh);
setFetching(false)
setarr2(arr)
        // console.log(arr[0]);
      });
  };
  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Masjid Lessons"}
          onPressBack={() => navigation.navigate("Home")}
          filter={true}
          TestingFunc={pull_data}
        />

<View style={{ marginTop: 5 ,flex:1}}>
          <FlatList
            data={arr}
            extraData={refresh}
            // inverted={true}
            onRefresh={()=>test()}
            refreshing={fetching}
            renderItem={({ item, key }) => (
              <View
                style={{
                  justifyContent: "flex-start",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 10,
                  paddingVertical: 15,
                  marginHorizontal: 15,
                }}
              >
                <TouchableOpacity
                style={{marginHorizontal:20}}
                  onPress={() =>
                    navigation.navigate("Sessions", {
                      key: item.hashNumber,
                      date: item.start_date,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      borderRadius: 100,
                      marginVertical:2,
                      fontFamily:'Montserrat-Bold'

                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 16,
                      fontFamily: 'Montserrat-Medium',

                    }}
                  >

                    {item.start_date}
                
                  </Text>
                  <Text style={{ color: "#fff", marginVertical:2,
 fontSize: 15,fontFamily: 'Montserrat-Regular', }}>
                    {item.center}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        {/* </View> */}
      </BackGround>
    </SafeAreaView>
  );
};

export default LocalMasjids;
