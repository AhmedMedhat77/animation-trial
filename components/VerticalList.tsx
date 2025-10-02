import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { item } from "@/app/(stack)/animatedFlatList";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

interface VerticalListProps {
  data: item[];
}

type AnimatedCardProps = {
  item: item;
  index: number;
  scrollY: SharedValue<number>;
};
const { height } = Dimensions.get("window");
const _spacing = 4;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacing * 2;
const AnimatedCardComponent = ({ item, index, scrollY }: AnimatedCardProps) => {
  const styles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.93, 1, 0.93],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing,
        },
        styles,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      />
      <Image source={{ uri: item.image }} style={{ flex: 1, height: _itemSize * 0.4 }} />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#FFF" }}>{item.title}</Text>
        <Text numberOfLines={3} style={{ color: "#FFF" }}>
          {item.description}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}>
        <Image
          source={{ uri: item.author.avatar }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        />

        <Text style={{ fontSize: 12, color: "#FFF" }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};

const VerticalList = ({ data }: VerticalListProps) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / _itemFullSize;
  });

  return (
    <AnimatedFlashList
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2,
      }}
      data={data}
      renderItem={({ item, index }) => {
        return <AnimatedCardComponent item={item as item} index={index} scrollY={scrollY} />;
      }}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      onScroll={onScroll}
      scrollEventThrottle={16} // 1000/60 frames to get 60 frames
    />
  );
};

export default VerticalList;

const styles = StyleSheet.create({});
