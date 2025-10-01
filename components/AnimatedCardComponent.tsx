import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { item } from "@/app/(stack)/animatedFlatList";

type AnimatedCardProps = {
  item: item;
};
const { height } = Dimensions.get("window");
const _spacing = 4;
const _itemSize = height * 0.72;

const AnimatedCardComponent = ({ item }: AnimatedCardProps) => {
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1, height: _itemSize }}>
      <Text>AnimatedCardComponent</Text>
    </View>
  );
};

export default AnimatedCardComponent;

const styles = StyleSheet.create({});
