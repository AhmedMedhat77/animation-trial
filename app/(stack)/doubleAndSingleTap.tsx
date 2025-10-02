import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
  interpolateColor,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
const { height, width } = Dimensions.get("window");
export const THEME_IMAGE =
  "https://thumbs.dreamstime.com/b/generative-ai-illustration-unrecognizable-person-pink-flamingo-head-colorful-fancy-clothes-streets-big-city-272110300.jpg";

const DoubleAndSingleTap = () => {
  const scale = useSharedValue(1);
  const colors = useSharedValue(1);
  const textScale = useSharedValue(1);
  const textOpacity = useSharedValue(0.7);
  const glowIntensity = useSharedValue(0);
  
  const doubleTap = Gesture.Tap().onStart((e) => {
    scale.value = withSpring(1.5);
  });

  const heartStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value, { damping: 10, stiffness: 200 }) }],
    };
  });

  const colorStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(colors.value, [0, 1], ["#fff", "#000"]),
    };
  });

  const textStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: textScale.value }],
      opacity: textOpacity.value,
      textShadowColor: '#FFD700',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: glowIntensity.value * 10,
    };
  });

  useEffect(() => {
    colors.value = withRepeat(withTiming(1, { duration: 1 }), -1, true);
    
    // Text scale animation
    textScale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
    
    // Text opacity animation
    textOpacity.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      true
    );
    
    // Glow intensity animation
    glowIntensity.value = withRepeat(
      withTiming(1, { duration: 1800 }),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, colorStyles, textStyles]}>Double tap to like the image</Animated.Text>
      <View style={{ position: "relative" }}>
        <GestureDetector gesture={doubleTap}>
          <View style={styles.overlay} />
        </GestureDetector>
        <Animated.Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/generative-ai-illustration-unrecognizable-person-pink-flamingo-head-colorful-fancy-clothes-streets-big-city-272110300.jpg",
          }}
          style={[styles.image]}
        />
        <Animated.View style={[styles.heart, heartStyles]}>
          <Ionicons name="heart" size={24} color="red" />
        </Animated.View>
      </View>
    </View>
  );
};

export default DoubleAndSingleTap;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 5,
    color: "#FFF",
    fontWeight: "bold",
  },

  image: {
    objectFit: "cover",
    width: width * 0.8,
    height: height / 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    elevation: 30,
    shadowColor: "#DDD",
    shadowOffset: { width: 30, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    zIndex: 10,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
