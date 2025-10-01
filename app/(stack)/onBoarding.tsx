import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewabilityConfigCallbackPairs,
  ViewToken,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const imageLinks = [
  {
    id: "ID1",
    source: "Source 1 URL",
    url: "https://thumbs.dreamstime.com/b/generative-ai-illustration-unrecognizable-person-pink-flamingo-head-colorful-fancy-clothes-streets-big-city-272110300.jpg",
    description: "Discover amazing places and experiences around the world",
    title: "Explore",
  },
  {
    id: "ID2",
    source: "Source 2 URL",
    url: "https://img.freepik.com/premium-photo/xmas-christmas-gift-present-golden-brilliant-trendy-modern-fancy-hippie-folks-style-wallpaper-art_985204-9411.jpg",
    description: "Find the perfect gifts for your loved ones",
    title: "Gift Ideas",
  },
  {
    id: "ID3",
    source: "Source 2 URL",
    url: "https://r2.starryai.com/results/396966119/2a2cfdae-17e7-48ad-bebd-17fe5b74d28c.webp",
    description: "Create beautiful memories that last forever",
    title: "Memories",
  },
];

const { width, height } = Dimensions.get("window");
interface IImageLinks {
  id: string;
  source: string;
  url: string;
  description: string;
  title: string;
}

const onBoarding = () => {
  const activeIndex = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const [isLiked, setIsLiked] = useState(false);

  const [data, setData] = useState(imageLinks);

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0].index !== null) {
      onChangeIndex(viewableItems[0].index % imageLinks.length);
    }
  };
  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
    {
      viewabilityConfig,
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  // Background blur animation
  const backgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [0, width, width * 2],
      [1, 0.8, 0.6],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  // Card scale animation
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
    };
  });

  // Heart animation
  const heartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  // Pagination dots animation
  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const isActive = activeIndex.value === index;
      const scale = withSpring(isActive ? 1.2 : 1, { damping: 15, stiffness: 150 });
      const width = withTiming(isActive ? 24 : 8, { duration: 300 });

      return {
        width,
        transform: [{ scale }],
        backgroundColor: withTiming(isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)", {
          duration: 300,
        }),
      };
    });
  };

  const onChangeIndex = (index: number) => {
    activeIndex.value = withSpring(index, { damping: 15, stiffness: 150 });
    setData(imageLinks.map((item, idx) => ({ ...item, index: idx })));
  };

  const handleCardPress = () => {
    cardScale.value = withSpring(0.95, { damping: 10, stiffness: 200 }, () => {
      cardScale.value = withSpring(1, { damping: 10, stiffness: 200 });
    });
  };

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
    heartScale.value = withSpring(1.3, { damping: 8, stiffness: 200 }, () => {
      heartScale.value = withSpring(1, { damping: 8, stiffness: 200 });
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2", "#f093fb"]} style={styles.container}>
      {/* Animated Background */}
      <Animated.View style={[styles.backgroundImage, backgroundStyle]}>
        <Image
          source={{ uri: data[activeIndex.value]?.url }}
          style={StyleSheet.absoluteFill}
          blurRadius={20}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.1)"]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Header */}
      <Animated.View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
        <Text style={styles.headerSubtitle}>Swipe to explore</Text>
      </Animated.View>

      {/* Cards */}
      <Animated.View style={[styles.cardsContainer, cardAnimatedStyle]}>
        <FlashList
          style={styles.flashList}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          horizontal={true}
          data={data}
          onViewableItemsChanged={onViewableItemsChanged}
          onScroll={(e) => {
            scrollX.value = e.nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={16}
          renderItem={({ item, index }: { item: IImageLinks; index: number }) => (
            <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.9}>
              <Image source={{ uri: item.url }} style={styles.cardImage} contentFit="cover" />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.cardGradient}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
                <Animated.View style={heartAnimatedStyle}>
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={28}
                    color={isLiked ? "#FF6B6B" : "#FFF"}
                  />
                </Animated.View>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        {data.map((v, indx) => (
          <Animated.View style={[styles.circle, getAnimatedStyle(indx)]} key={v.id} />
        ))}
      </View>
    </LinearGradient>
  );
};

export default onBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    inset: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    fontWeight: "500",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  flashList: {
    height: height * 0.6,
    width: width * 0.9,
  },
  card: {
    width: width * 0.85,
    height: height * 0.6,
    marginHorizontal: width * 0.025,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    zIndex: 2,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
    fontWeight: "400",
  },
  heartButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    gap: 12,
  },
  circle: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});
