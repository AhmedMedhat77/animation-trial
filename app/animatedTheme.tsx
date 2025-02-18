import { StyleSheet, Switch, Text } from "react-native";
import React, { useCallback, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const SIZE = 220;
const SWITCH_SIZE = 60;

const COLORS = {
  dark: {
    background: ["#0f0c29", "#302b63", "#24243e"],
    circle: ["#ff6b6b", "#ff8e8e", "#ff6b6b"],
    text: "#f8f9fa",
    switch: "#4ecdc4",
  },
  light: {
    background: ["#C9D6FF", "#E2E2E2"],
    circle: ["#4ecdc4", "#88dacf", "#4ecdc4"],
    text: "#2b2d42",
    switch: "#ff6b6b",
  },
};

const AnimatedThemeSwitcher = () => {
  const progress = useSharedValue(0);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    progress.value = theme === "dark" ? withSpring(1) : withSpring(0);
  }, [theme]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.background[0], COLORS.dark.background[0]]
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.text, COLORS.dark.text]
    ),
    transform: [{ scale: withSpring(progress.value * 0.5 + 1) }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(progress.value * 0.3 + 1) },
      { rotate: `${progress.value * 360}deg` },
    ],
  }));

  const switchStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [COLORS.light.switch, COLORS.dark.switch]
    ),
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <LinearGradient
        colors={
          theme === "light" ? COLORS.light.background : COLORS.dark.background
        }
        style={styles.background}
      />

      <Switch
        value={theme === "dark"}
        onChange={toggleTheme}
        thumbColor="#f8f9fa"
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        style={{
          position: "absolute",
          top: 70,
        }}
      />

      <Animated.Text style={[styles.text, textStyle]}>
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </Animated.Text>

      <Animated.View style={[styles.circle, circleStyle]}>
        <LinearGradient
          colors={theme === "light" ? COLORS.light.circle : COLORS.dark.circle}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Add subtle animated particles */}
      {[...Array(20)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: theme === "light" ? "#4ecdc455" : "#ff6b6b55",
              transform: [
                { translateX: Math.random() * 400 - 200 },
                { translateY: Math.random() * 800 - 400 },
              ],
            },
          ]}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    position: "absolute",
  },
  gradient: {
    flex: 1,
    borderRadius: SIZE / 2,
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 40,
    fontFamily: "HelveticaNeue-CondensedBold",
  },

  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
});

export default AnimatedThemeSwitcher;
