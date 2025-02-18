import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import SlideComponent from "@/components/SlideComponent";

const WORDS = ["What's", "UP", "User"];

const translateScreen = () => {
  const scrollOffsetX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffsetX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      //  want to Achieve 60 FPS so we set scrollEventThrottle to 16  (1/60 = 16.666666666666668)
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      style={styles.container}
      centerContent={true}
      bounces={true}
      pagingEnabled={true}
      horizontal={true}
    >
      {WORDS.map((word, index) => (
        <SlideComponent
          title={word || ""}
          index={index}
          translateX={scrollOffsetX}
          key={index.toString()}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default translateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
