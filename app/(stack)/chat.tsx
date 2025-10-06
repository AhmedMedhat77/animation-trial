import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ChatScreen = () => {
  const [focused, setFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const ref = useRef<TextInput>(null);

  const handleSend = () => {
    setIsSending(true);

    setTimeout(() => {
      ref.current?.blur();
      ref.current?.clear();
    }, 600);

    setTimeout(() => {
      setIsSending(false);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 16 : 0}
    >
      <MaskedView
        style={{ flex: 1, flexDirection: "row", height: "100%" }}
        maskElement={
          <View style={styles.mask}>
            {"Basic Mask".split("").map((char, index) => (
              <Animated.Text
                key={index}
                style={styles.text}
                entering={FadeInDown.delay(index * 100)
                  .springify()
                  .mass(10)}
              >
                {char}
              </Animated.Text>
            ))}
          </View>
        }
      >
        <Animated.View
          style={[
            styles.gradient,
            {
              animationName: {
                to: {
                  transform: [{ rotate: "360deg" }],
                },
              },
              animationDuration: "3s",
              animationIterationCount: "infinite",
            },
          ]}
        >
          <Text>Basic Mask</Text>
        </Animated.View>
      </MaskedView>

      <View
        style={[
          styles.inputContainer,
          {
            paddingBottom: focused ? 0 : 60,
          },
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Animated.View
          style={{
            transitionProperty: ["transform"],
            transitionDuration: "200ms",

            transform: [{ scale: isSending ? 0.9 : 1 }],
          }}
        >
          <AnimatedPressable
            onPressIn={() => {
              setIsPressed(true);
            }}
            onPressOut={() => {
              setIsPressed(false);
            }}
            onPress={() => handleSend()}
            style={[
              styles.sendButton,

              {
                transitionProperty: ["opacity", "marginLeft", "transform"],
                transitionDuration: "300ms",
                opacity: focused ? 1 : 0 || isSending ? 0 : 0,
                marginLeft: focused ? 0 : -50,
                transform: [
                  { scale: focused ? 1 : 0.5 },
                  {
                    translateX: focused ? 0 : 50,
                  },
                  {
                    translateY: isSending ? -200 : 0,
                  },
                ],
              },
            ]}
          >
            <Ionicons name="arrow-up-outline" size={24} color="white" />
          </AnimatedPressable>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  maskedView: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mask: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 50,

    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    experimental_backgroundImage:
      "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    bottom: 16,
    gap: 10,
    padding: 8,
    width: "100%",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#DDD",
    color: "#000",
    borderRadius: 30,
    textAlign: "left",
    paddingHorizontal: 20,
    flex: 1,
  },
  sendButton: {
    backgroundColor: "rgba(9,9,121,1)",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
