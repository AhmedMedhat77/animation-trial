import { useEffect } from "react";
import { ColorValue, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
  variant?: "default" | "circle" | "text" | "image" | "card";
  color?: "gray" | "blue" | "green" | "purple" | "orange" | "pink";
  glowEffect?: boolean;
  children?: React.ReactNode;
}
const Skeleton = ({
  width = 100,
  height = 100,
  variant = "default",
  color = "gray",
  glowEffect = false,
  children,
}: SkeletonProps) => {
  const sharedValue = useSharedValue(0);
  const glowValue = useSharedValue(0);

  useEffect(() => {
    sharedValue.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // infinite repeat
      true // reverse animation
    );

    if (glowEffect) {
      glowValue.value = withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // infinite repeat
        true // reverse animation
      );
    }
  }, [glowEffect]);

  const getColorScheme = () => {
    switch (color) {
      case "blue":
        return ["#e3f2fd", "#bbdefb"];
      case "green":
        return ["#e8f5e8", "#c8e6c9"];
      case "purple":
        return ["#f3e5f5", "#e1bee7"];
      case "orange":
        return ["#fff3e0", "#ffcc80"];
      case "pink":
        return ["#fce4ec", "#f8bbd9"];
      case "gray":
      default:
        return ["#e0e0e0", "#f0f0f0"];
    }
  };

  const getGlowColor = () => {
    switch (color) {
      case "blue":
        return "#2196f3";
      case "green":
        return "#4caf50";
      case "purple":
        return "#9c27b0";
      case "orange":
        return "#ff9800";
      case "pink":
        return "#e91e63";
      case "gray":
      default:
        return "#757575";
    }
  };

  const glowColor = getGlowColor();

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(sharedValue.value, [0, 1], [0.6, 1]);
    
    const baseStyle = {
      opacity,
    };

    if (glowEffect) {
      const shadowOpacity = interpolate(glowValue.value, [0, 1], [0.3, 0.8]);
      const shadowRadius = interpolate(glowValue.value, [0, 1], [4, 12]);
      const elevation = interpolate(glowValue.value, [0, 1], [2, 8]);
      
      return {
        ...baseStyle,
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity,
        shadowRadius,
        elevation,
      };
    }

    return baseStyle;
  });

  const variantStyle = () => {
    switch (variant) {
      case "circle":
        return {
          width: height,
          height: height,
          borderRadius: "50%",
        };
      case "text":
        break;
      case "image":
        return {
          width: width,
          height: height,
          borderRadius: 10,
        };
      case "card":
        return {
          width: width,
          height: height,
          borderRadius: 10,
        };
      case "default":
        return {
          width: width,
          height: height,
          borderRadius: 10,
        };
      default:
        break;
    }
  };
  const baseColor = getColorScheme()[0];

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        styles.skeleton,
        { width, height, backgroundColor: baseColor },
        variantStyle(),
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
});
