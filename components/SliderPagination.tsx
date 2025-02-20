import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { IImageSliderType } from "./Slider";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
type props = {
  items: IImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("window");

const SliderPagination = ({ items, paginationIndex, scrollX }: props) => {
  return (
    <View style={styles.container}>
      {items?.map((_, index) => {
        const pgAnimatedStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );
          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            style={[
              styles.dot,
              pgAnimatedStyle,
              { backgroundColor: paginationIndex === index ? "#e7e7e7" : "#aaa" },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default SliderPagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#aaa",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
