import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const svg = () => {
  const length = 5;
  const activeIndex = useSharedValue(0);
  const isAnimating = useSharedValue(true);

  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const scale = interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [0.8, 1.5, 0.8],
        Extrapolation.CLAMP
      );

      const opacity = interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3],
        Extrapolation.CLAMP
      );

      return {
        transform: [
          { scale: isAnimating.value ? scale : 1 },
          { translateY: isAnimating.value ? Math.sin((activeIndex.value + index) * 0.5) * 10 : 0 },
        ],
        opacity: isAnimating.value ? opacity : 0.7,
      };
    });
  };

  const getColorStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = index === activeIndex.value % length;
      const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];

      return {
        backgroundColor: isActive ? colors[index] : "#e0e0e0",
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating.value) {
        activeIndex.value = withTiming((activeIndex.value + 1) % length, { duration: 800 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleAnimation = () => {
    isAnimating.value = !isAnimating.value;
  };

  const resetAnimation = () => {
    activeIndex.value = 0;
    isAnimating.value = true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Animated Dots</Text>
      <Text style={styles.subtitle}>Active: {(activeIndex.value % length) + 1}</Text>

      <View style={styles.circleContainer}>
        {Array.from({ length }, (_, index) => (
          <Animated.View key={index} style={[styles.circleDot, getAnimatedStyle(index)]}>
            <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.dotGradient} />
          </Animated.View>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={toggleAnimation}>
          <Text style={styles.buttonText}>{isAnimating.value ? "Pause" : "Resume"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetAnimation}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default svg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    marginBottom: 60,
  },
  circleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dotGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#667eea",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
