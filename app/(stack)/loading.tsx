import React, { useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

const { width } = Dimensions.get("window");

// Spinner Loading Component
const SpinnerLoader = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.spinner, animatedStyle]}>
        <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.spinnerGradient} />
      </Animated.View>
    </View>
  );
};

// Dots Loading Component
const DotsLoader = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(withTiming(1, { duration: 600 }), withTiming(0, { duration: 600 })),
      -1,
      false
    );

    dot2.value = withDelay(
      200,
      withRepeat(
        withSequence(withTiming(1, { duration: 600 }), withTiming(0, { duration: 600 })),
        -1,
        false
      )
    );

    dot3.value = withDelay(
      400,
      withRepeat(
        withSequence(withTiming(1, { duration: 600 }), withTiming(0, { duration: 600 })),
        -1,
        false
      )
    );
  }, []);

  const dot1Style = useAnimatedStyle(() => {
    const scale = interpolate(dot1.value, [0, 1], [0.5, 1.2], Extrapolation.CLAMP);
    const opacity = interpolate(dot1.value, [0, 1], [0.3, 1], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const dot2Style = useAnimatedStyle(() => {
    const scale = interpolate(dot2.value, [0, 1], [0.5, 1.2], Extrapolation.CLAMP);
    const opacity = interpolate(dot2.value, [0, 1], [0.3, 1], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const dot3Style = useAnimatedStyle(() => {
    const scale = interpolate(dot3.value, [0, 1], [0.5, 1.2], Extrapolation.CLAMP);
    const opacity = interpolate(dot3.value, [0, 1], [0.3, 1], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.dotsContainer}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
};

// Circular Progress Loading
const CircularProgressLoader = () => {
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false);

    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [2 * Math.PI * 50, 0],
      Extrapolation.CLAMP
    );

    return {
      strokeDashoffset,
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.circularContainer}>
      <Svg height="120" width="120" viewBox="0 0 120 120">
        <Defs>
          <SvgLinearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#667eea" />
            <Stop offset="100%" stopColor="#764ba2" />
          </SvgLinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle cx="60" cy="60" r="50" stroke="#e0e0e0" strokeWidth="8" fill="none" />

        {/* Progress circle */}
        <Animated.View style={[{ position: "absolute" }, animatedStyle]}>
          <Circle
            cx="60"
            cy="60"
            r="50"
            stroke="url(#circularGradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 50}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </Animated.View>
      </Svg>
    </View>
  );
};

// Pulse Loading
const PulseLoader = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.pulseContainer}>
      <Animated.View style={[styles.pulse, animatedStyle]}>
        <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.pulseGradient} />
      </Animated.View>
    </View>
  );
};

// Wave Loading
const WaveLoader = () => {
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);
  const wave3 = useSharedValue(0);
  const wave4 = useSharedValue(0);
  const wave5 = useSharedValue(0);

  useEffect(() => {
    const createWave = (wave: any, delay: number) => {
      wave.value = withDelay(
        delay,
        withRepeat(
          withSequence(withTiming(1, { duration: 400 }), withTiming(0, { duration: 400 })),
          -1,
          false
        )
      );
    };

    createWave(wave1, 0);
    createWave(wave2, 100);
    createWave(wave3, 200);
    createWave(wave4, 300);
    createWave(wave5, 400);
  }, []);

  const getWaveStyle = (wave: any) => {
    return useAnimatedStyle(() => {
      const height = interpolate(wave.value, [0, 1], [10, 40], Extrapolation.CLAMP);
      return {
        height,
      };
    });
  };

  return (
    <View style={styles.waveContainer}>
      <Animated.View style={[styles.wave, getWaveStyle(wave1)]} />
      <Animated.View style={[styles.wave, getWaveStyle(wave2)]} />
      <Animated.View style={[styles.wave, getWaveStyle(wave3)]} />
      <Animated.View style={[styles.wave, getWaveStyle(wave4)]} />
      <Animated.View style={[styles.wave, getWaveStyle(wave5)]} />
    </View>
  );
};

const LoadingScreen = () => {
  const [currentLoader, setCurrentLoader] = React.useState(0);

  const loaders = [
    { name: "Spinner", component: <SpinnerLoader /> },
    { name: "Dots", component: <DotsLoader /> },
    { name: "Circular Progress", component: <CircularProgressLoader /> },
    { name: "Pulse", component: <PulseLoader /> },
    { name: "Wave", component: <WaveLoader /> },
  ];

  const nextLoader = () => {
    setCurrentLoader((prev) => (prev + 1) % loaders.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Loading Animations</Text>
      <Text style={styles.subtitle}>{loaders[currentLoader].name}</Text>

      <View style={styles.loaderWrapper}>{loaders[currentLoader].component}</View>

      <TouchableOpacity style={styles.button} onPress={nextLoader}>
        <Text style={styles.buttonText}>Next Animation</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#667eea",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  // Spinner styles
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: "#667eea",
  },
  spinnerGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  // Dots styles
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#667eea",
  },
  // Circular progress styles
  circularContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  // Pulse styles
  pulseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pulse: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  pulseGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  // Wave styles
  waveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 4,
  },
  wave: {
    width: 8,
    backgroundColor: "#667eea",
    borderRadius: 4,
  },
});
