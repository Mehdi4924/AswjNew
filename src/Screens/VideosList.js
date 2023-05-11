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
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BackGround from "../Components/Background";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Vimeo } from "react-native-vimeo-iframe";
import { Update_Profile_Validations } from "../../utilis/validation";
import { getVideos } from "../../utilis/Api/Api_controller";
import style from "../../Theme/styles";
import moment from "moment";

const VideosList = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [text, settext] = useState("Select Mosques");
  const [isloading, setisloading] = useState(false);
  const [search, setsearch] = useState("");
  const [lastPage, setLastPage] = useState();
  const [searchIt, setsearchIt] = useState(false);
  const [page, setPage] = useState(1);
  const [dataaa, setDataaa] = useState([]);
  const [data2, setData2] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [list, setlist] = useState([
    {
      num: 1,
      text: "Supplications to enter Mosque",
    },
    {
      num: 2,
      text: "Supplications to enter Washroom",
    },
    {
      num: 3,
      text: "Supplications to enter Home",
    },
    {
      num: 4,
      text: "Supplications before Sleeping",
    },
    {
      num: 5,
      text: "Supplications upon waking up",
    },
  ]);
  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    setFetching(true)
    if (lastPage == "page=" + page) {
      setisloading(false);
    } else {
      setisloading(true);
      let resp = await getVideos(page);
      let paga = resp.paging.last;
      let test = paga.split("&");
      setLastPage(test[test.length - 1]);
      if(page==1){
        setData2(resp.data)
        
      }
      setPage(resp.page + 1);
      setDataaa(dataaa.concat(resp.data));
      setisloading(false);
    }
    setFetching(false)
  };
  const findd = (text2) => {
    if (text2 == "") {
      setDataaa(dataaa);
    }
    let text = text2.toLowerCase();
    let trucks = dataaa;
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().includes(text);
    });
    if (!text || text === "") {
      // setDataaa(dataaa);
      setDataaa(data2)
      setPage(1)
  

    } else if (!Array.isArray(filteredName) && !filteredName.length) {
    } else if (Array.isArray(filteredName)) {
      setDataaa(filteredName);
    }
  };

  const Loader = () => {
    return (
      <View>
        <ActivityIndicator animating={isloading} size="large" color="#fff" />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.safeareaview}>
      <BackGround>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            backgroundColor: "rgba(112,128,144,0.04)",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
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

          {searchIt ? (
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#fff",
                marginHorizontal: 20,
                maxHeight: 40,
                flexDirection: "row",
              }}
            >
              <FontAwesome5
                color={"#000"}
                size={12}
                name={"search"}
                style={{ alignSelf: "center", marginHorizontal: 15 }}
              />

              <TextInput
                placeholder="Search"
                value={search}
                placeholderTextColor={"#000"}
                style={{ color: "#000", flex: 1 }}
                onChangeText={(Email) => {
                  setsearch(Email), findd(Email);
                }}
              ></TextInput>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={[style.ThickHeader, {
                  color: "#fff",
                  fontSize: 18,
                  marginHorizontal: 20,
                  // fontWeight: "700",
                  fontFamily: 'Montserrat-Bold', letterSpacing: 1,
                }]}
              >
                Videos{" "}
              </Text>
              <FontAwesome
                onPress={() => setsearchIt(true)}
                color={"#fff"}
                size={20}
                name={"search"}
                style={{ flex: 1, textAlign: "right", marginHorizontal: 15 }}
              />
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={dataaa}
            // onRefresh={()=>getDate()}
            // refreshing={fetching}
            onEndReachedThreshold={0.5}
            style={{ flex: 1 }}
            onEndReached={() => getDate()}
            ListFooterComponent={Loader}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 0 }}>
                <Image
                  source={{ uri: item.pictures.sizes[6].link }}
                  style={{ width: 350, height: 200, alignSelf: "center" }}
                ></Image>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Videos", { id: item.link })
                  }
                  style={{
                    alignSelf: "center",
                    marginHorizontal: 25,
                    backgroundColor: "#00A300",
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    borderRadius: 50,
                    margin: 180,
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  <Entypo
                    color={"#fff"}
                    size={30}
                    name={"controller-play"}
                    style={{
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={[style.forgetText, {
                    marginVertical: 35,
                    alignSelf: "center",
                    color: "#fff",
                    marginHorizontal: 15,
                    fontSize: 16,
                  }]}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
      </BackGround>
    </SafeAreaView>
  );
};

export default VideosList;
