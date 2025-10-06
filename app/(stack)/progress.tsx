import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useAnimatedProps,
  withDelay,
} from "react-native-reanimated";
import { DefaultStyle } from "react-native-reanimated/lib/typescript/hook/commonTypes";

const progress = () => {
  const progressValues = Array.from({ length: 3 }).map(() => useSharedValue(0));

  const createAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      return {
        width: `${progressValues[index].value}%` as DefaultStyle["width"],
      };
    });
  };

  const startAnimation = () => {
    progressValues.forEach((value, index) => {
      const delay = index * 200;
      value.value = withDelay(delay, withTiming(100, { duration: 1000 }));
    });
  };
  const stopAnimation = () => {
    progressValues.forEach((value) => {
      value.value = 0;
    });
  };

  const setActiveIndex = (number: number) => {
    progressValues.forEach((value, index) => {
      if (index === number) {
        value.value = withDelay(index * 200, withTiming(100, { duration: 1000 }));
      } else {
        value.value = 0;
      }
    });
  };

  useEffect(() => {
    progressValues.forEach((value, index) => {
      const delay = index * 200;

      value.value = withDelay(delay, withTiming(100, { duration: 1000 }));
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {Array.from({ length: 3 }).map((v, index) => {
          const animatedStyle = createAnimatedStyle(index);
          return (
            <View style={[styles.progress]} key={String(index)}>
              <Animated.View style={[styles.progressSpan, animatedStyle]} />
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startAnimation} />
        <Button title="reset" onPress={stopAnimation} />
        <Button title="active index 1" onPress={() => setActiveIndex(0)} />
      </View>
    </View>
  );
};

export default progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  progress: {
    width: 100,
    height: 10,
    backgroundColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  progressSpan: {
    height: 10,

    backgroundColor: "#f00",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
});
