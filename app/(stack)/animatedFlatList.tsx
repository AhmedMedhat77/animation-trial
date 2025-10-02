import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import VerticalList from "@/components/VerticalList";

const data = [...Array(20).keys()].map(() => ({
  image: faker.image.avatar(),
  bg: faker.color.rgb(),

  title: faker.lorem.sentence({ min: 1, max: 2 }),
  description: faker.lorem.sentences({ min: 1, max: 3 }),
  author: {
    name: faker.person.fullName(),
    avatar: faker.image.avatarGitHub(),
  },
}));

export type item = (typeof data)[0];

const animatedFlatList = () => {
  return (
    <View style={styles.container}>
      <VerticalList data={data} />
    </View>
  );
};

export default animatedFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
  },
});
