import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

// To get the 70% of screen width
const SIZE = width * 0.7;

interface SlidePageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

const SlideComponent = (props: SlidePageProps) => {
  const inputRange = [
    (props.index - 1) * width,
    props.index * width,
    (props.index + 1) * width,
  ];

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(props.translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2,
    ]);
    const opacity = interpolate(
      props.translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const AnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const borderRadius = interpolate(
      props.translateX.value,
      [
        (props.index - 1) * width,
        props.index * width,
        (props.index + 1) * width,
      ],
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${props.index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, AnimatedStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{props.title}</Text>
      </Animated.View>
    </View>
  );
};

export default SlideComponent;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#fff",
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 50,
  },
});
