import { Ionicons } from "@expo/vector-icons";
import { VideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

interface VideoComponentProps {
  shouldPlay: boolean;
  player: VideoPlayer;
  likes: number;
  comments: number;
  shares: number;
  title: string;
}

const VideoComponent = ({
  shouldPlay,
  player,
  likes,
  comments,
  shares,
  title,
}: VideoComponentProps) => {
  const videoRef = useRef<VideoView>(null);
  const [isLiked, setIsLiked] = useState(false);
  const heartScale = useSharedValue(1);
  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  useEffect(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay, player]);

  return (
    <View style={[styles.container]}>
      <VideoView
        ref={videoRef}
        style={styles.video}
        player={player}
        fullscreenOptions={{ enable: true }}
        nativeControls={true}
      />
      {/* Right side actions */}
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setIsLiked(!isLiked);
            heartScale.value = withSpring(1.2, { damping: 10, stiffness: 200 });
            setTimeout(() => {
              heartScale.value = withSpring(1, { damping: 10, stiffness: 200 });
            }, 1000);
          }}
        >
          <Animated.View style={animatedHeartStyle}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={32}
              color={isLiked ? "#ff3040" : "white"}
            />
          </Animated.View>
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={28} color="white" />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={28} color="white" />
          <Text style={styles.actionText}>{shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom info */}
      <View style={styles.bottomInfo}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <Text style={styles.username}>@username</Text>
        </View>
      </View>
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    height: height,
    backgroundColor: "black",
    position: "relative",
  },
  video: {
    width: width - 10,
    height: height,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    marginRight: 10,
  },
  username: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  rightActions: {
    position: "absolute",
    right: 15,
    bottom: 100,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  bottomInfo: {
    position: "absolute",
    bottom: 100,
    left: 15,
    right: 80,
  },
});
