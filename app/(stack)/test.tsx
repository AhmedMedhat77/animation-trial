import Donut from "@/components/Donut";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";

// Constants

const CIRCLE = 200;
const RADIUS = CIRCLE / 2;
const STROKE_WIDTH = 5;
const HALF_CIRCLE = RADIUS + STROKE_WIDTH;
const DIAMETER = 2 * HALF_CIRCLE;
const CIRCUMFERENCE = 3 * Math.PI * RADIUS;

const test = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Themed Text and animated circles</Text>
      <Donut
        percentage={40}
        radius={50}
        strokeWidth={10}
        color="tomato"
        duration={800}
        delay={200}
        textColor="#fff"
        max={100}
      />
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
