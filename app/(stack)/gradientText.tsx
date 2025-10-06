import { StyleSheet, Text, View } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';

const gradientText = () => {
  return (
    <MaskedView
      style={{ flex: 1, flexDirection: "row", height: "100%" }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: "transparent",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Hello World
          </Text>
        </View>
      }
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <View style={{ flex: 1, height: "100%", backgroundColor: "#324376" }} />
      <View style={{ flex: 1, height: "100%", backgroundColor: "#F5DD90" }} />
      <View style={{ flex: 1, height: "100%", backgroundColor: "#F76C5E" }} />
      <View style={{ flex: 1, height: "100%", backgroundColor: "#e1e1e1" }} />
    </MaskedView>
  );
};

export default gradientText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  gradient: {
    experimental_backgroundImage:
      "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);",
    width: "100%",
    height: 100,
  },
});
