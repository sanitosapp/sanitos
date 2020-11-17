import React, { Component } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const SpinnerCustom = (props) => {
  return (
    <View>
      <Spinner
        visible={props.visible}
        textContent={"Cargando"}
        textStyle={{ color: "#fff", fontSize: 12 }}
        overlayColor="#49494985"
      />
    </View>
  );
};
export default SpinnerCustom;