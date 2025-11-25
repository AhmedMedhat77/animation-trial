import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import backgroundImage from "@/assets/images/background.jpg";
import foregroundImage from "@/assets/images/foreground.png";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const parallax = () => {
  const { sensor, isAvailable } = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  useDerivedValue(() => {
    const { pitch, roll, yaw } = sensor.value;
    console.log("pitch", pitch, "roll", roll, "yaw", yaw);
  });

  const foregroundStyle = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = sensor.value;
    return {
      transform: [
        {
          translateX: withSpring(-roll * 50, { damping: 200 }),
        },
        {
          translateY: withSpring(-pitch * 50, { damping: 200 }),
        },
      ],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const { pitch, roll, yaw } = sensor.value;
    return {
      transform: [
        {
          translateX: withSpring(-roll * 25, { damping: 200 }),
        },
        {
          translateY: withSpring(-pitch * 25, { damping: 200 }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Parallax</ThemedText>
      <Animated.Image source={backgroundImage} style={[styles.image, backgroundStyle]} />
      <Animated.Image source={foregroundImage} style={[styles.foregroundImage, foregroundStyle]} />
    </View>
  );
};

export default parallax;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  foregroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#FFF",
    zIndex: 2,
    padding: 20,
    textAlign: "center",
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});
