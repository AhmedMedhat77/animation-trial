import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
const duration = 2000;

const test = () => {
  const defaultAnim = useSharedValue<number>(width / 2 - 160);
  const linear = useSharedValue<number>(width - 160);
  const animatedWidth = useSharedValue(0);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
    width: animatedWidth.value,
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  React.useEffect(() => {
    linear.value = withRepeat(
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );

    animatedWidth.value = withRepeat(
      withTiming(100, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    defaultAnim.value = withRepeat(
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true
    );
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={{ color: "#FFF" }}>Loading...</Text>
      </Animated.View>
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  box: {
    width: 300,
    height: 20,
    borderWidth: 1,
    borderColor: "violet",
    justifyContent: "center",
    alignItems: "center",
  },
});
