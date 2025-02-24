import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";

const SIZE = 100;
const screens = [
  {
    title: "Basic",
    path: "/basic",
  },
  {
    title: "draggable",
    path: "/draggable",
  },
  {
    title: "Animated Scroll View",
    path: "/animatedScrollView",
  },
  {
    title: "animated Theme",
    path: "/animatedTheme",
  },
  {
    title: "doubleAndSingleTap",
    path: "/doubleAndSingleTap",
  },
  {
    title: "AnimatedCarousel",
    path: "/animatedCarousel",
  },
  {
    title: "Test",
    path: "/test",
  },
  {
    title: "form",
    path: "/form",
  },
  {
    title: "AnimatedFlatList",
    path: "/animatedFlatList",
  },
  {
    title: "GalleryView",
    path: "/galleryView",
  },
] as { title: string; path: Href }[];

const index = () => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.title}
        data={screens}
        numColumns={2}
        contentContainerStyle={{
          flex: 1,
          gap: 20,
        }}
        renderItem={({ item }) => (
          <Link href={item.path} asChild>
            <TouchableOpacity style={styles.boxContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 20,
  },
  boxContainer: {
    width: SIZE * 1.2,
    height: SIZE * 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    marginHorizontal: 30,
    borderColor: "#D7d7",
    elevation: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    padding: 10,
  },
});
