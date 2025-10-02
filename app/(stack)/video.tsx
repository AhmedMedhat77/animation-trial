import { useVideoPlayer } from "expo-video";
import { StyleSheet, View } from "react-native";
import { useState, useRef, Ref, useEffect } from "react";
import { FlashList, FlashListProps, FlashListRef, ViewToken } from "@shopify/flash-list";

import { SafeAreaView } from "react-native-safe-area-context";
import VideoComponent from "@/components/VideoComponent";

const videoSource = [
  {
    id: 1,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Big Buck Bunny Adventure",
    likes: 1234,
    comments: 56,
    shares: 89,
  },
  {
    id: 2,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Elephants Dream Story",
    likes: 2345,
    comments: 78,
    shares: 123,
  },
  {
    id: 3,
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "For Bigger Blazes",
    likes: 3456,
    comments: 90,
    shares: 156,
  },
];

export default function VideoScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flashListRef = useRef<FlashListProps<any>>(null);

  // Create players for each video
  const players = videoSource.map((video) =>
    useVideoPlayer(video.url, (player) => {
      player.loop = true;
      player.muted = false;
      player.playbackRate = 1;
    })
  );

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<any>[] }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index || 0;

      // Pause all videos first
      players.forEach((player) => {
        if (player) {
          player.pause();
        }
      });

      // Play only the active video
      if (players[newIndex]) {
        players[newIndex].play();
      }

      setActiveIndex(newIndex);
    }
  };

  // Auto-play first video
  useEffect(() => {
    if (players[0]) {
      players[0].play();
    }
  }, [players]);

  const renderItem = ({ item, index }: { item: (typeof videoSource)[0]; index: number }) => {
    return (
      <VideoComponent
        player={players[index]}
        shouldPlay={activeIndex === index}
        likes={item.likes}
        comments={item.comments}
        shares={item.shares}
        title={item.title}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        ref={flashListRef as Ref<FlashListRef<(typeof videoSource)[0]>>}
        data={videoSource}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
