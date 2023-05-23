import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BackGround from "../Components/Background";
import { Vimeo } from "react-native-vimeo-iframe";
import style from "../../Theme/styles";

const Videos = ({ navigation, route }) => {
  const [link, setLink] = useState("");
  let id = route.params.id;
  let test = id.split("/");
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
    setLink(test[test.length - 1]);
  }, []);

  const findd = (text2) => {
    if (text2 == "") {
      setlist(list);
    }
    let text = text2.toLowerCase();
    let trucks = list;
    let filteredName = trucks.filter((item) => {
      return item.text.toLowerCase().includes(text);
    });
    if (!text || text === "") {
      setlist(list);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
    } else if (Array.isArray(filteredName)) {
      setlist(filteredName);
    }
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
            onPress={() => navigation.goBack(null)}
            style={{ flexDirection: "row", alignSelf: "center" }}
          >
            <MaterialIcons
              color={"#fff"}
              size={25}
              name={"keyboard-arrow-left"}
              style={{ marginHorizontal: 8 }}
            />
            <Text style={[style.forgetText, { fontSize: 15 }]}>BACK </Text>
          </TouchableOpacity>
          <Text
            style={[
              style.ThickHeader,
              {
                color: "#fff",
                fontSize: 18,
                marginHorizontal: 20,
                // fontWeight: "700",
                fontFamily: "Montserrat-Bold",
                letterSpacing: 1,
              },
            ]}
          >
            Videos{" "}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            backgroundColor: "transparent",
          }}
        >
          <Vimeo
            style={{ backgroundColor: "transparent" }}
            videoId={link}
            onReady={() => console.log("Video is ready")}
            onPlay={() => console.log("Video is playing")}
            onPlayProgress={(data) => console.log("Video progress data:", data)}
            onFinish={() => console.log("Video is finished")}
            loop={false}
            autoPlay={true}
            controls={true}
            speed={false}
            time={"0m0s"}
          />
        </View>
      </BackGround>
    </SafeAreaView>
  );
};

export default Videos;
