import { Dimensions, Image, StyleSheet, View, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SliderPagination from "./SliderPagination";
import { LinearGradient } from "expo-linear-gradient";

export interface IImageSliderType {
  id: string;
  source: string;
  url: string;
  description: string;
  title: string;
}

type Props = {
  itemList: IImageSliderType[];
};

const { width } = Dimensions.get("window");

const Slider = ({ itemList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const opacity = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const ref = useAnimatedRef<Animated.FlatList<IImageSliderType>>();
  const offset = useSharedValue(0);

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index % itemList.length);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => (scrollX.value = e.contentOffset.x),
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x || 0;
    },
  });

  // Smoothly transition opacity when the image changes
  useDerivedValue(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, [paginationIndex]);

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  return (
    <>
      {/* Background Image with Gradient and Smooth Blur Effect */}
      <View style={styles.absoluteImageContainer}>
        <Animated.View style={[styles.animatedImageContainer, { opacity }]}>
          <Image
            source={{ uri: data[paginationIndex]?.url }}
            style={styles.absoluteImage}
            blurRadius={50}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.gradientOverlay}
          />
        </Animated.View>
      </View>

      <View>
        <Animated.FlatList
          ref={ref}
          onScroll={onScrollHandler}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} scrollX={scrollX} />
          )}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onScrollBeginDrag={() => setIsAutoPlay(false)}
          onScrollEndDrag={() => setIsAutoPlay(true)}
        />
        <SliderPagination items={data} scrollX={scrollX} paginationIndex={paginationIndex} />
      </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  absoluteImageContainer: {
    position: "absolute",
    width: width,
    height: "100%",
  },
  animatedImageContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  absoluteImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradientOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
});
