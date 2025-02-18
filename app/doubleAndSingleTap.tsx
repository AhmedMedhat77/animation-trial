import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useRef } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Gesture, TapGestureHandler } from "react-native-gesture-handler";
const { height, width } = Dimensions.get("window");

const DoubleAndSingleTap = () => {
  const progress = useSharedValue(0);
  const doubleTapRef = useRef(null);
  const singleTap = Gesture.Tap().onStart((e) => {
    console.log(e);
  });

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 30, marginBottom: 5 }}>
        Double tap to like the image
      </Text>
      <TapGestureHandler
        waitFor={doubleTapRef}
        numberOfTaps={1}
        onActivated={(e) => {
          console.log("Single tap ");
        }}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={(e) => {
            console.log("Double Tap");
          }}
        >
          <Animated.Image
            source={require("../assets/images/like-image.jpg")}
            style={styles.image}
          />
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default DoubleAndSingleTap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    objectFit: "cover",
    width,
    height: height / 2,
  },
});
