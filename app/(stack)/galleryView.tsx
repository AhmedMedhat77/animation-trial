import { faker } from "@faker-js/faker/.";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

const data = [...Array(20).entries()].map(() => {
  return { image: faker.image.urlPicsumPhotos() };
});

const _imageSize = 80;
const _spacing = 10;

const galleryView = () => {
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    // bottom scroll
    // IF the middle of the thumbnail > middle of the screen scroll to center
    if (index * (_imageSize + _spacing) - _imageSize / 2 > width / 2) {
      bottomRef.current?.scrollToOffset({
        offset: index * (_imageSize + _spacing) - width / 2 + _imageSize / 2,
        animated: true,
      });
    } else {
      bottomRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        keyExtractor={(item) => item.image}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const index = Math.floor(ev.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
          scrollToActiveIndex(index);
        }}
        data={data}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image source={{ uri: item.image }} style={StyleSheet.absoluteFillObject} />
          </View>
        )}
      />
      <FlatList
        ref={bottomRef}
        style={{ position: "absolute", bottom: _imageSize }}
        contentContainerStyle={{ paddingHorizontal: _spacing }}
        keyExtractor={(item) => item.image}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: _imageSize,
                height: _imageSize,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: activeIndex === index ? "#fff" : "transparent",
                marginRight: _spacing,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default galleryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
