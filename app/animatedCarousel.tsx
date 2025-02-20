import { StyleSheet, View } from "react-native";
import React from "react";
import Slider from "@/components/Slider";
import { Stack } from "expo-router";

const imageLinks = [
  {
    id: "ID1",
    source: "Source 1 URL",
    url: "https://thumbs.dreamstime.com/b/generative-ai-illustration-unrecognizable-person-pink-flamingo-head-colorful-fancy-clothes-streets-big-city-272110300.jpg",
    description: "Link to a HQ image of a cat.",
    title: "Title One",
  },
  {
    id: "ID2",
    source: "Source 2 URL",
    url: "https://img.freepik.com/premium-photo/xmas-christmas-gift-present-golden-brilliant-trendy-modern-fancy-hippie-folks-style-wallpaper-art_985204-9411.jpg",
    description: "Another link to a HQ image of a dog.",
    title: "Title two",
  },
  {
    id: "ID3",
    source: "Source 2 URL",
    url: "https://r2.starryai.com/results/396966119/2a2cfdae-17e7-48ad-bebd-17fe5b74d28c.webp",
    description: "Another link to a HQ image of a dog.",
    title: "Title two",
  },
];

const AnimatedCarousel = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Slider itemList={imageLinks} />
    </View>
  );
};

export default AnimatedCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
});
