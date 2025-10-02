import { useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import Svg, { Circle, G } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
interface DonutProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
  color: string;
  duration: number;
  delay: number;
  textColor: string;
  max: number;
  showText?: boolean;
}

const Donut = ({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 0,
  textColor = "#fff",
  max = 100,
  showText = true,
}: DonutProps) => {
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = useSharedValue(circumference);
  const textValue = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));

  const animatedTextStyle = useAnimatedProps(() => ({
    text: `${Math.round(textValue.value)}%`,
  }));

  useEffect(() => {
    const maxPercentage = (100 * percentage) / max;
    const targetOffset = circumference - (circumference * maxPercentage) / 100;

    strokeDashoffset.value = withDelay(delay, withTiming(targetOffset, { duration: duration }));
    textValue.value = withDelay(delay, withTiming(percentage, { duration: duration }));
  }, [percentage, circumference, duration, delay, max]);

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        {/* group */}
        <G transform={`rotate(-90 ${halfCircle} ${halfCircle})`}>
          {/* background circle */}
          <Circle
            cy={"50%"}
            cx={"50%"}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={0.2}
          />
          {/* progress circle */}

          <AnimatedCircle
            cy={"50%"}
            cx={"50%"}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            opacity={1}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
      {showText && (
        <View style={styles.textContainer}>
          <AnimatedTextInput
            style={[
              styles.text,
              {
                fontSize: radius / 2,
                fontWeight: "900",
                color: textColor || color,
              },
            ]}
            animatedProps={animatedTextStyle as any}
            value={`${percentage}%`}
          />
        </View>
      )}
    </View>
  );
};

export default Donut;

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
