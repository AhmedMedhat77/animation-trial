import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");

interface IItem {
  id: string;
  source: string;
  url: string;
  description: string;
  title: string;
}

const _borderRadius = 20;
const _imageHeight = 500;
const _imageWidth = 300;

const SliderItem = (props: { item: IItem; index: number; scrollX: SharedValue<number> }) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            props.scrollX.value,
            [(props.index - 1) * width, props.index * width, (props.index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            props.scrollX.value,
            [(props.index - 1) * width, props.index * width, (props.index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemsContainer, rnAnimatedStyle]}>
      <Image source={{ uri: props.item.url }} style={styles.image} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="heart-outline" size={28} color={"#FFF"} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.description}>{props.item.description}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
  },
  image: {
    width: _imageWidth,
    height: _imageHeight,
    borderRadius: _borderRadius,
    objectFit: "cover",
  },
  gradient: {
    position: "absolute",
    width: _imageWidth,
    height: _imageHeight,
    borderRadius: _borderRadius,
    padding: 20,
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 5,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  description: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 1.2,
  },
});
