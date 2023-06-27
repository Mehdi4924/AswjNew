import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "../../utilis/Responsive";
import colors from "../../Theme/Colors";

const Loader = (props) => {
  const { loading, ...attributes } = props;
  return (
    <Modal visible={loading} transparent={true}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          animating={loading}
          size={hp(3.5)}
          color={colors.primary}
        />
        <Text style={{ color: colors.white, fontSize: hp(2) }}>
          Please wait....
        </Text>
      </View>
    </Modal>
  );
};

export default Loader;
const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(1,1,1,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
});
