import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useState } from "react";

const StatusBorder = ({
  statusCount = 0,
  size = 250,
  strokeWidth = 3,
}: {
  statusCount?: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {};
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate segment properties
  const segmentAngle = 360 / Math.max(statusCount, 1);
  const gapAngle = 5; // Gap between segments in degrees
  const effectiveSegmentAngle = segmentAngle - gapAngle;
  const segmentLength = (circumference * effectiveSegmentAngle) / 360;

  const renderSegments = () => {
    if (statusCount === 0) {
      return (
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
        />
      );
    }

    if (statusCount === 1) {
      // Single status - full circle
      return (
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#statusGradient)"
          strokeWidth={strokeWidth}
          fill="none"
        />
      );
    }

    // Multiple statuses - separate segments
    const segments = [];
    for (let i = 0; i < statusCount; i++) {
      const startAngle = i * segmentAngle - 90; // Start from top
      const endAngle = startAngle + effectiveSegmentAngle;

      // Calculate start and end points for the arc
      const startX = size / 2 + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = size / 2 + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = size / 2 + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = size / 2 + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = effectiveSegmentAngle > 180 ? 1 : 0;
      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

      segments.push(
        <Circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#statusGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${segmentLength} ${(gapAngle * Math.PI * radius) / 180}`}
          strokeDashoffset={-i * (segmentLength + (gapAngle * Math.PI * radius) / 180)}
          strokeLinecap="round"
        />
      );
    }

    return segments;
  };

  return (
    <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="statusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#25D366" />
            <Stop offset="50%" stopColor="#128C7E" />
            <Stop offset="100%" stopColor="#075E54" />
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.3}
        />

        {/* Status segments */}
        {renderSegments()}
      </Svg>
    </Animated.View>
  );
};

const ReelScreen = () => {
  const [statusCount, setStatusCount] = useState(0);

  const addStatus = () => {
    setStatusCount((prev) => Math.min(prev + 1));
  };

  const resetStatus = () => {
    setStatusCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>WhatsApp Status Border</Text>
      <Text style={styles.subtitle}>Status Count: {statusCount}</Text>

      <View style={styles.statusContainer}>
        <StatusBorder statusCount={statusCount} />
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://thumbs.dreamstime.com/b/generative-ai-illustration-unrecognizable-person-pink-flamingo-head-colorful-fancy-clothes-streets-big-city-272110300.jpg",
            }}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={addStatus}>
          <Text style={styles.buttonText}>Add Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetStatus}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  statusContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  imageContainer: {
    position: "absolute",
    backgroundColor: "#FFF",
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 120,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#25D366",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resetButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
