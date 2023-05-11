import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";
import BackGround from "../Components/Background";
import BackButton from "../Components/BackButton";
import database from "@react-native-firebase/database";
import moment from "moment";
import style from '../../Theme/styles'
// import { TouchableHighlight } from "react-native-gesture-handler";
const Sessions = ({ navigation, route }) => {
  let key  = route.params.params.key;
  let date = route.params.params.date;
    console.log(route.params.params,"key");
    console.log(route.params.params.key,"key2");
  // let day = moment(date, "mm/dd/yy")
  //   .utcOffset("+05:30")
  //   .format("dddd, MMMM DD YYYY");
  // console.log(day);
  // console.log(key, date);
  const [arr, setarr] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [list, setlist] = useState([
    {
      title: "ASWJ Anual Conference",
      date: "27 january, 2022",
      text: "ASWJ Australia",
    },
    {
      title: "sadsa",
      date: "27 january, 2022",
      text: "Youth Center",
    },
    {
      title: "dsadsa",
      date: "25 january, 2022",
      text: "Youth Center",
    },
    {
      title: "Masjid As Salaam",
      date: "27 january, 2022",
      text: "Masjid As-Salaam",
    },
    {
      title: "ASWJ Auburn",
      date: "27 january, 2022",
      text: "ASWJ Album",
    },
  ]);
  useEffect(() => {
  //  console.log(key);
    if (arr.length == 0 ) {
      // console.log(key);
      test(key);
    }
  }, []);
  const test = () => {
    database()
      .ref("/Schedule List")
      .on("value", (snapshot) => {
        let data = snapshot.child(key).val();
        console.log(data,'data');
        for (let key in data) {
          data[key].hashNumber = key;
          arr.push(data[key]);
        }
        setRefresh(!refresh);

        console.log(arr);

      });

  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <BackButton
          title={"Sessions"}
          onPressBack={() => {
            navigation.goBack(null);
          }}
        />
        <Text style={{ color: "#fff", fontSize: 15, marginHorizontal: 20 , marginVertical:10,   fontFamily: 'Montserrat-Medium',
}}>
          {date}
        </Text>
        <FlatList
          data={arr}
          extraData={refresh}
          renderItem={({ item, key }) => (
            <View>
              <View
                style={{
                  justifyContent: "flex-start",
                  backgroundColor: "rgba(255,255,255, 0.1)",
                  marginVertical: 25,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, marginHorizontal: 20 ,fontFamily: 'Montserrat-Light',
                }}
                >
                  {item.start_time+" "}-{" "+item.end_time}
                </Text>
              </View>
              <Text
                style={{ color: "#fff", fontSize: 15, marginHorizontal: 20,fontFamily: 'Montserrat-Medium',
               }}
              >
                {item.title}
              </Text>
              <TouchableHighlight
               underlayColor={'rgba(0,163,0,0.2)'} 

              style={{flex:1,alignSelf:'flex-start'}}
                onPress={() =>
                  navigation.navigate("SessionDetail", {
                    data: item,
                    date: date,
                  })
                }
              >
                <Text
                  style={{
                    color: "#00A300",
                    fontSize: 13,
                    marginHorizontal: 20,
                    marginVertical:10,
                    letterSpacing:1,
                    // backgroundColor:'black',
                    fontFamily: 'Montserrat-Medium'
                  }}
                >
                  DETAILS
                </Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </BackGround>
    </SafeAreaView>
  );
};

export default Sessions;
