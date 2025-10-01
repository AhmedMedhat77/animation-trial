import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Easing } from "react-native";
import { Href, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const screens = [
  {
    title: "Reels",
    path: "/(stack)/reel",
    icon: "play-circle-outline",
    color: "#FF4500",
  },
  {
    title: "Basic",
    path: "/(stack)/basic",
    icon: "play-circle-outline",
    color: "#FF6B6B",
  },
  {
    title: "OnBoarding",
    path: "/(stack)/onBoarding",
    icon: "rocket-outline",
    color: "#4ECDC4",
  },
  {
    title: "Draggable",
    path: "/(stack)/draggable",
    icon: "move-outline",
    color: "#45B7D1",
  },
  {
    title: "Animated Scroll View",
    path: "/(stack)/animatedScrollView",
    icon: "list-outline",
    color: "#96CEB4",
  },
  {
    title: "Animated Theme",
    path: "/(stack)/animatedTheme",
    icon: "color-palette-outline",
    color: "#FFEAA7",
  },
  {
    title: "Double & Single Tap",
    path: "/(stack)/doubleAndSingleTap",
    icon: "finger-print-outline",
    color: "#DDA0DD",
  },
  {
    title: "Animated Carousel",
    path: "/(stack)/animatedCarousel",
    icon: "images-outline",
    color: "#98D8C8",
  },
  {
    title: "Test",
    path: "/(stack)/test",
    icon: "flask-outline",
    color: "#F7DC6F",
  },
  {
    title: "Form",
    path: "/(stack)/form",
    icon: "document-text-outline",
    color: "#BB8FCE",
  },
  {
    title: "Animated FlatList",
    path: "/(stack)/animatedFlatList",
    icon: "grid-outline",
    color: "#85C1E9",
  },
  {
    title: "Gallery View",
    path: "/(stack)/galleryView",
    icon: "library-outline",
    color: "#F8C471",
  },
  {
    title: "Circular Status",
    path: "/(stack)/circularStatus",
    icon: "radio-button-on-outline",
    color: "#25D366",
  },
  {
    title: "Advanced Status",
    path: "/(stack)/advancedCircularStatus",
    icon: "pulse-outline",
    color: "#128C7E",
  },
] as { title: string; path: Href; icon: string; color: string }[];

const AnimatedCard = ({ item, index }: { item: (typeof screens)[0]; index: number }) => {
  const router = useRouter();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  };

  const handlePress = () => {
    router.push(item.path as any);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[styles.boxContainer, { backgroundColor: item.color }]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[item.color, `${item.color}80`]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={32} color="white" />
          </View>
          <Text style={styles.titleText}>{item.title}</Text>
          <View style={styles.shine} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const index = () => {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-50);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withTiming(0, { duration: 800 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.headerTitle}>Animation Playground</Text>
        <Text style={styles.headerSubtitle}>Explore beautiful animations</Text>
      </Animated.View>

      <FlashList
        keyExtractor={(item) => item.title}
        data={screens}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => <AnimatedCard item={item} index={index} />}
      />
    </LinearGradient>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  boxContainer: {
    width: (width - 60) / 2,
    height: 140,
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    textTransform: "capitalize",
  },
  shine: {
    position: "absolute",
    top: -50,
    left: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    transform: [{ rotate: "45deg" }],
  },
});
