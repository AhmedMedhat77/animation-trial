import { StyleSheet, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const SIZE = 100;
const circleRadius = (SIZE + 50) * 2;

const draggable = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin((e) => {
      e.absoluteX = translateX.value;
      e.absoluteY = translateY.value;
    })
    .onChange((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onFinalize((e) => {
      // calc distance
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      // if distance is less than the circle radius + half of the box size
      if (distance < circleRadius + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, AnimatedStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
};

export default draggable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    borderRadius: 20,
  },
  circle: {
    width: circleRadius,
    height: circleRadius,
    borderRadius: circleRadius / 2,
    borderWidth: 3,
    borderColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
